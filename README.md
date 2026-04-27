# causA3 🔍

> Análise de causa raiz integrada ao A3 — do problema ao plano de melhoria em um único fluxo.

---

## 📌 Sobre o Projeto

O **causA3** é uma aplicação desktop para times de qualidade e melhoria contínua que unifica duas metodologias poderosas em um único ambiente:

- **8D (Eight Disciplines)** — análise estruturada de causa raiz com as 8 disciplinas.
- **A3** — documento lean de gestão de problemas e planos de ação.

Quando os planos de ação da análise 8D indicam a necessidade de um projeto de melhoria, o causA3 gera automaticamente a abertura de um A3, aproveitando todas as informações já registradas na análise. O histórico de todas as análises e projetos é armazenado e visualizado em um **dashboard interativo**.

---

## ✨ Funcionalidades

- **Análise 8D guiada** — formulário estruturado nas 8 disciplinas com suporte ao preenchimento.
- **Integração automática com A3** — conversão dos planos de ação em projetos de melhoria A3.
- **Dashboard de acompanhamento** — visão geral de análises abertas, em andamento e encerradas.
- **Histórico completo** — controle de todas as análises e A3s gerados, com rastreabilidade.
- **Aplicação desktop** — roda localmente via Electron.js, sem necessidade de internet.
- **Armazenamento local** — dados persistidos em MongoDB local.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Interface | HTML, CSS, JavaScript |
| Desktop | Electron.js |
| Backend | Node.js + Express.js |
| Banco de dados | MongoDB |
| Comunicação HTTP | Axios |

---

## 🗂️ Estrutura do Projeto

```
causA3/
├── src/
│   ├── main/                  # Processo principal do Electron
│   │   └── main.js
│   ├── renderer/              # Interface do usuário
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── analise-8d/
│   │   │   └── a3/
│   │   ├── components/        # Componentes reutilizáveis
│   │   └── assets/            # Estilos e imagens
│   └── backend/               # Servidor Express
│       ├── routes/
│       ├── controllers/
│       ├── models/            # Modelos MongoDB (Mongoose)
│       └── server.js
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) instalado e em execução local

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/causA3.git

# Acesse a pasta
cd causA3

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

### Execução

```bash
# Inicia o backend e a aplicação Electron
npm start
```

---

## 📋 Metodologias

### 8D — Eight Disciplines

| Disciplina | Descrição |
|---|---|
| D1 | Formação do time |
| D2 | Descrição do problema |
| D3 | Ações de contenção |
| D4 | Identificação da causa raiz |
| D5 | Ações corretivas permanentes |
| D6 | Implementação e validação |
| D7 | Ações preventivas |
| D8 | Reconhecimento do time |

### A3

Gerado automaticamente a partir das informações do 8D quando os planos de ação indicam necessidade de um projeto de melhoria estruturado, seguindo o ciclo PDCA.

---

## 🗺️ Roadmap

Acompanhe o progresso do desenvolvimento na seção [To Do / Roadmap](./TODO.md) ou nas [Issues](https://github.com/seu-usuario/causA3/issues) do repositório.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

> Desenvolvido com foco em qualidade e melhoria contínua. 🏭
