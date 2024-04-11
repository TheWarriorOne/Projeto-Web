const { Client } = require('pg');

// Configurações de conexão
const client = new Client({
  user: 'Michael',
  host: 'localhost',
  database: 'E-co Gram',
  password: '102030',
  port: 5432, // porta padrão do PostgreSQL
});

// Função para conectar ao banco de dados e executar uma consulta
async function conectarEExecutarConsulta() {
  try {
    // Conecte-se ao banco de dados
    await client.connect();
    
    // Execute uma consulta SQL
    const resultado = await client.query('SELECT * FROM sua_tabela');
    console.log(resultado.rows); // Exibe os resultados da consulta
    
  } catch (error) {
    console.error('Erro ao conectar ou executar consulta:', error);
  } finally {
    // Certifique-se de fechar a conexão quando terminar
    await client.end();
  }
}

// Chamada da função para conectar e executar a consulta
conectarEExecutarConsulta();