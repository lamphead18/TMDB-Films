# Sistema de Filmes com TMDB

Aplicação React que permite explorar filmes, criar listas de favoritos e descobrir novos conteúdos através da API do The Movie Database (TMDB).

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
cd nttdata-challenge
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

## ✅ Funcionalidades Implementadas

- ✅ **4 páginas obrigatórias** completas
- ✅ **Busca em tempo real** com destaque nos títulos
- ✅ **Paginação** em todas as páginas
- ✅ **Sistema de favoritos** com localStorage
- ✅ **Design responsivo** mobile-first
- ✅ **Dados reais da API** (gêneros, classificação)
- ✅ **Estados de loading/erro/vazio**
- ✅ **TypeScript 100%** tipado
- ✅ **Testes unitários** com Jest + React Testing Library
- ✅ **Glass effects** e animações modernas

## 🚀 Deploy

Veja instruções detalhadas em `deploy.md`

**Plataformas suportadas:**
- Vercel (recomendado)
- Netlify
- GitHub Pages

## 🔧 Próximos Passos Opcionais

- [ ] Adicionar testes unitários
- [ ] Implementar infinite scroll
- [ ] Adicionar mais filtros na busca
- [ ] Melhorar acessibilidade
- [ ] Adicionar PWA features
