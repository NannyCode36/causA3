const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  // Referência ao documento que foi alterado
  documentoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tipoDocumento: {
    type: String,
    required: true,
    enum: ['Analise8D', 'ProjetoA3', 'PlanoAcao', 'Ocorrencia'],
  },

  // Informações da alteração
  versao: {
    type: Number,
    required: true,
  },
  dataAlteracao: {
    type: Date,
    default: Date.now,
  },
  alteradoPor: {
    type: String,
    required: true,
  },

  // Tipo de alteração
  tipoAlteracao: {
    type: String,
    enum: ['criacao', 'edicao', 'status_alterado', 'exclusao', 'restauracao'],
    required: true,
  },

  // Descrição das mudanças
  descricao: {
    type: String,
    required: true,
  },
  camposAlterados: [
    {
      campo: String,
      valorAnterior: mongoose.Schema.Types.Mixed,
      valorNovo: mongoose.Schema.Types.Mixed,
    },
  ],

  // Contexto adicional
  contexto: {
    ip: String,
    userAgent: String,
    sessao: String,
  },

  // Snapshot do documento (opcional, para auditoria completa)
  snapshot: mongoose.Schema.Types.Mixed,

  // Metadados
  automatico: {
    type: Boolean,
    default: false, // true para alterações automáticas do sistema
  },
  comentario: String, // Comentário opcional do usuário
});

// Índices para busca eficiente
historicoSchema.index({ documentoId: 1, tipoDocumento: 1, dataAlteracao: -1 });
historicoSchema.index({ alteradoPor: 1, dataAlteracao: -1 });
historicoSchema.index({ tipoAlteracao: 1, dataAlteracao: -1 });

module.exports = mongoose.model('Historico', historicoSchema);
