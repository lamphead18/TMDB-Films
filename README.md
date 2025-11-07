# CineVerse

Aplicação React moderna para explorar filmes, criar listas de favoritos e descobrir novos conteúdos através da API do The Movie Database (TMDB).

## 🚀 Tecnologias

- React 18+ com TypeScript
- React Router para navegação
- Context API para estado global
- Axios para requisições HTTP
- Tailwind CSS para estilização
- Vite como bundler

## 📋 Funcionalidades

- **Home**: Grid responsivo com filmes populares e paginação
- **Detalhes do Filme**: Informações completas com opção de favoritar
- **Favoritos**: Lista personalizada com filtros de ordenação
- **Busca**: Pesquisa de filmes com destaque do termo buscado
- **Header**: Navegação e busca global em todas as páginas

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd cineverse
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Obtenha sua API Key do TMDB:
   - Crie uma conta em: https://www.themoviedb.org/
   - Gere sua API Key em: https://www.themoviedb.org/settings/api
   - Adicione a chave no arquivo `.env`:

```env
VITE_TMDB_API_KEY=sua_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## 🚀 Execução

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Executar testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test:coverage
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação e busca
│   ├── Layout.tsx      # Layout base das páginas
│   └── MovieCard.tsx   # Card de filme
├── contexts/           # Context API
│   └── FavoritesContext.tsx
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── MovieDetails.tsx # Detalhes do filme
│   ├── Favorites.tsx   # Lista de favoritos
│   └── Search.tsx      # Página de busca
├── services/           # Serviços de API
│   └── tmdb.ts         # Cliente da API TMDB
├── test/               # Testes unitários
│   ├── FavoritesContext.test.tsx
│   ├── MovieCard.test.tsx
│   ├── SearchMovieCard.test.tsx
│   └── utils.test.ts
├── types/              # Tipos TypeScript
│   └── movie.ts        # Interfaces dos filmes
└── utils/              # Utilitários
```

## 🎯 Páginas

### Home (`/`)

- Lista de filmes populares
- Grid responsivo
- Paginação com botão "Carregar Mais"
- Cards com poster, nota e botão de favoritar

### Detalhes (`/movie/:id`)

- Imagem de fundo e informações detalhadas
- Gêneros, data de lançamento, nota e sinopse
- Botão para adicionar/remover dos favoritos

### Favoritos (`/favorites`)

- Lista de filmes favoritados
- Filtros de ordenação (título A-Z/Z-A, nota)
- Botão de remoção nos cards
- Estado vazio com call-to-action

### Busca (`/search?q=termo`)

- Resultados da pesquisa
- Destaque do termo buscado nos títulos
- Paginação dos resultados

## ✨ Características

- **Interface moderna** com glass effects e animações
- **Busca inteligente** com sugestões em tempo real
- **Sistema de favoritos** persistente
- **Design responsivo** para todos os dispositivos
- **Dados atualizados** da API oficial do TMDB
- **TypeScript** para maior segurança no desenvolvimento
- **Testes unitários** para garantir qualidade
- **Performance otimizada** com lazy loading

## 🧪 Testes

O projeto inclui testes unitários abrangentes usando Jest e React Testing Library:

- **FavoritesContext**: Testa o sistema de favoritos
- **MovieCard**: Testa renderização e interações dos cards
- **SearchMovieCard**: Testa destaque de termos de busca
- **Utils**: Testa funções utilitárias

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## 🚀 Deploy

**Plataformas suportadas:**

- Vercel (recomendado)
- Netlify
- GitHub Pages
- Surge.sh
