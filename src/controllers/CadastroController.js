// Backend (Node.js)
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E-co_Gram',
  password: '102030',
  port: 5432,
});

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para cadastrar um produto
app.post('/cadastrar-produto', async (req, res) => {
    const { id, descricao, grupo, usuario, data } = req.body;

    try {
        // Executar a função para cadastrar o produto
        await cadastrarProduto(id, descricao, grupo, usuario, data);

        res.status(200).send('Produto cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).send('Erro ao cadastrar produto. Por favor, tente novamente mais tarde.');
    }
});

// Rota para listar todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        // Chamar a função para buscar os produtos cadastrados
        const produtos = await buscarProdutos();
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos. Por favor, tente novamente mais tarde.');
    }
});

// Função para cadastrar o produto no banco de dados
async function cadastrarProduto(id, descricao, grupo, usuario, data) {
    try {
        // Executar a consulta SQL para inserir o novo produto
        const query = `
            INSERT INTO produtos (id, descricao, grupo, usuario, data)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [id, descricao, grupo, usuario, data];
        await pool.query(query, values);
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        throw error;
    }
}

// Função para buscar os produtos cadastrados
async function buscarProdutos() {
    try {
        // Conectar ao banco de dados e executar a consulta SQL
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM produtos');
        client.release();

        // Retornar os resultados da consulta
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
