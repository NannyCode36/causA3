// causA3 — Script de criação automática de Issues no GitHub
// --------------------------------------------------------
// Como usar:
//   1. Instale a dependência:  npm install @octokit/rest
//   2. Gere um token em:       https://github.com/settings/tokens
//      (marque a permissão: repo)
//   3. Preencha as variáveis abaixo com seus dados
//   4. Execute:                node create-issues.js

const { Octokit } = require("@octokit/rest");

// ⚠️ PREENCHA AQUI
const GITHUB_TOKEN = "seu_token_aqui";
const OWNER = "seu_usuario_github";
const REPO = "causA3";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Labels que serão criadas no repositório
const labels = [
  { name: "fase-1: estrutura base",   color: "0075ca", description: "Configuração e estrutura base do projeto" },
  { name: "fase-2: banco de dados",   color: "2ea44f", description: "Modelos e configuração do MongoDB" },
  { name: "fase-3: api rest",         color: "8250df", description: "Rotas e controllers do backend" },
  { name: "fase-4: interface 8d",     color: "e4a400", description: "Formulário guiado das 8 disciplinas" },
  { name: "fase-5: interface a3",     color: "d93f0b", description: "Tela e formulário do projeto A3" },
  { name: "fase-6: dashboard",        color: "0e8a16", description: "Dashboard e histórico de análises" },
  { name: "fase-7: entrega",          color: "b60205", description: "Polimento, testes e build final" },
  { name: "backend",                  color: "c5def5", description: "Tarefas de backend" },
  { name: "frontend",                 color: "fef2c0", description: "Tarefas de frontend/interface" },
  { name: "banco de dados",           color: "bfd4f2", description: "Tarefas de banco de dados" },
  { name: "infra",                    color: "f9d0c4", description: "Infraestrutura e configuração" },
];

