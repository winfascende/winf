import React, { useEffect, useRef } from 'react';
import { useWinf } from '../contexts/WinfContext';
import { generateClaudeResponse } from '../lib/claude';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { differenceInDays } from 'date-fns';

/**
 * This component runs invisibly in the background.
 * It monitors state changes and triggers Claude automations.
 */
const AgentAutomationsEngine: React.FC = () => {
  const { user, stockItems, leads, quotes, agentInsights } = useWinf();
  
  // Use refs to prevent infinite loops during hot reloads or rapid state changes
  const processedEntities = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!user?.id || user.id === 'proto-tiago-001') return;

    const runAutomations = async () => {
      // 1. Estoque baixo → Claude detecta e envia alerta + sugere pedido automático
      const lowStockItems = stockItems.filter(s => s.remaining_meters <= 5);
      for (const item of lowStockItems) {
        const insightKey = `STOCK_ALERT_${item.id}`;
        if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === item.id && i.type === 'STOCK_ALERT')) {
          processedEntities.current.add(insightKey);
          
          const prompt = `O parceiro ${user.name} está com estoque baixo do produto ${item.product_name} (apenas ${item.remaining_meters} metros restantes). Gere um alerta curto e direto sugerindo um pedido de reposição.`;
          const system = "Você é o WINF CORE AI, o assistente proativo do parceiro. Seja direto, profissional e focado em vendas.";
          
          const response = await generateClaudeResponse(prompt, system);
          if (response.text) {
            await addDoc(collection(db, 'agent_insights'), {
              user_id: user.id,
              type: 'STOCK_ALERT',
              title: `Estoque Crítico: ${item.product_name}`,
              content: response.text,
              related_entity_id: item.id,
              is_read: false,
              created_at: serverTimestamp()
            });
          }
        }
      }

      // 2. Lead novo → Claude analisa o perfil e gera roteiro de abordagem personalizado no WhatsApp
      const newLeads = leads.filter(l => l.status === 'Novo');
      for (const lead of newLeads) {
        const insightKey = `LEAD_SCRIPT_${lead.id}`;
        if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === lead.id && i.type === 'LEAD_SCRIPT')) {
          processedEntities.current.add(insightKey);
          
          const prompt = `Um novo lead chegou: Nome: ${lead.name}, Interesse: ${lead.interest}, Origem: ${lead.source}. Gere um roteiro de abordagem curto e persuasivo para o WhatsApp, focado em conversão.`;
          const system = "Você é o WINF SALES AI, especialista em conversão de leads automotivos e arquitetônicos.";
          
          const response = await generateClaudeResponse(prompt, system);
          if (response.text) {
            await addDoc(collection(db, 'agent_insights'), {
              user_id: user.id,
              type: 'LEAD_SCRIPT',
              title: `Roteiro de Abordagem: ${lead.name}`,
              content: response.text,
              related_entity_id: lead.id,
              is_read: false,
              created_at: serverTimestamp()
            });
          }
        }
      }

      // 3. Orçamento enviado há 3 dias sem resposta → Claude gera mensagem de follow-up automática
      const pendingQuotes = quotes.filter(q => q.status === 'Enviado' && differenceInDays(new Date(), new Date(q.createdAt)) >= 3);
      for (const quote of pendingQuotes) {
        const insightKey = `QUOTE_FOLLOWUP_${quote.id}`;
        if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.related_entity_id === quote.id && i.type === 'QUOTE_FOLLOWUP')) {
          processedEntities.current.add(insightKey);
          
          const prompt = `O orçamento para ${quote.customerName} no valor de R$ ${quote.totalAmount} foi enviado há mais de 3 dias e ainda não teve resposta. Gere uma mensagem de follow-up educada e persuasiva para o WhatsApp.`;
          const system = "Você é o WINF SALES AI, especialista em fechamento de vendas.";
          
          const response = await generateClaudeResponse(prompt, system);
          if (response.text) {
            await addDoc(collection(db, 'agent_insights'), {
              user_id: user.id,
              type: 'QUOTE_FOLLOWUP',
              title: `Follow-up Necessário: ${quote.customerName}`,
              content: response.text,
              related_entity_id: quote.id,
              is_read: false,
              created_at: serverTimestamp()
            });
          }
        }
      }

      // 4. Meta mensal em risco (Simulated logic based on mid-month and low sales)
      const currentDay = new Date().getDate();
      const totalSales = quotes.filter(q => q.status === 'Aprovado').reduce((acc, q) => acc + q.totalAmount, 0);
      if (currentDay > 15 && totalSales < 5000) { // Arbitrary threshold for prototype
        const insightKey = `GOAL_RISK_${new Date().getMonth()}`;
        if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.type === 'GOAL_RISK')) {
          processedEntities.current.add(insightKey);
          
          const prompt = `Estamos no dia ${currentDay} do mês e as vendas aprovadas do parceiro ${user.name} estão em apenas R$ ${totalSales}. A meta mensal está em risco. Gere um alerta motivacional e sugira 2 ações comerciais rápidas para reverter o cenário.`;
          const system = "Você é o WINF DATA AI, diretor comercial estratégico da rede.";
          
          const response = await generateClaudeResponse(prompt, system);
          if (response.text) {
            await addDoc(collection(db, 'agent_insights'), {
              user_id: user.id,
              type: 'GOAL_RISK',
              title: `Alerta Estratégico: Meta em Risco`,
              content: response.text,
              is_read: false,
              created_at: serverTimestamp()
            });
          }
        }
      }

      // 5. Novo parceiro cadastrado → Claude envia sequência de onboarding automática
      // Assuming user.created_at exists or we just trigger if they have 0 installations and 0 quotes
      if (quotes.length === 0 && stockItems.length === 0) {
        const insightKey = `ONBOARDING_${user.id}`;
        if (!processedEntities.current.has(insightKey) && !agentInsights.some(i => i.type === 'ONBOARDING')) {
          processedEntities.current.add(insightKey);
          
          const prompt = `O parceiro ${user.name} acabou de entrar na rede WINF e ainda não tem vendas ou estoque registrado. Gere uma mensagem de boas-vindas empolgante e sugira os 3 primeiros passos que ele deve dar no sistema.`;
          const system = "Você é o WINF CONCIERGE AI, responsável pelo sucesso do parceiro (Customer Success).";
          
          const response = await generateClaudeResponse(prompt, system);
          if (response.text) {
            await addDoc(collection(db, 'agent_insights'), {
              user_id: user.id,
              type: 'ONBOARDING',
              title: `Bem-vindo à WINF, ${user.name}!`,
              content: response.text,
              is_read: false,
              created_at: serverTimestamp()
            });
          }
        }
      }


    };

    // Run automations after a short delay to ensure data is loaded
    const timer = setTimeout(() => {
      runAutomations();
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, stockItems, leads, quotes, agentInsights]);

  return null; // This component does not render anything
};

export default AgentAutomationsEngine;
