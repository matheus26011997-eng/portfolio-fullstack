// ============================================
// API PROFISSIONAL - PORTFÓLIO FULL STACK
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuração
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// BANCO DE DADOS SIMULADO (MAS PROFISSIONAL)
// ============================================
let projetos = [
    {
        id: 1,
        titulo: "Sistema de Gestão Empresarial",
        descricao: "ERP completo para pequenas empresas com módulos de vendas, estoque e financeiro",
        tecnologias: ["React", "Node.js", "MongoDB"],
        imagem: "https://via.placeholder.com/300x200",
        link: "https://github.com/seuuser/erp-system",
        destaque: true,
        data: "2024-01-15"
    },
    {
        id: 2,
        titulo: "E-commerce TechStore",
        descricao: "Plataforma de vendas online com carrinho, pagamentos e painel admin",
        tecnologias: ["Next.js", "Express", "PostgreSQL"],
        imagem: "https://via.placeholder.com/300x200",
        link: "https://github.com/seuuser/ecommerce",
        destaque: true,
        data: "2024-02-20"
    },
    {
        id: 3,
        titulo: "App de Delivery",
        descricao: "Aplicativo completo para delivery com geolocalização e chat em tempo real",
        tecnologias: ["React Native", "Socket.io", "Redis"],
        imagem: "https://via.placeholder.com/300x200",
        link: "https://github.com/seuuser/delivery-app",
        destaque: false,
        data: "2024-03-10"
    }
];

let mensagens = []; // Para formulário de contato

// ============================================
// ROTAS DA API
// ============================================

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        mensagem: "🚀 API do Portfólio Profissional",
        autor: "Seu Nome",
        versao: "1.0.0"
    });
});

// ROTAS DE PROJETOS
app.get('/api/projetos', (req, res) => {
    // Com filtro opcional de destaque
    if (req.query.destaque === 'true') {
        const destaques = projetos.filter(p => p.destaque);
        return res.json(destaques);
    }
    res.json(projetos);
});

app.get('/api/projetos/:id', (req, res) => {
    const projeto = projetos.find(p => p.id === parseInt(req.params.id));
    if (!projeto) {
        return res.status(404).json({ erro: "Projeto não encontrado" });
    }
    res.json(projeto);
});

// ROTAS DE CONTATO
app.post('/api/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // Validação básica
    if (!nome || !email || !mensagem) {
        return res.status(400).json({ 
            erro: "Todos os campos são obrigatórios" 
        });
    }
    
    // Salvar mensagem
    const novaMensagem = {
        id: mensagens.length + 1,
        nome,
        email,
        mensagem,
        data: new Date().toISOString(),
        lida: false
    };
    
    mensagens.push(novaMensagem);
    
    res.status(201).json({ 
        sucesso: true,
        mensagem: "Mensagem enviada com sucesso! Entrarei em contato em breve."
    });
});

// ROTA DE ESTATÍSTICAS
app.get('/api/stats', (req, res) => {
    res.json({
        totalProjetos: projetos.length,
        projetosDestaque: projetos.filter(p => p.destaque).length,
        tecnologiasUsadas: [...new Set(projetos.flatMap(p => p.tecnologias))].length,
        totalMensagens: mensagens.length
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════╗
    ║   🚀 SERVIDOR RODANDO!             ║
    ║   📡 Porta: ${PORT}                    ║
    ║   🌐 http://localhost:${PORT}        ║
    ║   📚 API: http://localhost:${PORT}/api║
    ╚════════════════════════════════════╝
    `);
});