// Issues organizadas por fase
const issues = [
  // FASE 1
  { title: "Inicializar repositório no GitHub",                                          labels: ["fase-1: estrutura base", "infra"] },
  { title: "Configurar projeto Node.js com package.json",                                labels: ["fase-1: estrutura base", "infra"] },
  { title: "Instalar e configurar Electron.js",                                          labels: ["fase-1: estrutura base", "infra"] },
  { title: "Configurar estrutura de pastas do projeto (main, renderer, backend)",         labels: ["fase-1: estrutura base", "infra"] },
  { title: "Configurar Express.js como servidor backend local",                          labels: ["fase-1: estrutura base", "backend"] },
  { title: "Conectar Express ao processo Electron via IPC ou HTTP local",                labels: ["fase-1: estrutura base", "backend"] },
  { title: "Criar .env.example com variáveis necessárias",                               labels: ["fase-1: estrutura base", "infra"] },

  // FASE 2
  { title: "Instalar e configurar MongoDB local com Mongoose",                           labels: ["fase-2: banco de dados", "banco de dados"] },
  { title: "Criar modelo de dados para Análise 8D (8 disciplinas)",                      labels: ["fase-2: banco de dados", "banco de dados"] },
  { title: "Criar modelo de dados para projeto A3 (PDCA)",                               labels: ["fase-2: banco de dados", "banco de dados"] },
  { title: "Criar modelo de dados para Planos de Ação",                                  labels: ["fase-2: banco de dados", "banco de dados"] },
  { title: "Criar modelo de dados para Histórico e controle de versões",                 labels: ["fase-2: banco de dados", "banco de dados"] },
  { title: "Criar seed de dados para testes iniciais",                                   labels: ["fase-2: banco de dados", "banco de dados"] },

  // FASE 3
  { title: "Criar rotas CRUD para análise 8D",                                           labels: ["fase-3: api rest", "backend"] },
  { title: "Criar rotas CRUD para projeto A3",                                           labels: ["fase-3: api rest", "backend"] },
  { title: "Criar rota de conversão 8D → A3 (integração entre metodologias)",            labels: ["fase-3: api rest", "backend"] },
  { title: "Criar rota de listagem de histórico com filtros",                            labels: ["fase-3: api rest", "backend"] },
  { title: "Criar rota para dados do dashboard (métricas e KPIs)",                      labels: ["fase-3: api rest", "backend"] },
  { title: "Configurar Axios no renderer para consumir a API",                           labels: ["fase-3: api rest", "frontend"] },
  { title: "Tratar erros e validações nas rotas",                                        labels: ["fase-3: api rest", "backend"] },

  // FASE 4
  { title: "Criar layout base da aplicação (sidebar + área de conteúdo)",               labels: ["fase-4: interface 8d", "frontend"] },
  { title: "Criar página inicial / listagem de análises",                                labels: ["fase-4: interface 8d", "frontend"] },
  { title: "Criar formulário guiado passo a passo — D1 a D8",                           labels: ["fase-4: interface 8d", "frontend"] },
  { title: "Implementar validação de campos obrigatórios por disciplina",               labels: ["fase-4: interface 8d", "frontend"] },
  { title: "Implementar salvamento automático de rascunho",                             labels: ["fase-4: interface 8d", "frontend"] },
  { title: "Criar tela de visualização/impressão da análise 8D completa",               labels: ["fase-4: interface 8d", "frontend"] },

  // FASE 5
  { title: "Criar tela de abertura de A3 a partir de uma análise 8D",                  labels: ["fase-5: interface a3", "frontend"] },
  { title: "Pré-popular campos do A3 com dados vindos do 8D",                           labels: ["fase-5: interface a3", "frontend"] },
  { title: "Criar formulário A3: contexto, estado atual, meta, análise, plano, resultado, padronização", labels: ["fase-5: interface a3", "frontend"] },
  { title: "Criar visualização do A3 no formato folha única (layout A3)",               labels: ["fase-5: interface a3", "frontend"] },
  { title: "Permitir exportação do A3 em PDF",                                          labels: ["fase-5: interface a3", "frontend"] },

  // FASE 6
  { title: "Criar tela de dashboard com visão geral",                                   labels: ["fase-6: dashboard", "frontend"] },
  { title: "Implementar cards de métricas (análises abertas, em andamento, encerradas)", labels: ["fase-6: dashboard", "frontend"] },
  { title: "Criar gráfico de análises por período",                                     labels: ["fase-6: dashboard", "frontend"] },
  { title: "Criar lista de histórico com filtros (status, data, responsável)",          labels: ["fase-6: dashboard", "frontend"] },
  { title: "Implementar rastreabilidade: 8D → A3 → resultado",                          labels: ["fase-6: dashboard", "frontend"] },
  { title: "Criar tela de detalhes do histórico de uma análise",                        labels: ["fase-6: dashboard", "frontend"] },

  // FASE 7
  { title: "Revisar responsividade e consistência visual da interface",                 labels: ["fase-7: entrega", "frontend"] },
  { title: "Escrever testes básicos das rotas da API",                                  labels: ["fase-7: entrega", "backend"] },
  { title: "Escrever README completo com instruções de instalação e uso",               labels: ["fase-7: entrega", "infra"] },
  { title: "Criar build de distribuição com Electron Builder",                          labels: ["fase-7: entrega", "infra"] },
  { title: "Publicar release v1.0.0 no GitHub",                                        labels: ["fase-7: entrega", "infra"] },
];

// Cria uma label (ignora se já existir)
async function createLabel(label) {
  try {
    await octokit.issues.createLabel({ owner: OWNER, repo: REPO, ...label });
    console.log(`✅ Label criada: ${label.name}`);
  } catch (err) {
    if (err.status === 422) {
      console.log(`⚠️  Label já existe: ${label.name}`);
    } else {
      console.error(`❌ Erro ao criar label "${label.name}":`, err.message);
    }
  }
}

// Cria uma issue
async function createIssue(issue) {
  try {
    const res = await octokit.issues.create({
      owner: OWNER,
      repo: REPO,
      title: issue.title,
      labels: issue.labels,
    });
    console.log(`✅ Issue criada: #${res.data.number} — ${issue.title}`);
  } catch (err) {
    console.error(`❌ Erro ao criar issue "${issue.title}":`, err.message);
  }
}

// Execução principal
async function main() {
  console.log("\n🚀 causA3 — criando labels e issues no GitHub...\n");

  console.log("📌 Criando labels...");
  for (const label of labels) {
    await createLabel(label);
  }

  console.log("\n📋 Criando issues...");
  for (const issue of issues) {
    await createIssue(issue);
    // Pausa entre requisições para evitar rate limit
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n✅ Concluído! Acesse suas issues em:");
  console.log(`   https://github.com/${OWNER}/${REPO}/issues\n`);
}

main();
