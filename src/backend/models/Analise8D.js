const mongoose = require('mongoose');

const analise8DSchema = new mongoose.Schema({
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
    enum: ['rascunho', 'em_andamento', 'concluida', 'cancelada'],
    default: 'rascunho',
  },

  // D1 - Formação do Time
  d1: {
    membros: [
      {
        nome: String,
        funcao: String,
        responsabilidade: String,
      },
    ],
    dataReuniao: Date,
    observacoes: String,
  },

  // D2 - Descrição do Problema
  d2: {
    descricaoProblema: {
      type: String,
      required: true,
    },
    quandoOcorreu: Date,
    ondeOcorreu: String,
    quemIdentificou: String,
    impacto: {
      financeiro: Number,
      operacional: String,
      qualidade: String,
      outros: String,
    },
    anexos: [String], // URLs ou caminhos dos arquivos
  },

  // D3 - Ações de Contenção
  d3: {
    acoes: [
      {
        descricao: String,
        responsavel: String,
        prazo: Date,
        status: {
          type: String,
          enum: ['pendente', 'em_andamento', 'concluida'],
          default: 'pendente',
        },
        dataConclusao: Date,
        observacoes: String,
      },
    ],
    eficacia: {
      type: String,
      enum: ['baixa', 'media', 'alta'],
    },
  },

  // D4 - Identificação da Causa Raiz
  d4: {
    ferramentas: [
      {
        nome: String, // 5 Porquês, Ishikawa, etc.
        aplicacao: String,
        resultados: String,
      },
    ],
    causaRaiz: {
      type: String,
      required: true,
    },
    fatoresContribuintes: [String],
    evidencia: String,
  },

  // D5 - Ações Corretivas Permanentes
  d5: {
    acoes: [
      {
        descricao: String,
        responsavel: String,
        prazo: Date,
        recursosNecessarios: String,
        custoEstimado: Number,
        status: {
          type: String,
          enum: ['pendente', 'em_andamento', 'concluida', 'validada'],
          default: 'pendente',
        },
        dataConclusao: Date,
        observacoes: String,
      },
    ],
  },

  // D6 - Implementação e Validação
  d6: {
    planoImplementacao: String,
    cronograma: [
      {
        atividade: String,
        responsavel: String,
        prazo: Date,
        status: String,
      },
    ],
    testesValidacao: [
      {
        tipo: String,
        descricao: String,
        resultado: String,
        data: Date,
      },
    ],
    eficaciaImplementacao: {
      type: String,
      enum: ['baixa', 'media', 'alta'],
    },
  },

  // D7 - Ações Preventivas
  d7: {
    acoes: [
      {
        descricao: String,
        aplicacao: String, // Onde será aplicada
        responsavel: String,
        prazo: Date,
        status: String,
      },
    ],
    padronizacao: String, // Como será padronizada
  },

  // D8 - Reconhecimento do Time
  d8: {
    reconhecimentos: [
      {
        pessoa: String,
        contribuicao: String,
        reconhecimento: String,
      },
    ],
    liçõesAprendidas: [String],
    dataEncerramento: Date,
  },

  // Metadados
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

  // Relacionamentos
  projetoA3Gerado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjetoA3',
  },
});

// Middleware para atualizar data de modificação
analise8DSchema.pre('save', function (next) {
  this.dataAtualizacao = new Date();
  next();
});

// Índices para busca
analise8DSchema.index({ titulo: 'text', descricao: 'text' });
analise8DSchema.index({ status: 1, dataCriacao: -1 });
analise8DSchema.index({ responsavel: 1 });

module.exports = mongoose.model('Analise8D', analise8DSchema);
