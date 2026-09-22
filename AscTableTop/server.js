const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Define a pasta "public" como a pasta onde ficam os sites (HTML, CSS, Imagens, Modelos 3D)
app.use(express.static(path.join(__dirname, 'public')));

// Gerenciador de conexões do Socket.IO
io.on('connection', (socket) => {
    console.log(`[+] Usuário conectou: ${socket.id}`);

    // Recebe a ordem de mover do mestre e repassa para os jogadores
    socket.on('camera_update', (dados) => {
    io.emit('camera_moved', dados);
});

    socket.on('token_flip', (dados) => {
    io.emit('token_flip', dados);  // ← CORRETO
});

    socket.on('mover_token', (dados) => {
        io.emit('token_movido', dados);
    });

    socket.on('disconnect', () => {
        console.log(`[-] Usuário desconectou: ${socket.id}`);
    });
});

// Liga o servidor na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`⛩️  AscTableTop - Jujutsu Kaisen VTT rodando!`);
    console.log(`===========================================`);
    console.log(`=> Tela do Jogador: http://localhost:${PORT}`);
    console.log(`=> Painel do Mestre: http://localhost:${PORT}/mestre.html`);
    console.log(`===========================================\n`);
});
