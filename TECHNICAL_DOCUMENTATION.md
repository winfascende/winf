# DOCUMENTAÇÃO TÉCNICA — WINF™ OS

**Data:** 21 de Abril de 2024  
**Status do Projeto:** Produção / Piloto  
**Autor:** Engenharia Core AI  

---

## 1. VISÃO GERAL DO SISTEMA

### O que é o WINF™ OS?
O **WINF™ OS** é o sistema operacional nervoso central da rede WINF. Ele não é apenas um CRM ou um software de gestão, mas um ecossistema de inteligência projetado para orquestrar o crescimento de licenciados de alta performance no mercado de engenharia de películas (automotiva e arquitetônica).

### Para quem serve?
- **Licenciados Master/Elite:** Gestão completa de unidades, frotas e territórios.
- **Instaladores/Especialistas:** Registro de garantias, consulta técnica e gestão de produtividade.
- **Board (Administração):** Visão macro da rede, royalties e expansão nacional.
- **Clientes Finais:** Acesso a certificados digitais e validação de autenticidade (WINF DIGITAL GLASS CERTIFICATE™).

### Problema que resolve
Elimina a descentralização de dados, a perda de leads por falta de acompanhamento e a falta de padronização técnica na aplicação de películas premium. Ele automatiza o "sucesso do parceiro" através de agentes de IA proativos.

### Modelo de Negócio
O modelo é baseado em **Software-Enabled Licensing**. O parceiro não paga mensalidade de software, mas opera dentro do ecossistema WINF, onde os royalties e a manutenção da rede estão embutidos no fluxo de consumo de materiais (WinfStock) e na geração de valor via AI.

---

## 2. ARQUITETURA TÉCNICA

### Stack Completa
- **Frontend:** React 19 (Functional Components + Hooks)
- **Linguagem:** TypeScript (Strict Type Safety)
- **Estilização:** Tailwind CSS v4 (@import core)
- **Animações:** Framer Motion & Motion (React)
- **Backend/DB:** Firebase (Firestore NoSQL)
- **Autenticação:** Firebase Auth (Google Login + Email/Pass)
- **Inteligência Artificial:** 
  - **Claude AI (Anthropic SDK):** Core de automação e estratégias comerciais.
  - **Gemini AI (@google/generative-ai):** Consultas técnicas e análise de dados.
- **Gráficos:** Recharts & D3.js
- **PDF/Geração:** @react-pdf/renderer & jsPDF

### Estrutura de Pastas de Alto Nível
```text
/root
├── firebase-blueprint.json (Definição IR do banco de dados)
├── firestore.rules (Segurança real do banco)
├── /src
│   ├── App.tsx (Roteamento central e Gestão de Estados)
│   ├── main.tsx (Entrypoint)
│   ├── types.ts (600+ linhas de interfaces e enums)
│   ├── /contexts
│   │   └── WinfContext.tsx (O Cérebro: Conexão Firebase + Lógica Global)
│   ├── /services
│   │   └── aiService.ts (Wrapper para Claude e Gemini)
│   ├── /lib
│   │   └── firebase.ts (Configuração e exportação do SDK)
│   ├── /components (100+ componentes modulares)
```

### Roteamento
O roteamento não utiliza bibliotecas pesadas de histórico, mas sim um estado central `currentView` (enum `ViewState`) gerenciado no `App.tsx`. Isso garante um comportamento de Single Page Application (SPA) ultra-veloz, ideal para o ambiente mobile-first dos parceiros.

### Autenticação
Implementada através do `onAuthStateChanged` do Firebase no `WinfContext`. Cada ação no sistema é vinculada ao `user.id` real, garantindo que um licenciado nunca veja os dados de outro (Multi-tenancy via Firestore Rules).

---

## 3. PÁGINAS E MÓDULOS (ESTATUS REAL)

| Nome do Arquivo | Função / Propósito | Ações do Usuário | Status |
| :--- | :--- | :--- | :--- |
| `DashboardWinf.tsx` | Hub Central do Parceiro | Visão de metas, saldo WinfCoins, acesso rápido a módulos. | **100% OK** |
| `ModuleCaptureSystem.tsx` | CRM de Leads | Adicionar, qualificar e converter leads. Radar de leads próximos. | **100% OK** |
| `ModuleTheBoard.tsx` | Gestão de Rede (Admin) | Gestão de membros, territórios e despacho de estoque. | **100% OK** |
| `ModuleWarranties.tsx` | Sistema de Garantia | Cadastro de termos, Serial Numbers e consulta de validade. | **100% OK** |
| `ModuleCoreAI.tsx` | Chat de Consultoria | Chat direto com Claude/Gemini para suporte técnico. | **100% OK** |
| `AgentAutomationsEngine.tsx` | Motor de Automações | Roda proativamente no background gerando "Insights". | **100% OK** |
| `CityOnePage.tsx` | Landing Page de Cidade | Exibe unidade autorizada, stats e botões de contato. | **100% OK** |
| `MemberOnePage.tsx` | Identidade Digital | Cartão de visitas digital do parceiro com W-Rank. | **100% OK** |
| `ModuleFinancial.tsx` | Fluxo de Caixa | Registro de entradas/saídas e saldo WinfCoin. | **100% OK** |
| `ModuleStock.tsx` | Inventário de Películas | Controle de metros lineares, consumo e alertas. | **Parcial** |
| `ModuleQuotes.tsx` | Gerador de Orçamentos | Criação de propostas PDF e envio via WhatsApp. | **100% OK** |

---

## 4. BOTÕES E AÇÕES PRINCIPAIS

| Label/Botão | Componente | Ação Executada | Funciona: Sim/Não |
| :--- | :--- | :--- | :--- |
| `Fazer Login` | `Login.tsx` | Autentica no Firebase e muda o estado global. | **Sim** |
| `Novo Lead` | `CaptureSystem` | Abre modal e insere documento em `/leads`. | **Sim** |
| `Ver OnePage` | `DashboardWinf` | Navega para a visão de cidade `CITY_ONE_PAGE`. | **Sim** |
| `Conceder WinfCoins`| `TheBoard` | Atualiza saldo na coleção `/users`. | **Sim** |
| `Gerar Certificado` | `Warranties` | Gera PDF através de `@react-pdf`. | **Sim** |
| `Solicitar Suporte` | `CoreAI` | Envia prompt para o Claude 3.5 Sonnet. | **Sim** |
| `Aprovar Orçamento` | `Quotes` | Altera status e cria pedido automático. | **Sim** |
| `Registrar Instalação`| `Installations` | Vincula serial number a cliente e veículo. | **Sim** |

---

## 5. NOTAS PARA O DESENVOLVEDOR (REF: TIAGO)

1.  **Limpeza do Protótipo:** Toda a referência a "proto-tiago-001" foi removida. O sistema agora espera um usuário autenticado.
2.  **Ambiente de IA:** Para habilitar os Agentes proativos, verifique se `VITE_ANTHROPIC_API_KEY` está configurada no ambiente do cloud.
3.  **Segurança (Rules):** As regras do Firebase estão configuradas para `request.auth.uid == resource.data.user_id`. Nunca desabilite isso.
4.  **Expansão de Cidades:** Para adicionar novas unidades piloto, basta atualizar o switch-case dentro de `CityOnePage.tsx`.

---

**WINF™ OS — A Nova Era da Engenharia de Películas.**
