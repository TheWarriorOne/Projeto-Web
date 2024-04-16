// Importe o pool do seu arquivo de configuração do banco de dados
const pool = require('pg');

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
