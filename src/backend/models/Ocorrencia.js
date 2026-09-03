const mongoose = require('mongoose');

const planoAcaoSchema = new mongoose.Schema({
  acao: { type: String, required: true, trim: true },
  responsavel: { type: String, trim: true },
  prazo: Date,
  status: { type: String, enum: ['pendente', 'em_andamento', 'concluida'], default: 'pendente' },
  observacao: String,
}, { _id: true });

const ocorrenciaSchema = new mongoose.Schema({
  numero: { type: String, unique: true, index: true },
  cliente: { type: String, required: true, trim: true, index: true },
  contrato: { type: String, trim: true, index: true },
  contato: String,
  email: String,
  endereco: String,
  cidade: { type: String, trim: true, index: true },
  estado: { type: String, trim: true, index: true },
  localidade: String,
  descricao: { type: String, required: true, trim: true },
  area: { type: String, default: 'Logística' },
  prioridade: { type: String, enum: ['Baixa', 'Média', 'Alta', 'Crítica'], default: 'Média' },
  status: { type: String, enum: ['Aberta', 'Em análise', 'Em tratamento', 'Concluída'], default: 'Aberta' },
  responsavel: String,
  planoAcao: [planoAcaoSchema],
}, { timestamps: true });

ocorrenciaSchema.index({ cliente: 'text', contrato: 'text', numero: 'text', descricao: 'text', cidade: 'text' });

ocorrenciaSchema.pre('save', async function assignNumber(next) {
  if (!this.numero) {
    const sequence = await this.constructor.countDocuments();
    this.numero = `OC-${String(sequence + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
