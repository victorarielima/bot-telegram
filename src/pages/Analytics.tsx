import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Users, UserCheck, Activity, TrendingUp, RefreshCw } from "lucide-react";
import { BotInteraction, BotStats } from "@/types/analytics";
import { Button } from "@/components/ui/button";

const WEBHOOK_URL = "https://n8n.nexosoftwere.cloud/webhook/eac81fa4-f444-4165-9f0d-d96615bc97ab";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<BotInteraction[]>([]);
  const [botStats, setBotStats] = useState<BotStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }
      
      const jsonData: BotInteraction[] = await response.json();
      setData(jsonData);
      
      // Processar dados para estatísticas por bot
      const statsMap = new Map<string, BotStats>();
      
      jsonData.forEach((interaction) => {
        const botName = interaction.nomebot;
        
        if (!statsMap.has(botName)) {
          statsMap.set(botName, {
            nomebot: botName,
            totalPessoas: 0,
            totalAssinaturas: 0,
            totalInteracoes: 0
          });
        }
        
        const stats = statsMap.get(botName)!;
        stats.totalPessoas += 1; // Cada registro é uma pessoa única
        stats.totalAssinaturas += interaction.assinaturas;
        stats.totalInteracoes += interaction.quantidade_interacoes;
      });
      
      const statsArray = Array.from(statsMap.values());
      setBotStats(statsArray);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPessoas = () => data.length;
  const getTotalAssinaturas = () => botStats.reduce((sum, stat) => sum + stat.totalAssinaturas, 0);
  const getTotalInteracoes = () => botStats.reduce((sum, stat) => sum + stat.totalInteracoes, 0);
  const getTaxaConversao = () => {
    const total = getTotalPessoas();
    const assinaturas = getTotalAssinaturas();
    return total > 0 ? ((assinaturas / total) * 100).toFixed(1) : "0";
  };

  const chartConfig = {
    pessoas: {
      label: "Pessoas",
      color: "#0088FE",
    },
    assinaturas: {
      label: "Assinaturas",
      color: "#00C49F",
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando dados...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Erro ao Carregar Dados</CardTitle>
              <CardDescription className="text-red-600">{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <button 
                onClick={fetchData}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Tentar Novamente
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4">
              <Button onClick={() => navigate("/")} variant="ghost">
                Bots
              </Button>
              <Button onClick={() => navigate("/subscriptions")} variant="ghost">
                Assinaturas
              </Button>
              <Button onClick={() => navigate("/analytics")} variant="ghost" className="font-semibold">
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Analytics</h1>
            <p className="text-gray-600">Visualize o desempenho dos seus bots em tempo real</p>
            <Button 
              onClick={fetchData}
              className="mt-4"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar Dados
            </Button>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalPessoas()}</div>
                <p className="text-xs text-muted-foreground">
                  Usuários únicos registrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Assinaturas</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalAssinaturas()}</div>
                <p className="text-xs text-muted-foreground">
                  Assinaturas ativas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Interações</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalInteracoes()}</div>
                <p className="text-xs text-muted-foreground">
                  Interações registradas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTaxaConversao()}%</div>
                <p className="text-xs text-muted-foreground">
                  Pessoas → Assinaturas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Barras Comparativo */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pessoas vs Assinaturas por Bot</CardTitle>
              <CardDescription>Comparação entre quantidade de usuários e assinaturas de cada bot</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={botStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nomebot" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="totalPessoas" fill="#0088FE" name="Pessoas" />
                    <Bar dataKey="totalAssinaturas" fill="#00C49F" name="Assinaturas" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gráfico de Pizza - Distribuição de Pessoas */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Pessoas por Bot</CardTitle>
                <CardDescription>Proporção de usuários em cada bot</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={botStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ nomebot, percent }) => `${nomebot}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalPessoas"
                      >
                        {botStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Pizza - Distribuição de Assinaturas */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Assinaturas por Bot</CardTitle>
                <CardDescription>Proporção de assinaturas em cada bot</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={botStats.filter(stat => stat.totalAssinaturas > 0)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ nomebot, percent }) => `${nomebot}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalAssinaturas"
                      >
                        {botStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Linha - Interações */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Total de Interações por Bot</CardTitle>
              <CardDescription>Quantidade de interações registradas em cada bot</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={botStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nomebot" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="totalInteracoes" 
                      stroke="#8884D8" 
                      strokeWidth={2}
                      name="Interações"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Tabela de Detalhes */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes por Bot</CardTitle>
              <CardDescription>Resumo estatístico de cada bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium">Nome do Bot</th>
                      <th className="text-right p-3 font-medium">Pessoas</th>
                      <th className="text-right p-3 font-medium">Assinaturas</th>
                      <th className="text-right p-3 font-medium">Interações</th>
                      <th className="text-right p-3 font-medium">Taxa de Conversão</th>
                    </tr>
                  </thead>
                  <tbody>
                    {botStats.map((stat, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{stat.nomebot}</td>
                        <td className="text-right p-3">{stat.totalPessoas}</td>
                        <td className="text-right p-3">{stat.totalAssinaturas}</td>
                        <td className="text-right p-3">{stat.totalInteracoes}</td>
                        <td className="text-right p-3">
                          {stat.totalPessoas > 0 
                            ? `${((stat.totalAssinaturas / stat.totalPessoas) * 100).toFixed(1)}%`
                            : "0%"
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 bg-gray-50 font-bold">
                    <tr>
                      <td className="p-3">TOTAL</td>
                      <td className="text-right p-3">{getTotalPessoas()}</td>
                      <td className="text-right p-3">{getTotalAssinaturas()}</td>
                      <td className="text-right p-3">{getTotalInteracoes()}</td>
                      <td className="text-right p-3">{getTaxaConversao()}%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
