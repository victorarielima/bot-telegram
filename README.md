# Bot Message Composer

Composição de mensagens de bot com interface intuitiva e completa.

## Como usar

### Desenvolvimento local

A única exigência é ter Node.js & npm instalados - [instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estas etapas:

```sh
# Passo 1: Clone o repositório
git clone <YOUR_GIT_URL>

# Passo 2: Navegue até o diretório do projeto
cd bot-message-composer

# Passo 3: Instale as dependências necessárias
npm i

# Passo 4: Inicie o servidor de desenvolvimento com reload automático
npm run dev
```

### Editar um arquivo diretamente no GitHub

- Navegue até o arquivo desejado(s).
- Clique no botão "Edit" (ícone de lápis) no topo à direita da visualização do arquivo.
- Faça suas alterações e confirme as mudanças.

### Usar GitHub Codespaces

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) perto do topo à direita.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e confirme e envie suas alterações quando terminar.

## Tecnologias utilizadas

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- React Query
- Sonner (Toast notifications)

## Estrutura do projeto

```
src/
├── components/      # Componentes React
├── pages/          # Páginas da aplicação
├── hooks/          # Hooks customizados
├── types/          # Tipos TypeScript
├── lib/            # Utilitários
└── styles/         # Estilos globais
```

## Desenvolvimento

```sh
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Faz build da aplicação
npm run preview  # Preview da versão built
npm run lint     # Executa o linter
```
