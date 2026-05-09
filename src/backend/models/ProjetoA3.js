const mongoose = require('mongoose');

const projetoA3Schema = new mongoose.Schema({
  // Informações básicas
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  responsavel: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      'rascunho',
      'planejamento',
      'execucao',
      'avaliacao',
      'padronizacao',
      'concluido',
      'cancelado',
    ],
    default: 'rascunho',
  },

  // Origem - referência à análise 8D que gerou este A3
  analise8DOrigem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analise8D',
    required: true,
  },

  // 1. Contexto (Tema/Background)
  contexto: {
    problema: String,
    impactoAtual: String,
    objetivoMelhoria: String,
    escopo: String,
    stakeholders: [
      {
        nome: String,
        interesse: String,
        influencia: String,
      },
    ],
  },

  // 2. Estado Atual (Current State)
  estadoAtual: {
    descricaoSituacao: String,
    metricasAtuais: [
      {
        nome: String,
        valor: Number,
        unidade: String,
        data: Date,
      },
    ],
    pontosFortes: [String],
    pontosFracos: [String],
    analises: [String], // Referências a análises realizadas
  },

  // 3. Meta/Objetivo (Target State)
  meta: {
    descricao: String,
    metricasAlvo: [
      {
        nome: String,
        valorAlvo: Number,
        unidade: String,
        prazo: Date,
      },
    ],
    criteriosSucesso: [String],
    beneficiosEsperados: {
      financeiro: Number,
      operacional: String,
      qualidade: String,
      outros: String,
    },
  },

  // 4. Análise (Analysis)
  analise: {
    causaRaiz: String, // Herdadada da 8D
    fatoresContribuintes: [String],
    oportunidadesMelhoria: [
      {
        oportunidade: String,
        impacto: String,
        prioridade: {
          type: String,
          enum: ['baixa', 'media', 'alta'],
        },
      },
    ],
    ferramentasAnalise: [String],
  },

  // 5. Plano de Ação (Action Plan)
  planoAcao: [
    {
      atividade: {
        type: String,
        required: true,
      },
      descricao: String,
      responsavel: {
        type: String,
        required: true,
      },
      prazo: {
        type: Date,
        required: true,
      },
      recursos: String,
      custoEstimado: Number,
      status: {
        type: String,
        enum: ['pendente', 'em_andamento', 'concluida', 'atrasada'],
        default: 'pendente',
      },
      progresso: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      dataInicio: Date,
      dataConclusao: Date,
      observacoes: String,
      dependencias: [String], // IDs de outras atividades
    },
  ],

  // 6. Resultado/Execução (Results)
  resultado: {
    metricasAlcancadas: [
      {
        nome: String,
        valorAlcancado: Number,
        valorAlvo: Number,
        unidade: String,
        data: Date,
        status: {
          type: String,
          enum: ['nao_alcancado', 'parcial', 'alcancado', 'superado'],
        },
      },
    ],
    liçõesAprendidas: [String],
    problemasEncontrados: [
      {
        problema: String,
        impacto: String,
        solucao: String,
      },
    ],
    eficaciaGeral: {
      type: String,
      enum: ['baixa', 'media', 'alta', 'muito_alta'],
    },
  },

  // 7. Padronização (Standardization)
  padronizacao: {
    procedimentosPadronizados: [
      {
        nome: String,
        descricao: String,
        documento: String, // URL ou caminho do documento
      },
    ],
    treinamentos: [
      {
        tema: String,
        publico: String,
        data: Date,
        instrutor: String,
      },
    ],
    controles: [
      {
        controle: String,
        frequencia: String,
        responsavel: String,
      },
    ],
    documentacao: [String], // URLs dos documentos criados
  },

  // Controle de versões
  versao: {
    type: Number,
    default: 1,
  },
  historicoVersoes: [
    {
      versao: Number,
      data: Date,
      alteradoPor: String,
      alteracoes: String,
    },
  ],

  // Datas importantes
  dataInicio: Date,
  dataConclusaoPlanejada: Date,
  dataConclusaoReal: Date,

  // Metadados
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta', 'critica'],
    default: 'media',
  },
  custoTotal: Number,
  orcamento: Number,
});

// Middleware para atualizar data de modificação
projetoA3Schema.pre('save', function (next) {
  this.dataAtualizacao = new Date();
  next();
});

// Índices para busca
projetoA3Schema.index({ titulo: 'text', descricao: 'text' });
projetoA3Schema.index({ status: 1, dataCriacao: -1 });
projetoA3Schema.index({ responsavel: 1 });
projetoA3Schema.index({ analise8DOrigem: 1 });

module.exports = mongoose.model('ProjetoA3', projetoA3Schema);
