# 📋 Roadmap de Desenvolvimento — causA3

> Marque as tarefas com `[x]` conforme for concluindo.

---

## Fase 1 — Configuração e estrutura base

- [ ] Inicializar repositório no GitHub
- [ ] Configurar projeto Node.js com package.json
- [ ] Instalar e configurar Electron.js
- [ ] Configurar estrutura de pastas do projeto (main, renderer, backend)
- [ ] Configurar Express.js como servidor backend local
- [ ] Conectar Express ao processo Electron via IPC ou HTTP local
- [ ] Criar `.env.example` com variáveis necessárias

---

## Fase 2 — Banco de dados e modelos

- [ ] Instalar e configurar MongoDB local com Mongoose
- [ ] Criar modelo de dados para Análise 8D (8 disciplinas)
- [ ] Criar modelo de dados para projeto A3 (PDCA)
- [ ] Criar modelo de dados para Planos de Ação
- [ ] Criar modelo de dados para Histórico e controle de versões
- [ ] Criar seed de dados para testes iniciais

---

## Fase 3 — API REST (backend)

- [ ] Criar rotas CRUD para análise 8D
- [ ] Criar rotas CRUD para projeto A3
- [ ] Criar rota de conversão 8D → A3 (integração entre metodologias)
- [ ] Criar rota de listagem de histórico com filtros
- [ ] Criar rota para dados do dashboard (métricas e KPIs)
- [ ] Configurar Axios no renderer para consumir a API
- [ ] Tratar erros e validações nas rotas

---

## Fase 4 — Interface: formulário 8D

- [ ] Criar layout base da aplicação (sidebar + área de conteúdo)
- [ ] Criar página inicial / listagem de análises
- [ ] Criar formulário guiado passo a passo — D1 a D8
- [ ] Implementar validação de campos obrigatórios por disciplina
- [ ] Implementar salvamento automático de rascunho
- [ ] Criar tela de visualização/impressão da análise 8D completa

---

## Fase 5 — Interface: projeto A3

- [ ] Criar tela de abertura de A3 a partir de uma análise 8D
- [ ] Pré-popular campos do A3 com dados vindos do 8D
- [ ] Criar formulário A3 nas seções: contexto, estado atual, meta, análise, plano de ação, resultado, padronização
- [ ] Criar visualização do A3 no formato folha única (layout A3)
- [ ] Permitir exportação do A3 em PDF

---

## Fase 6 — Dashboard e histórico

- [ ] Criar tela de dashboard com visão geral
- [ ] Implementar cards de métricas (análises abertas, em andamento, encerradas)
- [ ] Criar gráfico de análises por período
- [ ] Criar lista de histórico com filtros (status, data, responsável)
- [ ] Implementar rastreabilidade: 8D → A3 → resultado
- [ ] Criar tela de detalhes do histórico de uma análise

---

## Fase 7 — Polimento e entrega

- [ ] Revisar responsividade e consistência visual da interface
- [ ] Escrever testes básicos das rotas da API
- [ ] Escrever README completo com instruções de instalação e uso
- [ ] Criar build de distribuição com Electron Builder
- [ ] Publicar release v1.0.0 no GitHub
