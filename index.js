const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Porta do servidor (usa a porta do ambiente ou 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API NodeGalaxy!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Rota de exemplo com dados
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'João Silva', email: 'joao@example.com' },
      { id: 2, name: 'Maria Santos', email: 'maria@example.com' },
      { id: 3, name: 'Pedro Costa', email: 'pedro@example.com' }
    ]
  });
});

// Rota POST de exemplo
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Nome e email são obrigatórios'
    });
  }

  res.status(201).json({
    message: 'Usuário criado com sucesso',
    user: {
      id: Math.floor(Math.random() * 1000),
      name,
      email
    }
  });
});

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
});
