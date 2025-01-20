const WebSocket = require("ws");
const http = require("http");

// Create a simple HTTP server to integrate with WebSocket
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running");
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

let clients = new Map();

// Handle connection
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Assign a unique ID to each client
  const clientId = Date.now();
  clients.set(clientId, ws);

  // Handle messages from the client
  ws.on("message", (message) => {
    try {
      if (message) {
        const data = JSON.parse(message);
        console.log("Received:", data);

        // Broadcast the message to all connected clients
        console.log("clients", clients);
        clients.forEach((client, id) => {
          console.log(`Broadcasting to client ${id}`);
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
            console.log(`Message sent to client ${id}`);
          } else {
            console.log(
              `Client ${id} is not open. ReadyState: ${client.readyState}`
            );
          }
        });
      } else {
        console.error("Received empty message");
      }
    } catch (error) {
      console.error("Error parsing message:", error.message);
    }
  });

  // Handle disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(clientId);
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
