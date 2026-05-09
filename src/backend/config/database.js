const mongoose = require('mongoose');

// Conectar ao MongoDB
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/causa3';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🗄️  MongoDB conectado com sucesso');
    console.log(`📍 Database: ${mongoose.connection.name}`);
    console.log(
      `🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`,
    );
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    console.error(
      '💡 Certifique-se de que o MongoDB está instalado e rodando localmente',
    );
    console.error(
      '🔧 Para instalar MongoDB: https://www.mongodb.com/try/download/community',
    );

    // Não encerrar o processo, permitir que a aplicação continue sem banco
    console.log('⚠️  Aplicação continuará sem persistência de dados');
  }
};

// Eventos de conexão
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro na conexão Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose desconectado do MongoDB');
});

// Encerrar conexão graciosamente
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 Conexão MongoDB encerrada');
  process.exit(0);
});

module.exports = connectDB;
