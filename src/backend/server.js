const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const seedDatabase = require('./config/seed');
const Ocorrencia = require('./models/Ocorrencia');
const Historico = require('./models/Historico');
const Analise8D = require('./models/Analise8D');
const ProjetoA3 = require('./models/ProjetoA3');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB e executar seed se necessário
connectDB().then(async () => {
  // Executar seed apenas em desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    await seedDatabase();
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  }
  next();
};

const searchPattern = (value) => new RegExp(
  String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  'i',
);

const saveHistory = (document, type, description, alteration) => Historico.create({
  documentoId: document._id,
  tipoDocumento: type,
  versao: document.__v || 1,
  alteradoPor: 'sistema',
  tipoAlteracao: alteration,
  descricao: description,
  snapshot: document.toObject(),
  automatico: true,
});

const registerCrudRoutes = (route, Model, type, requiredFields) => {
  app.get(`/api/${route}`, requireDatabase, async (req, res, next) => {
    try {
      const term = String(req.query.q || '').trim();
      const filter = term ? { $or: requiredFields.map(field => ({ [field]: searchPattern(term) })) } : {};
      res.json(await Model.find(filter).sort({ dataAtualizacao: -1, createdAt: -1 }).limit(200));
    } catch (error) { next(error); }
  });
  app.post(`/api/${route}`, requireDatabase, async (req, res, next) => {
    try {
      const document = await Model.create(req.body);
      await saveHistory(document, type, `${type} criada`, 'criacao');
      res.status(201).json(document);
    } catch (error) { next(error); }
  });
};

registerCrudRoutes('analises-8d', Analise8D, 'Analise8D', ['titulo', 'descricao', 'responsavel']);
registerCrudRoutes('projetos-a3', ProjetoA3, 'ProjetoA3', ['titulo', 'descricao', 'responsavel']);

app.get('/api/historico/:tipo/:id', requireDatabase, async (req, res, next) => {
  try {
    const history = await Historico.find({ documentoId: req.params.id, tipoDocumento: req.params.tipo }).sort({ dataAlteracao: -1 });
    res.json(history);
  } catch (error) { next(error); }
});

app.get('/api/ocorrencias', requireDatabase, async (req, res, next) => {
  try {
    const termo = String(req.query.q || '').trim();
    const filtro = termo
      ? { $or: [
          { numero: searchPattern(termo) },
          { contrato: searchPattern(termo) },
          { cliente: searchPattern(termo) },
          { cidade: searchPattern(termo) },
          { descricao: searchPattern(termo) },
        ] }
      : {};
    res.json(await Ocorrencia.find(filtro).sort({ createdAt: -1 }).limit(200));
  } catch (error) { next(error); }
});

app.post('/api/ocorrencias', requireDatabase, async (req, res, next) => {
  try {
    const occurrence = await Ocorrencia.create(req.body);
    await saveHistory(occurrence, 'Ocorrencia', 'Ocorrência criada', 'criacao');
    res.status(201).json(occurrence);
  } catch (error) { next(error); }
});

app.get('/api/ocorrencias/:id', requireDatabase, async (req, res, next) => {
  try {
    const occurrence = await Ocorrencia.findById(req.params.id);
    if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });
    res.json(occurrence);
  } catch (error) { next(error); }
});

app.patch('/api/ocorrencias/:id', requireDatabase, async (req, res, next) => {
  try {
    const occurrence = await Ocorrencia.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });
    await saveHistory(occurrence, 'Ocorrencia', 'Ocorrência atualizada', 'edicao');
    res.json(occurrence);
  } catch (error) { next(error); }
});

// Rotas de teste
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend causA3 está funcionando',
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado',
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    port: PORT,
    databaseUrl: process.env.MONGODB_URI || 'Não configurado',
    databaseStatus:
      mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado',
  });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method,
  });
});

// Tratamento de erros genéricos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend causA3 rodando em http://localhost:${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = server;
