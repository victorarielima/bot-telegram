import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface BotCardProps {
  name: string;
  onClick: () => void;
}

export function BotCard({ name, onClick }: BotCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-3">
        <Bot className="h-8 w-8 text-primary" />
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Clique para editar configurações</p>
      </CardContent>
    </Card>
  );
}
