import { useState, useEffect } from "react";
import { Subscription } from "@/types/subscription";

const SUBSCRIPTIONS_WEBHOOK_URL = "https://n8n.nexosoftwere.cloud/webhook/cb140df4-6e0b-44c3-88ac-ca4456c7e81d";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SUBSCRIPTIONS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetch" }),
      });
      if (!response.ok) throw new Error("Falha ao carregar assinaturas");
      const data = await response.json();
      setSubscriptions(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return { subscriptions, loading, error, fetchSubscriptions };
}
