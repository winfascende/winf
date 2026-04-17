import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, CheckCircle2, User, Bot, Loader2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { generateClaudeResponse } from '../lib/claude';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CLAUDE_WHATSAPP_TOOLS = [
  {
    name: "tool_gerar_pdf",
    description: "Gera e envia uma proposta comercial em PDF direto no chat do WhatsApp.",
    input_schema: {
      type: "object",
      properties: {
        clienteNome: { type: "string" },
        veiculoOuProjeto: { type: "string" },
        peliculaRecomendada: { type: "string" },
        valorEstimado: { type: "number" }
      },
      required: ["clienteNome", "veiculoOuProjeto", "peliculaRecomendada", "valorEstimado"]
    }
  },
  {
    name: "tool_encaminhar_franqueado",
    description: "Encaminha o lead qualificado para o parceiro autorizado da cidade no sistema de CRM.",
    input_schema: {
      type: "object",
      properties: {
        clienteNome: { type: "string" },
        cidade: { type: "string" },
        resumoAtendimento: { type: "string" }
      },
      required: ["clienteNome", "cidade", "resumoAtendimento"]
    }
  }
];

const WhatsAppAgentSimulator: React.FC = () => {
  const { user } = useWinf();
  const [messages, setMessages] = useState<{ id: string, role: 'user' | 'ai' | 'system', text: string }[]>([
    { id: '1', role: 'ai', text: 'Olá! Sou o assistente virtual da Central WINF™. Como posso ajudar com seu projeto de películas de alta performance hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generatePrompt = () => {
    return `Você é o consultor de vendas WINF™. Especialista em películas de alta performance (automotivas, residenciais e comerciais).
Seu objetivo principal é:
1. Qualificar o lead: Pergunte cidade, tipo de projeto (carro, casa, empresa), e uma estimativa de tamanho (qual carro, quantos vidros).
2. Demonstrar valor: Fale sobre propriedades térmicas (TSER), proteção UV (99%), nanotecnologia, garantia, etc. Sem ser chato.
3. Gerar proposta: Se o cliente der as informações e quiser preço, USE A FERRAMENTA tool_gerar_pdf para enviar o orçamento estimado.
4. Encaminhar: Quando o cliente confirmar interesse em fechar ou agendar, USE A FERRAMENTA tool_encaminhar_franqueado para passar ele para o licenciado da cidade dele.
5. Tom: premium, confiante, direto, técnico, persuasivo. NUNCA mencione que é uma IA a menos que diretamente perguntado. Seja conciso como em conversas de WhatsApp. Emojis são bem-vindos mas sem exagero.
6. Nunca deixe mensagens soltas. Sempre faça uma pergunta no final para guiar o lead para a conversão.`;
  };

  const handleToolExecution = async (toolCall: any) => {
    const { name, input } = toolCall;
    
    if (name === 'tool_gerar_pdf') {
      const msg = `[PDF GERADO] Proposta Comercial - ${input.clienteNome}.pdf\nProjeto: ${input.veiculoOuProjeto}\nPelícula: ${input.peliculaRecomendada}\nInvestimento Estimado: R$ ${input.valorEstimado}`;
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: msg }]);
      
      // Also register in CRM
      try {
        await addDoc(collection(db, 'quotes'), {
           customerName: input.clienteNome,
           status: 'Enviado (WhatsApp)',
           totalAmount: input.valorEstimado,
           createdAt: serverTimestamp()
        });
      } catch (e) {}

      return "Proposta em PDF foi enviada ao cliente com sucesso. Diga ao cliente para conferir e pergunte se quer agendar.";
    }

    if (name === 'tool_encaminhar_franqueado') {
      const msg = `[SISTEMA] Lead [${input.clienteNome} - ${input.cidade}] transferido com sucesso para a unidade local.\nResumo: ${input.resumoAtendimento}`;
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: msg }]);
      
      try {
        await addDoc(collection(db, 'leads'), {
           name: input.clienteNome,
           city: input.cidade,
           status: 'Transferido',
           source: 'WhatsApp Central',
           createdAt: serverTimestamp()
        });
      } catch (e) {}

      return "Lead encaminhado com sucesso. Avise o cliente que a unidade da cidade dele entrará em contato em instantes e encerre o chat de forma premium e educada.";
    }

    return "Ação completada.";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const sysPrompt = generatePrompt();
      // Generate standard message history for Claude memory
      const history = messages.filter(m => m.role !== 'system').map(m => `${m.role === 'user' ? 'Cliente' : 'Consultor WINF'}: ${m.text}`).join('\n');
      const finalPrompt = `Histórico da conversa:\n${history}\nCliente: ${userText}\n\nResponda como o Consultor WINF. Se precisar usar ferramenta, use.`;

      const response = await generateClaudeResponse(finalPrompt, sysPrompt, CLAUDE_WHATSAPP_TOOLS);

      if (response.toolCalls && response.toolCalls.length > 0) {
        for (const tool of response.toolCalls) {
          const result = await handleToolExecution(tool);
          // After tool execution, we might need a follow up message from Claude, but for simplicity we will just trigger another response or append what Claude said.
          if (response.text) {
             setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: response.text }]);
          }
          // Request a follow up response so Claude can acknowledge the tool execution to the client
          const followUp = await generateClaudeResponse(`Você executou a ferramenta ${tool.name}. O resultado foi: ${result}. Dê a resposta final ao cliente no WhatsApp.`, sysPrompt);
          if (followUp.text) {
            setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), role: 'ai', text: followUp.text }]);
          }
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: response.text }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'system', text: "Erro ao processar mensagem no agente." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-[#0b141a] rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
      {/* Header WhatsApp Style */}
      <div className="bg-[#202c33] p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-winf-primary rounded-full flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            Central de Vendas WINF™
            <CheckCircle2 size={14} className="text-winf-primary" />
          </h3>
          <p className="text-[#8696a0] text-xs">bot powered by Claude</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2]/5 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-blend-overlay">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'system' ? (
              <div className="bg-[#182229] border border-winf-primary/30 text-winf-primary text-xs p-3 rounded-xl max-w-[80%] my-2 mx-auto shadow-lg flex items-start gap-2 font-mono">
                <FileText size={14} className="shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{msg.text}</span>
              </div>
            ) : (
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'} shadow text-left relative`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className="text-[10px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  {msg.role === 'user' && <CheckCircle2 size={12} className="text-[#53bdeb]" />}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#202c33] p-3 rounded-2xl rounded-tl-none shadow flex items-center gap-2">
               <Loader2 size={14} className="animate-spin text-[#8696a0]" />
               <span className="text-[#8696a0] text-xs">digitando...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="bg-[#202c33] p-3 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ligue como o cliente..."
          className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-xl px-4 py-3 text-sm focus:outline-none placeholder:text-[#8696a0]"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="w-12 h-12 bg-[#00a884] hover:bg-[#008f6f] rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50"
        >
          <Send size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppAgentSimulator;
