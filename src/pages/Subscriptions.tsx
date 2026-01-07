import { useState, useMemo } from "react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { Subscription } from "@/types/subscription";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, X } from "lucide-react";

const Subscriptions = () => {
  const { subscriptions, loading, error, fetchSubscriptions } = useSubscriptions();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [botFilter, setBotFilter] = useState<string>("");
  const [assinnaturaFilter, setAssinnaturaFilter] = useState<string>("");

  const uniqueBots = useMemo(() => {
    return Array.from(new Set(subscriptions.map(s => s.bot_contratado))).sort();
  }, [subscriptions]);

  const uniqueAssignatures = useMemo(() => {
    return Array.from(new Set(subscriptions.map(s => s.assinatura))).sort();
  }, [subscriptions]);

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(subscriptions.map(s => s.status))).sort();
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const matchesStatus = !statusFilter || subscription.status === statusFilter;
      const matchesBot = !botFilter || subscription.bot_contratado === botFilter;
      const matchesAssignatura = !assinnaturaFilter || subscription.assinatura === assinnaturaFilter;
      return matchesStatus && matchesBot && matchesAssignatura;
    });
  }, [subscriptions, statusFilter, botFilter, assinnaturaFilter]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Assinaturas</h1>
          <Button
            onClick={fetchSubscriptions}
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar
              </>
            )}
          </Button>
        </div>

        {error && (
          <Card className="border-red-500 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? "" : value)}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bot-filter">Bot</Label>
                <Select value={botFilter || "all"} onValueChange={(value) => setBotFilter(value === "all" ? "" : value)}>
                  <SelectTrigger id="bot-filter">
                    <SelectValue placeholder="Todos os bots" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os bots</SelectItem>
                    {uniqueBots.map((bot) => (
                      <SelectItem key={bot} value={bot}>
                        {bot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assinnatura-filter">Tipo de Assinatura</Label>
                <Select value={assinnaturaFilter || "all"} onValueChange={(value) => setAssinnaturaFilter(value === "all" ? "" : value)}>
                  <SelectTrigger id="assinnatura-filter">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {uniqueAssignatures.map((assignatura) => (
                      <SelectItem key={assignatura} value={assignatura}>
                        {assignatura}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {(statusFilter || botFilter || assinnaturaFilter) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter("");
                  setBotFilter("");
                  setAssinnaturaFilter("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Assinaturas ({filteredSubscriptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Assinatura</TableHead>
                    <TableHead>Data Assinatura</TableHead>
                    <TableHead>Data Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ID Telegram</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        Nenhuma assinatura encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell className="font-medium">{subscription.cliente}</TableCell>
                        <TableCell>{subscription.bot_contratado}</TableCell>
                        <TableCell>{subscription.assinatura}</TableCell>
                        <TableCell>{subscription.data_assinatura}</TableCell>
                        <TableCell>{subscription.data_vencimento}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              subscription.status === "ATIVO"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {subscription.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{subscription.idtelegram}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;
