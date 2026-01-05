import { useState } from "react";
import { BotConfig } from "@/types/bot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CREATE_WEBHOOK_URL = "https://n8n.nexosoftwere.cloud/webhook/c6c1aad4-0eab-477c-aba4-d61a90067bd5";

interface AddBotFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const emptyBot: Omit<BotConfig, "id"> = {
  nomebot: "",
  pagamento_pendente: "",
  pagamento_vencido: "",
  enviar_link: "",
  texto_inicial: "",
  plano_anual: "",
  plano_7_dias: "",
  plano_15_dias: "",
  plano_30_dias: "",
  botao_1: "",
  botao_2: "",
  botao_3: "",
  botao_4: "",
  preco_7_dias: 0,
  preco_15_dias: 0,
  preco_30_dias: 0,
  preco_anual: 0,
};

export function AddBotForm({ onBack, onSuccess }: AddBotFormProps) {
  const [config, setConfig] = useState<Omit<BotConfig, "id">>(emptyBot);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof Omit<BotConfig, "id">, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!config.nomebot.trim()) return "Nome do bot é obrigatório";
    if (!config.pagamento_pendente.trim()) return "Mensagem de pagamento pendente é obrigatória";
    if (!config.pagamento_vencido.trim()) return "Mensagem de pagamento vencido é obrigatória";
    if (!config.enviar_link.trim()) return "Mensagem de enviar link é obrigatória";
    if (!config.texto_inicial.trim()) return "Texto inicial é obrigatório";
    if (!config.plano_7_dias.trim()) return "Plano 7 dias é obrigatório";
    if (!config.plano_15_dias.trim()) return "Plano 15 dias é obrigatório";
    if (!config.plano_30_dias.trim()) return "Plano 30 dias é obrigatório";
    if (!config.plano_anual.trim()) return "Plano anual é obrigatório";
    if (!config.botao_1.trim()) return "Botão 1 é obrigatório";
    if (!config.botao_2.trim()) return "Botão 2 é obrigatório";
    if (!config.botao_3.trim()) return "Botão 3 é obrigatório";
    if (!config.botao_4.trim()) return "Botão 4 é obrigatório";
    if (config.preco_7_dias <= 0) return "Preço 7 dias deve ser maior que zero";
    if (config.preco_15_dias <= 0) return "Preço 15 dias deve ser maior que zero";
    if (config.preco_30_dias <= 0) return "Preço 30 dias deve ser maior que zero";
    if (config.preco_anual <= 0) return "Preço anual deve ser maior que zero";
    return null;
  };

  const handleSave = async () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(CREATE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) throw new Error("Falha ao criar bot");
      toast.success("Bot criado com sucesso!");
      onSuccess();
    } catch {
      toast.error("Erro ao criar bot");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Adicionar Novo Bot</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="nomebot">Nome do Bot *</Label>
            <Input
              id="nomebot"
              value={config.nomebot}
              onChange={(e) => handleChange("nomebot", e.target.value)}
              placeholder="Ex: MeuBot_bot"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mensagens de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pagamento_pendente">Pagamento Pendente *</Label>
            <Textarea
              id="pagamento_pendente"
              value={config.pagamento_pendente}
              onChange={(e) => handleChange("pagamento_pendente", e.target.value)}
              rows={3}
              placeholder="Mensagem quando o pagamento está pendente"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pagamento_vencido">Pagamento Vencido *</Label>
            <Textarea
              id="pagamento_vencido"
              value={config.pagamento_vencido}
              onChange={(e) => handleChange("pagamento_vencido", e.target.value)}
              rows={3}
              placeholder="Mensagem quando o pagamento está vencido"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enviar_link">Enviar Link *</Label>
            <Textarea
              id="enviar_link"
              value={config.enviar_link}
              onChange={(e) => handleChange("enviar_link", e.target.value)}
              rows={3}
              placeholder="Mensagem para enviar o link de acesso"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Texto Inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="texto_inicial">Texto Inicial *</Label>
            <Textarea
              id="texto_inicial"
              value={config.texto_inicial}
              onChange={(e) => handleChange("texto_inicial", e.target.value)}
              rows={6}
              placeholder="Texto de boas-vindas do bot"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planos</CardTitle>
          <div className="mt-2 p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-md">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
              ⚠️ Atenção: Inclua o código abaixo em cada plano:
            </p>
            <code className="block mt-1 text-xs bg-amber-50 dark:bg-amber-950 p-2 rounded font-mono">
              {'<pre>{{ $(\'HTTP RequestXX\').item.json.pix.payload }}</pre>'}
            </code>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
              Substitua XX pelo número correto do request (14, 15, 17, 10).
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plano_7_dias">Plano 7 Dias *</Label>
            <Textarea
              id="plano_7_dias"
              value={config.plano_7_dias}
              onChange={(e) => handleChange("plano_7_dias", e.target.value)}
              rows={4}
              placeholder="Mensagem do plano de 7 dias"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_15_dias">Plano 15 Dias *</Label>
            <Textarea
              id="plano_15_dias"
              value={config.plano_15_dias}
              onChange={(e) => handleChange("plano_15_dias", e.target.value)}
              rows={4}
              placeholder="Mensagem do plano de 15 dias"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_30_dias">Plano 30 Dias *</Label>
            <Textarea
              id="plano_30_dias"
              value={config.plano_30_dias}
              onChange={(e) => handleChange("plano_30_dias", e.target.value)}
              rows={4}
              placeholder="Mensagem do plano de 30 dias"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_anual">Plano Anual *</Label>
            <Textarea
              id="plano_anual"
              value={config.plano_anual}
              onChange={(e) => handleChange("plano_anual", e.target.value)}
              rows={4}
              placeholder="Mensagem do plano anual"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Botões e Preços</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_1">Botão 1 *</Label>
              <Input
                id="botao_1"
                value={config.botao_1}
                onChange={(e) => handleChange("botao_1", e.target.value)}
                placeholder="Ex: VIP - 7 DIAS 17,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_7_dias">Preço 7 Dias (R$) *</Label>
              <Input
                id="preco_7_dias"
                type="number"
                step="0.01"
                min="0.01"
                value={config.preco_7_dias || ""}
                onChange={(e) => handleChange("preco_7_dias", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_2">Botão 2 *</Label>
              <Input
                id="botao_2"
                value={config.botao_2}
                onChange={(e) => handleChange("botao_2", e.target.value)}
                placeholder="Ex: VIP - 15 DIAS - 24,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_15_dias">Preço 15 Dias (R$) *</Label>
              <Input
                id="preco_15_dias"
                type="number"
                step="0.01"
                min="0.01"
                value={config.preco_15_dias || ""}
                onChange={(e) => handleChange("preco_15_dias", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_3">Botão 3 *</Label>
              <Input
                id="botao_3"
                value={config.botao_3}
                onChange={(e) => handleChange("botao_3", e.target.value)}
                placeholder="Ex: VIP - 30 DIAS - 35,97"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_30_dias">Preço 30 Dias (R$) *</Label>
              <Input
                id="preco_30_dias"
                type="number"
                step="0.01"
                min="0.01"
                value={config.preco_30_dias || ""}
                onChange={(e) => handleChange("preco_30_dias", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_4">Botão 4 *</Label>
              <Input
                id="botao_4"
                value={config.botao_4}
                onChange={(e) => handleChange("botao_4", e.target.value)}
                placeholder="Ex: VIP ANUAL + chat privado - 89,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_anual">Preço Anual (R$) *</Label>
              <Input
                id="preco_anual"
                type="number"
                step="0.01"
                min="0.01"
                value={config.preco_anual || ""}
                onChange={(e) => handleChange("preco_anual", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Criar Bot
          </>
        )}
      </Button>
    </div>
  );
}
