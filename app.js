const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Porta do servidor

// Middleware para processar corpos de requisição JSON
app.use(express.json());

// Rotas da aplicação
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
