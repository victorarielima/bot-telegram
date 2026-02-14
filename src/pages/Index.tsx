import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBots } from "@/hooks/useBots";
import { BotCard } from "@/components/BotCard";
import { BotEditor } from "@/components/BotEditor";
import { AddBotForm } from "@/components/AddBotForm";
import { BotConfig } from "@/types/bot";
import { Loader2, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { bots, loading, error, fetchBots, saveBot } = useBots();
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto">
          <AddBotForm
            onBack={() => setShowAddForm(false)}
            onSuccess={() => {
              setShowAddForm(false);
              fetchBots();
            }}
          />
        </div>
      </div>
    );
  }

  if (selectedBot) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto">
          <BotEditor
            bot={selectedBot}
            onBack={() => setSelectedBot(null)}
            onSave={saveBot}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gerenciador de Bots</h1>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/analytics")} variant="secondary">
              Analytics
            </Button>
            <Button onClick={() => navigate("/subscriptions")} variant="secondary">
              Assinaturas
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Bot
            </Button>
            <Button variant="outline" onClick={fetchBots} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchBots}>Tentar novamente</Button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => (
              <BotCard
                key={bot.id}
                name={bot.nomebot}
                onClick={() => setSelectedBot(bot)}
              />
            ))}
          </div>
        )}

        {!loading && !error && bots.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum bot encontrado
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
