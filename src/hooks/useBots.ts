import { useState, useEffect } from "react";
import { BotConfig } from "@/types/bot";

const FETCH_WEBHOOK_URL = "https://n8n.nexosoftwere.cloud/webhook/f710b7ec-3f73-4bd2-b4e9-1fedd724d711";
const SAVE_WEBHOOK_URL = "https://n8n.nexosoftwere.cloud/webhook/d342f0c9-d093-44b0-bde5-143dd82a8610";

export function useBots() {
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBots = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(FETCH_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetch" }),
      });
      if (!response.ok) throw new Error("Falha ao carregar dados");
      const data = await response.json();
      setBots(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const saveBot = async (bot: BotConfig) => {
    try {
      const response = await fetch(SAVE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bot),
      });
      if (!response.ok) throw new Error("Falha ao salvar");
      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return { bots, loading, error, fetchBots, saveBot };
}
