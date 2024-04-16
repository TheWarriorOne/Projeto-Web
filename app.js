const express = require('express');
const server = express();
const app = express();
server.use (express.json());
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
const pool = require('./src/controller/CadastroController');

async function cadastrarProduto(id, descricao, grupo, usuario, data) {
    try {
        // Executar a consulta SQL para inserir o novo produto
        const query = `
            INSERT INTO produtos (id, descricao, grupo, usuario, data)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [id, descricao, grupo, usuario, data];
        const result = await pool.query(query, values);

        // Retornar o resultado da inserção
        return result;
    } catch (error) {
        // Lidar com erros, se houver
        console.error('Erro ao cadastrar produto:', error);
        throw error;
    }
}

module.exports = { cadastrarProduto };

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
