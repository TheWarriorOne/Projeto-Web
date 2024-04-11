const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar corpos de requisição JSON
app.use(express.json());

// Rotas da aplicação para autenticação
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

// Rotas da aplicação para grupos
const groupRoutes = require('./src/routes/groupRoutes');
app.use('/groups', groupRoutes);

// Rotas da aplicação para objetos
const objectRoutes = require('./src/routes/objectRoutes');
app.use('/objects', objectRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
