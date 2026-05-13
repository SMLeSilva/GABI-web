# Gabi Estética - Dashboard & Website

Este projeto é uma plataforma dinâmica de gestão e presença online desenvolvida para a clínica **Gabi Estética**. O sistema permite a gestão completa de serviços, galeria de fotos e informações de contato através de um painel administrativo intuitivo e moderno.

---

### 🎓 Projeto de Extensão Universitária
Este software foi desenvolvido como parte de um **Projeto de Extensão Universitária** vinculado ao programa **"Site Para Todos"**. 

O objetivo do programa é democratizar o acesso à tecnologia e presença digital para microempreendedores e profissionais autônomos, utilizando ferramentas de ponta para criar soluções profissionais, escaláveis e de fácil manutenção.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Processamento de Imagens:** [Sharp](https://sharp.pixelplumbing.com/) (Otimização automática para WebP)
- **Persistência:** Sistema de arquivos (JSON) para alta performance e portabilidade.

## ✨ Funcionalidades Principais

- **CMS Dinâmico:** Gerenciamento de categorias e serviços (adicionar, editar, remover) em tempo real.
- **Painel Administrativo:** Interface premium protegida por autenticação simples.
- **Upload Inteligente:** Sistema de upload que redimensiona e otimiza imagens automaticamente para garantir carregamento instantâneo.
- **Configurações Gerais:** Edição de WhatsApp (com máscara automática), E-mail, Endereço e Redes Sociais (Instagram, Facebook, TikTok).
- **Design Responsivo:** Interface adaptada para dispositivos móveis, tablets e desktops.
- **SEO Otimizado:** Estrutura semântica focada em visibilidade nos mecanismos de busca.

## 🛠️ Como Executar o Projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Gerar build de produção:**
   ```bash
   npm run build
   ```

4. **Acesso ao Painel:**
   - Rota: `/admin`
   - Credenciais padrão: `admin` / `admin`

## 📁 Estrutura de Arquivos

- `src/content/`: Contém os arquivos JSON que funcionam como o banco de dados do site.
- `src/app/api/`: Endpoints para manipulação de arquivos e uploads.
- `public/images/uploads/`: Local onde as imagens otimizadas são armazenadas.
- `src/components/`: Componentes reutilizáveis da interface.

---