export interface BotInteraction {
  id: string;
  idtelegram: number;
  nome: string;
  quantidade_interacoes: number;
  assinaturas: number;
  created_at: string;
  updated_at: string;
  followup: number;
  ultima_mensagem: string;
  nomebot: string;
}

export interface BotStats {
  nomebot: string;
  totalPessoas: number;
  totalAssinaturas: number;
  totalInteracoes: number;
}
