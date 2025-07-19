const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

console.log('WebSocket server starting on port 3000...');

// Store connected clients
const clients = new Map();

wss.on('connection', function connection(ws) {
  console.log('New client connected');
  
  let clientId = null;
  let clientName = null;
  let userAgent = null;

  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      switch (data.type) {
        case 'new':
          // New client joining
          clientId = data.data.id;
          clientName = data.data.name;
          userAgent = data.data.user_agent;
          
          clients.set(clientId, {
            ws: ws,
            name: clientName,
            userAgent: userAgent
          });
          
          // Send list of peers to all clients
          broadcastPeers();
          break;
          
        case 'offer':
        case 'answer':
        case 'candidate':
        case 'bye':
          // Forward signaling messages to target peer
          const targetId = data.data.to;
          const targetClient = clients.get(targetId);
          if (targetClient) {
            targetClient.ws.send(JSON.stringify(data));
          }
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', function close() {
    console.log('Client disconnected:', clientId);
    if (clientId) {
      clients.delete(clientId);
      broadcastPeers();
    }
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });
});

function broadcastPeers() {
  const peers = Array.from(clients.values()).map(client => ({
    id: getClientIdByWs(client.ws),
    name: client.name,
    user_agent: client.userAgent
  }));
  
  const message = {
    type: 'peers',
    data: peers
  };
  
  clients.forEach((client, id) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(message));
    }
  });
}

function getClientIdByWs(ws) {
  for (const [id, client] of clients.entries()) {
    if (client.ws === ws) {
      return id;
    }
  }
  return null;
}

console.log('WebSocket server is running on ws://localhost:3000');
console.log('Make sure your Flutter app is configured to connect to your computer\'s IP address'); 