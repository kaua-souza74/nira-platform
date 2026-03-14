# 🦉 NIRA — Guia Completo de Instalação

**Núcleo de Identificação e Resposta ao Abuso**  
Equipe **E.Y.E** — Ethical Youth Engineers · SESI-SENAI · 2026

---

## 📋 Índice

1. [Pré-requisitos](#1-pré-requisitos)
2. [Criar o projeto do zero](#2-criar-o-projeto-do-zero)
3. [Instalar dependências](#3-instalar-dependências)
4. [Estrutura de pastas](#4-estrutura-de-pastas)
5. [Copiar os arquivos do projeto](#5-copiar-os-arquivos-do-projeto)
6. [Variáveis de ambiente (.env)](#6-variáveis-de-ambiente-env)
7. [Rodar o projeto](#7-rodar-o-projeto)
8. [Credenciais de teste](#8-credenciais-de-teste)
9. [Rotas da aplicação](#9-rotas-da-aplicação)
10. [Estrutura de arquivos completa](#10-estrutura-de-arquivos-completa)
11. [Solução de erros comuns](#11-solução-de-erros-comuns)
12. [Scripts disponíveis](#12-scripts-disponíveis)
13. [Deploy (quando chegar na fase de produção)](#13-deploy)

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado na máquina:

| Ferramenta | Versão mínima | Como verificar | Link de download |
|---|---|---|---|
| **Node.js** | 16.x ou superior | `node -v` | https://nodejs.org |
| **npm** | 8.x ou superior | `npm -v` | Vem junto com o Node |
| **Git** | qualquer | `git --version` | https://git-scm.com |
| **VS Code** | qualquer | — | https://code.visualstudio.com |

> ⚠️ **Windows:** Se o seu nome de usuário tem acento (ex: `C:\Users\Olá`), sempre abra o terminal **de dentro da pasta do projeto** pelo explorador de arquivos (clique na barra de endereço → digite `cmd` → Enter). Isso evita problemas de encoding no PowerShell.

---

## 2. Criar o projeto do zero

Abra o terminal **na pasta onde quer criar o projeto** (ex: sua Área de Trabalho) e rode:

```bash
npx create-react-app nira-platform
cd nira-platform
```

> O `npx create-react-app` pode demorar de 2 a 5 minutos. Aguarde sem fechar o terminal.

---

## 3. Instalar dependências

Ainda dentro da pasta `nira-platform`, instale **todas** as dependências de uma vez:

```bash
npm install react-router-dom leaflet
```

### O que cada pacote faz:

| Pacote | Para que serve |
|---|---|
| `react-router-dom` | Navegação entre páginas (roteamento) |
| `leaflet` | Mapa interativo gratuito com OpenStreetMap |

### Verificar se instalou certo:

```bash
npm list react-router-dom leaflet
```

Deve aparecer algo como:
```
nira-platform@0.1.0
├── leaflet@1.9.x
└── react-router-dom@6.x.x
```

---

## 4. Estrutura de pastas

Depois de criar o projeto com CRA, crie as pastas abaixo dentro de `src/`.  
O CRA não cria essas pastas automaticamente — você precisa criar manualmente:

```
nira-platform/
├── public/
│   └── index.html              ← substituir pelo arquivo do projeto
└── src/
    ├── App.js                  ← substituir
    ├── index.js                ← substituir
    ├── contexts/               ← CRIAR esta pasta
    │   └── AuthContext.js
    ├── components/             ← CRIAR esta pasta
    │   ├── Navbar.js
    │   ├── Footer.js
    │   ├── PrivateRoute.js
    │   └── ScrollToTop.js
    ├── pages/                  ← CRIAR esta pasta
    │   ├── HomePage.js
    │   ├── ComoFuncionaPage.js
    │   ├── ConteudosPage.js
    │   ├── TriagemPage.js
    │   ├── LoginPage.js
    │   ├── SobrePage.js
    │   ├── AdminPage.js
    │   ├── ConteudosAdmPage.js
    │   ├── GerenciarUsuariosPage.js
    │   ├── MapaFuncionarioPage.js
    │   └── ChatPsicologoPage.js
    └── styles/                 ← CRIAR esta pasta
        └── global.css
```

### Como criar as pastas no Windows (CMD):

```cmd
mkdir src\contexts
mkdir src\components
mkdir src\pages
mkdir src\styles
```

### Como criar no Mac/Linux (Terminal):

```bash
mkdir -p src/{contexts,components,pages,styles}
```

---

## 5. Copiar os arquivos do projeto

Apague os seguintes arquivos que o CRA cria por padrão (não são usados):

```
src/App.css
src/App.test.js
src/index.css
src/logo.svg
src/reportWebVitals.js
src/setupTests.js
```

Depois copie os arquivos do ZIP do projeto para as pastas correspondentes, conforme a estrutura acima.

---

## 6. Variáveis de ambiente (.env)

Crie um arquivo chamado `.env` na **raiz do projeto** (mesmo nível que `package.json`).

```
nira-platform/
├── .env          ← criar aqui
├── package.json
├── public/
└── src/
```

### Conteúdo do `.env`:

```env
# ─── NIRA — Variáveis de Ambiente ───────────────────────────
# Arquivo .env — não enviar para o Git (já está no .gitignore)

# ── MAPA (Leaflet + OpenStreetMap — 100% GRATUITO, sem chave) ──
# O mapa funciona sem nenhuma chave. Não precisa configurar nada.
# Usa CartoDB Dark Matter tiles via CDN automaticamente.

# ── GOOGLE MAPS (OPCIONAL — não usado por padrão) ──────────────
# Se quiser trocar Leaflet por Google Maps no futuro:
# REACT_APP_GOOGLE_MAPS_KEY=sua_chave_aqui
# Como obter: console.cloud.google.com → Maps JavaScript API
# Plano gratuito: $200/mês de crédito (suficiente para desenvolvimento)

# ── BACKEND PHP (Sprint 2 em diante) ───────────────────────────
# REACT_APP_API_URL=http://localhost:8000/api
# Descomente quando o backend PHP estiver rodando

# ── AMBIENTE ───────────────────────────────────────────────────
REACT_APP_ENV=development
```

> 💡 **Nota:** O CRA exige que todas as variáveis de ambiente comecem com `REACT_APP_`. Variáveis sem esse prefixo são ignoradas.

> ⚠️ **Nunca** suba o `.env` com chaves reais para o GitHub. Ele já está no `.gitignore` por padrão no CRA.

---

## 7. Rodar o projeto

```bash
npm start
```

Abrirá automaticamente em: **http://localhost:3000**

Se não abrir, acesse manualmente no navegador.

> Se aparecer o erro `Something is already running on port 3000`, o terminal perguntará se quer usar outra porta. Digite `Y` e Enter.

---

## 8. Credenciais de teste

Como não há backend ainda (Sprint 1), os logins são simulados localmente em `src/contexts/AuthContext.js`:

| Usuário | Senha | Perfil | Acessa |
|---|---|---|---|
| `admin` | `nira2026` | Administrador | Tudo — dashboard, mapa, chat, usuários |
| `ong_vida` | `ong123` | ONG | Conteúdos ADM + Chat de atendimento |
| `psicologa01` | `chat123` | Psicóloga | Somente chat de atendimento |
| `social01` | `social123` | Assistente Social | Somente chat de atendimento |
| `policial01` | `mapa123` | Policial | Somente mapa de campo |
| `agente01` | `agente123` | Agente de campo | Somente mapa de campo |

> Todos os logins aparecem como atalhos clicáveis na tela `/login` durante o desenvolvimento.

---

## 9. Rotas da aplicação

| URL | Página | Acesso |
|---|---|---|
| `/` | Home | Público |
| `/como-funciona` | Como Funciona | Público |
| `/conteudos` | Conteúdos (Blog) | Público |
| `/triagem` | Chat de Triagem IA | Público |
| `/login` | Login | Público |
| `/sobre` | Sobre a NIRA | Público |
| `/admin` | Dashboard ADM | 🔒 ADM |
| `/admin/usuarios` | Gerenciar Usuários | 🔒 ADM |
| `/admin/conteudos` | Gestão de Conteúdos | 🔒 ADM + ONG |
| `/mapa` | Mapa de Campo | 🔒 ADM + Policial + Agente |
| `/chat-psicologo` | Atendimentos | 🔒 ADM + ONG + Psicóloga + Assist. Social |

---

## 10. Estrutura de arquivos completa

```
nira-platform/
│
├── .env                          # Variáveis de ambiente (não sobe pro Git)
├── .gitignore                    # Gerado pelo CRA (já ignora node_modules e .env)
├── package.json                  # Dependências e scripts
├── README.md                     # Este arquivo
│
├── public/
│   ├── index.html                # HTML base com Poppins + Anonymous Pro (Google Fonts)
│   ├── favicon.ico
│   └── manifest.json
│
└── src/
    │
    ├── index.js                  # Ponto de entrada do React
    ├── App.js                    # Rotas + AuthProvider + ScrollToTop
    │
    ├── styles/
    │   └── global.css            # Variáveis CSS, reset, botões, animações globais
    │
    ├── contexts/
    │   └── AuthContext.js        # Login, logout, roles, especialidades, temAcesso()
    │
    ├── components/
    │   ├── Navbar.js             # Pill glassmorphism, dropdown filtrado por role/especialidade
    │   ├── Footer.js             # Rodapé com links de emergência
    │   ├── PrivateRoute.js       # Proteção de rotas por role e especialidade
    │   └── ScrollToTop.js        # Scroll ao topo + transição de página entre rotas
    │
    └── pages/
        ├── HomePage.js           # Landing page: Hero, Dores, Quote, Solução, FAQ, Equipe
        ├── ComoFuncionaPage.js   # Demonstração: passos, interfaces por aba, papéis
        ├── ConteudosPage.js      # Blog com destaque, filtros, grid, modal de artigo
        ├── TriagemPage.js        # Chat de IA (PsiTech) com histórico e fluxo ramificado
        ├── LoginPage.js          # Apenas login, sem cadastro público
        ├── SobrePage.js          # Sobre a NIRA: manifesto, estatísticas, equipe, stack
        ├── AdminPage.js          # Dashboard ADM: alertas, casos, profissionais
        ├── ConteudosAdmPage.js   # Gestão de artigos (ADM + ONG)
        ├── GerenciarUsuariosPage.js  # CRUD de usuários com especialidades (só ADM)
        ├── MapaFuncionarioPage.js    # Mapa Leaflet + alocação (ADM + policiais/agentes)
        └── ChatPsicologoPage.js      # Atendimento humano: fila, chat, notas (ADM + psicólogas/ONGs)
```

---

## 11. Solução de erros comuns

### ❌ `Module not found: Can't resolve 'react-router-dom'`
```bash
npm install react-router-dom
```

### ❌ `Module not found: Can't resolve 'leaflet'`
```bash
npm install leaflet
```

### ❌ `can't access property "useRef", resolveDispatcher() is null`
Duas instâncias do React carregadas. Solução:
```bash
# Windows CMD (dentro da pasta nira-platform)
rmdir /s /q node_modules
del package-lock.json
npm install
npm start
```
```bash
# Mac/Linux
rm -rf node_modules package-lock.json
npm install
npm start
```

### ❌ `Something is already running on port 3000`
Outro processo está usando a porta. O terminal pergunta se quer usar outra — pressione `Y`. Ou mate o processo:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <numero_do_pid> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### ❌ `cd` não funciona no PowerShell com nome de usuário acentuado
Abra o CMD direto pela pasta:
1. Abra o Explorador de Arquivos
2. Navegue até `nira-platform`
3. Clique na barra de endereço
4. Digite `cmd` e pressione Enter

### ❌ O mapa não aparece (tela preta/em branco)
O Leaflet carrega o CSS via CDN automaticamente no `MapaFuncionarioPage.js`. Verifique sua conexão com a internet. Se estiver offline, o mapa não carrega tiles — isso é esperado.

### ❌ Página em branco após `npm start`
Verifique se copiou o `src/index.js` correto. O CRA original usa `index.js` diferente do projeto.

### ❌ `npm` não é reconhecido no Windows
O Node.js não foi instalado corretamente. Reinstale pelo site oficial: https://nodejs.org e marque a opção "Add to PATH" durante a instalação.

---

## 12. Scripts disponíveis

```bash
npm start        # Inicia o servidor de desenvolvimento (http://localhost:3000)
npm run build    # Gera build de produção na pasta /build
npm test         # Roda os testes (Jest)
```

---

## 13. Deploy

> ⚠️ Ainda não aplicável — Sprint 3 (mai/2026). Seção reservada para referência futura.

### Build de produção:
```bash
npm run build
```
Gera a pasta `/build` com os arquivos otimizados prontos para deploy.

### Opções de hospedagem gratuita para o frontend React:
| Plataforma | URL | Observação |
|---|---|---|
| **Vercel** | vercel.com | Recomendado — deploy automático pelo GitHub |
| **Netlify** | netlify.com | Simples, bom para projetos acadêmicos |
| **GitHub Pages** | pages.github.com | Gratuito, requer configuração extra para CRA |

### Backend PHP (Sprint 2/3):
| Plataforma | URL | Observação |
|---|---|---|
| **InfinityFree** | infinityfree.com | Gratuito, suporta PHP + MySQL |
| **000webhost** | 000webhost.com | Gratuito, ideal para projetos escolares |
| **Railway** | railway.app | Plano gratuito, mais moderno |

Após fazer o deploy do backend, atualize o `.env`:
```env
REACT_APP_API_URL=https://sua-api.dominio.com/api
```

---

## 🎨 Identidade Visual

| Variável CSS | Valor | Uso |
|---|---|---|
| `--indigo` | `#6B6898` | Cor primária |
| `--accent` | `#9B8FFF` | Destaques, CTAs |
| `--danger` | `#FF4757` | S.O.S., alertas |
| `--success` | `#2ED573` | Status ativo |
| `--warning` | `#FFC800` | Status pendente |
| `--bg-deep` | `#12111F` | Fundo principal |
| `--bg-dark` | `#1A1830` | Fundo secundário |
| `--white` | `#F4F6F8` | Texto principal |
| `--off-white` | `#EFEEEA` | Texto secundário |

**Fontes:** [Poppins](https://fonts.google.com/specimen/Poppins) (display/body) + [Anonymous Pro](https://fonts.google.com/specimen/Anonymous+Pro) (mono/labels)  
Carregadas via Google Fonts no `public/index.html` — sem instalação necessária.

---

## 👥 Equipe E.Y.E

| Membro | Papel |
|---|---|
| Giovanna | UX / Design |
| Samuel | Backend / PHP |
| Kauã | Frontend / React |
| Pietro | Full Stack |
| Lucas | QA / Documentação |

**Instituição:** SESI-SENAI · Projeto Semestral 2026.1

---

*"Violência não começa com um soco. Começa com o silêncio forçado. A NIRA existe para destruir essa barreira."*  
— Equipe E.Y.E
