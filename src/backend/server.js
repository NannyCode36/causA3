const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const seedDatabase = require('./config/seed');
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
