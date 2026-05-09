const mongoose = require('mongoose');

const planoAcaoSchema = new mongoose.Schema({
  // Referência ao documento pai (8D ou A3)
  documentoPai: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'tipoDocumento',
  },
  tipoDocumento: {
    type: String,
    required: true,
    enum: ['Analise8D', 'ProjetoA3'],
  },

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
  categoria: {
    type: String,
    enum: ['contencao', 'corretiva', 'preventiva', 'melhoria'],
    required: true,
  },

  // Detalhes da ação
  responsavel: {
    type: String,
    required: true,
  },
  prazo: {
    type: Date,
    required: true,
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta', 'critica'],
    default: 'media',
  },

  // Recursos e custos
  recursosNecessarios: [String],
  custoEstimado: {
    type: Number,
    default: 0,
  },
  custoReal: Number,

  // Status e progresso
  status: {
    type: String,
    enum: ['pendente', 'em_andamento', 'concluida', 'cancelada', 'atrasada'],
    default: 'pendente',
  },
  progresso: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },

  // Datas
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  dataInicio: Date,
  dataConclusao: Date,
  dataAtualizacao: {
    type: Date,
    default: Date.now,
  },

  // Resultados e validação
  resultado: String,
  eficacia: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
  },
  validacao: {
    realizada: {
      type: Boolean,
      default: false,
    },
    metodo: String,
    resultado: String,
    data: Date,
    responsavel: String,
  },

  // Observações e anexos
  observacoes: String,
  anexos: [String], // URLs ou caminhos dos arquivos

  // Metadados
  criadoPor: String,
  versao: {
    type: Number,
    default: 1,
  },
});

// Middleware para atualizar data de modificação
planoAcaoSchema.pre('save', function (next) {
  this.dataAtualizacao = new Date();
  next();
});

// Índices
planoAcaoSchema.index({ documentoPai: 1, tipoDocumento: 1 });
planoAcaoSchema.index({ status: 1, prazo: 1 });
planoAcaoSchema.index({ responsavel: 1 });
planoAcaoSchema.index({ categoria: 1 });

module.exports = mongoose.model('PlanoAcao', planoAcaoSchema);
