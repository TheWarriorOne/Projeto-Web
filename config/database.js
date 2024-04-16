const { Pool } = require('pg');

// Configurações de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E-co_Gram',
  password: '102030',
  port: 5432, // Porta padrão do PostgreSQL
});

// Função para buscar os produtos cadastrados
async function buscarProdutos() {
  try {
    // Conectando ao banco de dados
    const client = await pool.connect();

    // Executando a consulta SQL
    const result = await client.query('SELECT * FROM produtos');

    // Liberando a conexão com o banco de dados
    client.release();

    // Retornando os resultados da consulta
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    throw err;
  }
}

// Chamando a função para buscar os produtos e lidando com os resultados
buscarProdutos()
  .then(produtos => {
    console.log('Produtos encontrados:', produtos);
    // Aqui você pode fazer o que quiser com os produtos, como exibí-los na tela
  })
  .catch(err => {
    // Lidando com erros, se houver
    console.error('Erro:', err);
  });
