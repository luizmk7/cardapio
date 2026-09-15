export const storeConfig = {
  featured: { enabled: true, title: 'Destaques da casa', productIds: ['alcatra', 'medalhao', 'combo-brasa', 'batata'] },
  // Banner de boas-vindas: personalize para cada cliente.
  banner: {
    enabled: true,
    image: 'assets/espetos.jpg',
    imageAlt: 'Espetinhos preparados na brasa',
    logo: '', // Exemplo: assets/logo-cliente.png
    eyebrow: 'ESPETARIA & BAR',
    title: 'Brasa acesa.\nConversa boa.',
    description: 'Espetinhos no ponto, bebida gelada e aquele motivo para reunir a turma.',
    buttonText: 'Explorar o cardápio',
    imagePosition: 'center',
  },
  name: 'Brasa — Espetaria & Bar',
  tagline: 'Espetinhos na brasa, porções para dividir e bar gelado',
  // WhatsApp em formato internacional (apenas dígitos, ex: '5511999999999').
  // Se vazio, o sistema mantém 'Copiar pedido' ativo e avisa que o número ainda não foi cadastrado.
  whatsappNumber: '5577981235638', 
  city: 'Vitória da Conquista',
  state: 'BA',
  address: 'Endereço a configurar — Vitória da Conquista / BA',
  locationUrl: '',
  openingHours: [
    { weekdays: [2, 3, 4], days: 'Terça a Quinta', hours: '18:00 às 23:00' },
    { weekdays: [5, 6, 0], days: 'Sexta a Domingo', hours: '18:00 às 23:59' },
    { weekdays: [1], days: 'Segunda-feira', hours: 'Fechado' }
  ],
  timezone: 'America/Sao_Paulo',
  estimates: {
    delivery: '40 a 60 min',
    pickup: '25 a 35 min'
  },
  paymentMethods: [
    { id: 'pix', name: 'PIX', allowChange: false },
    { id: 'cash', name: 'Dinheiro', allowChange: true },
    { id: 'credit', name: 'Cartão de Crédito', allowChange: false },
    { id: 'debit', name: 'Cartão de Débito', allowChange: false }
  ],
  deliveryEnabled: true,
  pickupEnabled: true,
  faq: [{q:'Como personalizo meu pedido?',a:'Escolha o produto, inclua adicionais e escreva suas preferências nas observações.'},{q:'Os valores são reais?',a:'Este é um cardápio de demonstração. Preços, fotos, horários e dados devem ser configurados pela loja.'},{q:'Como confirmo o pedido?',a:'Copie o pedido ou envie pelo WhatsApp quando o número da loja estiver configurado. Aguarde a confirmação da equipe.'}]
};
