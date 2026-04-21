import { jsPDF } from 'jspdf';

export const generateCommercialDeckPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 297, 'F');

  // Header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('WINF™', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.text('BUSINESS DECK & MANIFESTO_ 2026', 20, 38);

  doc.setDrawColor(255, 255, 255);
  doc.line(20, 45, pageWidth - 20, 45);

  let yPos = 60;

  const addSection = (title: string, subtitle: string, whatIsIt: string, whatItDoes: string, hiddenAdvantage: string, financial: string) => {
    if (yPos > 240) {
      doc.addPage();
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, pageWidth, 297, 'F');
      yPos = 30;
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, yPos);
    
    doc.setTextColor(249, 115, 22); // orange-500
    doc.setFontSize(10);
    doc.text(subtitle.toUpperCase(), 20, yPos + 6);

    yPos += 15;
    
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('O que é: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const whatIsSplit = doc.splitTextToSize(whatIsIt, pageWidth - 45);
    doc.text(whatIsSplit, 38, yPos);
    yPos += (whatIsSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('O que faz: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const whatItDoesSplit = doc.splitTextToSize(whatItDoes, pageWidth - 45);
    doc.text(whatItDoesSplit, 42, yPos);
    yPos += (whatItDoesSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Vantagem: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const advantageSplit = doc.splitTextToSize(hiddenAdvantage, pageWidth - 45);
    doc.text(advantageSplit, 42, yPos);
    yPos += (advantageSplit.length * 5) + 5;

    doc.setFont('helvetica', 'bold');
    doc.text('Ganhos: ', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const financialSplit = doc.splitTextToSize(financial, pageWidth - 45);
    doc.text(financialSplit, 38, yPos);
    yPos += (financialSplit.length * 5) + 10;

    doc.setDrawColor(50, 50, 50);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 15;
  };

  // Section 1
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('1. LINHA DE CREDENCIAMENTO', 20, yPos);
  yPos += 15;

  addSection(
    'WINF™ SELECT',
    'O Ponto de Ignição',
    'O portal de entrada para o ecossistema WINF. Feito para profissionais que já têm demanda, mas querem se diferenciar do "mercado comum".',
    'Digitaliza o seu conhecimento. Você aprende a metodologia online, acessa nosso portfólio oficial de entrada e recebe chancela oficial.',
    'Você deixa de ser um "aplicador de insulfilm" e passa a ser um Parceiro Certificado.',
    'Acesso inicial a uma curva de preço melhor, fugindo da guerra de centavos das linhas populares.'
  );

  addSection(
    'WINF™ ELITE',
    'O Instalador Cirúrgico',
    'Criado para os puristas. Para aquele parceiro onde a perfeição não é o objetivo, é a obrigação.',
    'Eleva a operação física do parceiro com acesso ao software WINF CUT™, que elimina erros humanos e a fricção de uso de estiletes.',
    'Desperdício zero de material. Acesso exclusivo à tabela de precificação Pro.',
    'Redução drástica de tempo de instalação e eliminação de perdas de material no corte, alavancando ganhos líquidos.'
  );

  addSection(
    'WINF™ ADVANCED',
    'O Ecossistema Dominante',
    'Onde o salto acontece. Não é mais apenas sobre instalar perfeitamente, é sobre dominar a região comercialmente.',
    'Injetamos o motor de marketing WINF dentro do seu negócio. Página de vendas própria e tráfego pago gerando leads diretamente para seu WhatsApp.',
    'Você acorda e já tem contatos pedindo orçamento porque o sistema operou enquanto você dormia.',
    'Aumento drástico do volume de caixa mensal através da captura digital de projetos Deal Size High-End.'
  );

  addSection(
    'WINF™ ENTERPRISE',
    'A Cadeira na Mesa (Board Member)',
    'Para os titãs do mercado. Grupos grandes ou investidores focados numa hegemonia inquestionável de uma macrorregião.',
    'Engajamos inteligência tática, análise de território por Geofencing para capturar o público ultra-rico, e acompanhamento mental de KPIs.',
    'Você não segue o mercado, você dita o mercado local.',
    'Operação projetada para volumes milionários anuais. Blindagem contra a concorrência.'
  );

  doc.addPage();
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 297, 'F');
  yPos = 30;

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('2. FRANQUIAS FÍSICAS FLAGSHIP', 20, yPos);
  yPos += 15;

  addSection(
    'WINF™ KIOSK RETAIL',
    'A Máquina de Conversão',
    'Um ponto de contato ágil, desenhado para dominar shoppings, aeroportos ou galerias de luxo.',
    'Vitrine de conversão imediata imersiva para proteger carros e casas por impulso e status.',
    'Baixíssimo custo operacional de locação e funcionários, unido a um altíssimo fluxo diário.',
    'Fast Payback (retorno mais ágil da rede), aproveitando o tráfego alheio do shopping.'
  );

  addSection(
    'WINF™ STUDIO FLAGSHIP',
    'O Padrão Ouro',
    'O ápice da expressão da nossa marca. Arquitetura estilo laboratório Porsche ou clínica estética de altíssimo padrão.',
    'Encapsula todo o padrão Dark Factory focada no ultra high-end. É onde as proteções mais valiosas são aplicadas.',
    'O próprio ambiente quebra objeções de preço. O cliente entra entendendo a exclusividade molecular.',
    'Margens astronômicas. Venda de serviços imensuráveis com ticket que cobre custos mensais em poucas vendas.'
  );

  doc.save('WINF_Apresentacao_Comercial_2026.pdf');
};
