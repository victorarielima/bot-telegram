export interface BotConfig {
  id: number;
  token: string;
  nomebot: string;
  pagamento_pendente: string;
  pagamento_vencido: string;
  enviar_link: string;
  texto_inicial: string;
  plano_anual: string;
  plano_7_dias: string;
  plano_15_dias: string;
  plano_30_dias: string;
  botao_1: string;
  botao_2: string;
  botao_3: string;
  botao_4: string;
  preco_7_dias: number;
  preco_15_dias: number;
  preco_30_dias: number;
  preco_anual: number;
}
