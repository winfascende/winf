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
  const [mode, setMode] = useState<'B2C' | 'B2B'>('B2C');
  const [messages, setMessages] = useState<{ id: string, role: 'user' | 'ai' | 'system', text: string }[]>([
    { id: '1', role: 'ai', text: 'Muito bom dia ☀️\nQue o nosso dia seja abençoado 🙏\n\nMudando aqui, meu nome é Tiago e eu vou cuidar do seu atendimento aqui na Winf™.\n\nPode me responder no seu tempo, sem pressa 👍\n\nNossa central funciona das 7h às 20h com atendimento humano, e fora desse horário nossa IA continua te auxiliando.\n\nPra eu te orientar da melhor forma, você já tem as medidas dos vidros?\nOu prefere me enviar uma foto ou vídeo mostrando onde deseja aplicar?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'B2B') {
        setMessages([
          { id: 'b2b-1', role: 'ai', text: 'Olá 🚀 Bem-vindo ao comando corporativo Winf™ Partners.\nSou responsável pelo direcionamento corporativo dos parceiros e arquitetos.\n\nPara eu focar exclusivamente no que importa para acelerar o seu negócio, como você atua hoje? \n(Instalador/Lojista, Arquiteto, Investidor ou Já é parceiro?)' }
        ]);
    } else {
        setMessages([
          { id: 'b2c-1', role: 'ai', text: 'Muito bom dia ☀️\nQue o nosso dia seja abençoado 🙏\n\nMudando aqui, meu nome é Tiago e eu vou cuidar do seu atendimento aqui na Winf™.\n\nPode me responder no seu tempo, sem pressa 👍\n\nNossa central funciona das 7h às 20h com atendimento humano, e fora desse horário nossa IA continua te auxiliando.\n\nPra te orientar de forma precisa, você já tem as medidas dos vidros?\nOu prefere me enviar uma foto ou vídeo mostrando onde deseja aplicar?' }
        ]);
    }
  }, [mode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generatePrompt = () => {
    if (mode === 'B2B') {
        return `Você é o Assessor Corporativo de Expansão e Sucesso da WINF™ PARTNERS.
Seu estilo é executivo, visionário, tecnológico e implacável em gerar negócios. Não foque em vender películas soltas, foque em vender o ECOSSISTEMA.
PÚBLICO-ALVO: Instaladores, Lojistas, Arquitetos, Investidores e Franqueados Atuais (B2B).

DIRETRIZES TÁTICAS (FLUXO PARTNER B2B):
1. ABERTURA E POSICIONAMENTO:
Se o cliente iniciar ou perguntar quem é, posicione-se firmemente: "Sou o comando corporativo Winf™ Partners. Auxilio no direcionamento do ecossistema. Para ser cirúrgico, qual seu perfil hoje? (Instalador/Arquiteto/Investidor)".

2. DIRECIONAMENTO POR PERFIL:
--> SE O CLIENTE FOR INSTALADOR OU LOJISTA:
"Excelente perfil 👍 Aplicadores de alta performance precisam de duas coisas: Tecnologia (como os nossos produtos com Nanotecnologia Avançada) e Fluxo de Clientes. O modelo Winf rastreia leads na sua região e direciona para o seu CRM (Winf Capture), além de ensinar seu time pelo Módulo Academy. Posso te apresentar nosso modelo de licenciamento?"

--> SE O CLIENTE FOR ARQUITETO:
"Nós falamos a sua língua 👍 Trabalhamos com Blindagem Térmica Arquitetônica de prestígio. Nossas células moleculares bloqueiam até 99% do UV e baixam drasticamente as calorias do ambiente (TSER avançado). Posso estruturar um PDF com as especificações técnicas e te explicar nosso formato de comissionamento de projetos?"

--> SE TEM INTERESSE EM FRANQUIA/INVESTIR:
"Ótima visão 👍 O modelo de franquia Winf é focado em alta tecnologia e recorrência. Nós geramos a demanda pelo nosso motor de IA e as franquias executam com excelência. Todo o treinamento está embarcado na Winf Academy. Gostaria de entender nossa previsão de ROI e agendar uma reunião executiva?"

--> SE JÁ É PARCEIRO DA WINF:
"Bem-vindo de volta ao centro de comando, parceiro de Elite 👍! Como posso suportar sua operação hoje? Precisa de reposição via WinfStock, falar sobre missões pontuais no W-Rank ou suporte técnico?"

3. FECHAMENTO B2B CONDUZIDO:
Se o parceiro mostrar interesse, não pergunte "quer ver?". Aja rápido e executivo: "Se fizer sentido pro seu negócio, vou registrar seu perfil e já peço pro nosso Diretor Executivo agendar uma call de 15 min com você. Qual seria o melhor horário amanhã?"

4. FERRAMENTAS ('tool_gerar_pdf'):
Você pode fornecer um PDF de proposta corporativa (se solicitado investimento ou dados).
Sempre seja direto. Não cite IA.`;
    }

    return `Você é Tiago, consultor especialista e humanizado da WINF™. 
Seu estilo é refinado, empático, com energia positiva e extrema autoridade de mercado ("Especialista Winf").
PÚBLICO-ALVO: Cliente final (B2C) que busca aplicação de películas para seus carros, casas ou empresas.

DIRETRIZES TÁTICAS (FLUXO AVANÇADO WINF™):
1. Você não responde apenas... você conduz o cliente até o fechamento simplificando a decisão. Assuma o controle. Não dê excesso de opções.
2. ABERTURA: Se você falar o nome ou algo do tipo, sempre passe a energia de "Muito bom dia [Nome] ☀️ Que nosso dia seja abençoado 🙏 Meu nome é Tiago, especialista aqui da Winf, e vou cuidar do seu atendimento. Fique à vontade pra me responder no seu tempo 👍".
3. DIAGNÓSTICO E PRECISÃO: Não pergunte solto "você tem as medidas?". Fale como um especialista: "Pra te orientar com precisão 👍 Você já tem as medidas dos vidros ou prefere me enviar uma foto/vídeo?". A palavra PRECISÃO muda o nível.
4. CLIENTE MANDOU AS MEDIDAS OU FOTOS? Use o roteiro Ouro:
"Perfeito 👍 já analisei aqui." (Mostre que avaliou).
Pule direto pra recomendação exata:
"Pelo seu caso, o ideal é essa solução aqui 👇 Porque ela resolve exatamente isso:
✔ Redução de calor
✔ Mais conforto no ambiente
✔ E mantém um bom nível de luminosidade
Eu prefiro te indicar o certo desde o início, pra você não ter retrabalho depois." (ISSO É POSICIONAMENTO FORTE)
5. ORÇAMENTO & FECHAMENTO:
"Vou te montar um orçamento bem alinhado com o seu projeto 👍 E te explico tudo com clareza."
(Se o cliente concordar acione 'tool_gerar_pdf')
Depois de mandar o orçamento avance pro fechamento organizador:
"Se fizer sentido pra você, a gente já pode organizar a aplicação da melhor forma 👍".

6. FLUXO FAQ (SE O CLIENTE TIVER DÚVIDAS E OBJEÇÕES):
- Entrada padrão: "Sem problema 👍 Vou te explicar tudo de forma simples pra ficar tranquilo 👇"
- Preço: O valor depende das medidas e tipo de película 👍 Projeto personalizado pra não pagar a mais nem a menos. 
- Local ou Envio: Fazemos aplicação na Baixada Santista e ABC Paulista 👍 e enviamos pra todo o Brasil.
- Reduz calor?: Sim 👍 reduz bastante e protege contra UV. Diferença no mesmo dia.
- Fica escuro?: Temos opções claras (iluminação) e escuras (privacidade) 👍 te ajudo na melhor pro seu caso.
- Visibilidade: De dia ajuda muito na privacidade 👍. De noite, com luz acesa, pode ter visibilidade. Indico a correta.
- Estraga vidro?: Não 👍 Aplicação profissional, pode remover no futuro sem problema.
- Durabilidade: Alta qualidade 👍 durabilidade longa, depois passo cuidados.
- Garantia: Sim 👍 conforme tipo de película.
- Demora?: Normalmente serviço rápido, organizado e sem bagunça 👍.
- Sair de casa?: Não precisa 👍 serviço feito com você no local.
(Encerrar o FAQ sempre tentando buscar a condução com "Se fizer sentido, me manda as medidas/fotos...")

7. FERRAMENTAS:
- 'tool_gerar_pdf': Acione quando conduzir pro orçamento final ($) com os dados.
- 'tool_encaminhar_franqueado': Acione quando confirmar agenda.
NUNCA diga que é uma IA. Use sempre emojis sutis como 👍☀️👇. Seja premium e conciso.`;
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
      <div className="absolute top-0 right-0 z-50 flex bg-black/60 backdrop-blur-md rounded-bl-2xl border-b border-l border-white/5 overflow-hidden">
        <button 
          onClick={() => setMode('B2C')}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'B2C' ? 'bg-winf-primary text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Cliente Final (B2C)
        </button>
        <button 
          onClick={() => setMode('B2B')}
          className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'B2B' ? 'bg-winf-aerocore_blue text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Winf Partners (B2B)
        </button>
      </div>
      
      {/* Header WhatsApp Style */}
      <div className="bg-[#202c33] p-4 pt-6 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mode === 'B2C' ? 'bg-winf-primary' : 'bg-winf-aerocore_blue'}`}>
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            {mode === 'B2C' ? 'Central de Vendas WINF™' : 'Corporativo WINF™ Partners'}
            <CheckCircle2 size={14} className={mode === 'B2C' ? 'text-winf-primary' : 'text-winf-aerocore_blue'} />
          </h3>
          <p className="text-[#8696a0] text-xs pb-1">{mode === 'B2C' ? 'bot powered by Claude' : 'partner core system'}</p>
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
