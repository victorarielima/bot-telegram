import { useState } from "react";
import { BotConfig } from "@/types/bot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BotEditorProps {
  bot: BotConfig;
  onBack: () => void;
  onSave: (bot: BotConfig) => Promise<boolean>;
}

export function BotEditor({ bot, onBack, onSave }: BotEditorProps) {
  const [config, setConfig] = useState<BotConfig>(bot);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof BotConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(config);
      toast.success("Configurações salvas com sucesso!");
    } catch {
      toast.error("Erro ao salvar configurações");
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
        <h1 className="text-2xl font-bold">{config.nomebot}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Bot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <Input
              id="token"
              value={config.token}
              onChange={(e) => handleChange("token", e.target.value)}
              placeholder="Token do bot"
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
            <Label htmlFor="pagamento_pendente">Pagamento Pendente</Label>
            <Textarea
              id="pagamento_pendente"
              value={config.pagamento_pendente}
              onChange={(e) => handleChange("pagamento_pendente", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pagamento_vencido">Pagamento Vencido</Label>
            <Textarea
              id="pagamento_vencido"
              value={config.pagamento_vencido}
              onChange={(e) => handleChange("pagamento_vencido", e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="enviar_link">Enviar Link</Label>
            <Textarea
              id="enviar_link"
              value={config.enviar_link}
              onChange={(e) => handleChange("enviar_link", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Texto Inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={config.texto_inicial}
            onChange={(e) => handleChange("texto_inicial", e.target.value)}
            rows={6}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plano_7_dias">Plano 7 Dias</Label>
            <Textarea
              id="plano_7_dias"
              value={config.plano_7_dias}
              onChange={(e) => handleChange("plano_7_dias", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_15_dias">Plano 15 Dias</Label>
            <Textarea
              id="plano_15_dias"
              value={config.plano_15_dias}
              onChange={(e) => handleChange("plano_15_dias", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_30_dias">Plano 30 Dias</Label>
            <Textarea
              id="plano_30_dias"
              value={config.plano_30_dias}
              onChange={(e) => handleChange("plano_30_dias", e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano_anual">Plano Anual</Label>
            <Textarea
              id="plano_anual"
              value={config.plano_anual}
              onChange={(e) => handleChange("plano_anual", e.target.value)}
              rows={4}
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
              <Label htmlFor="botao_1">Botão 1</Label>
              <Input
                id="botao_1"
                value={config.botao_1}
                onChange={(e) => handleChange("botao_1", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_7_dias">Preço 7 Dias (R$)</Label>
              <Input
                id="preco_7_dias"
                type="number"
                step="0.01"
                value={config.preco_7_dias}
                onChange={(e) => handleChange("preco_7_dias", parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_2">Botão 2</Label>
              <Input
                id="botao_2"
                value={config.botao_2}
                onChange={(e) => handleChange("botao_2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_15_dias">Preço 15 Dias (R$)</Label>
              <Input
                id="preco_15_dias"
                type="number"
                step="0.01"
                value={config.preco_15_dias}
                onChange={(e) => handleChange("preco_15_dias", parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_3">Botão 3</Label>
              <Input
                id="botao_3"
                value={config.botao_3}
                onChange={(e) => handleChange("botao_3", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_30_dias">Preço 30 Dias (R$)</Label>
              <Input
                id="preco_30_dias"
                type="number"
                step="0.01"
                value={config.preco_30_dias}
                onChange={(e) => handleChange("preco_30_dias", parseFloat(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botao_4">Botão 4</Label>
              <Input
                id="botao_4"
                value={config.botao_4}
                onChange={(e) => handleChange("botao_4", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco_anual">Preço Anual (R$)</Label>
              <Input
                id="preco_anual"
                type="number"
                step="0.01"
                value={config.preco_anual}
                onChange={(e) => handleChange("preco_anual", parseFloat(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </>
        )}
      </Button>
    </div>
  );
}
