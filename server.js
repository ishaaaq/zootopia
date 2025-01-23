const SECRET_KEY =
  "sk_test_51QkOYFDEuPKQynMzkb5Q6e2EO3kFzJM9j6Krg3PItsK0XYs4jXJYTxF3AolgXJTjPpvk6yT7UGZ3EKqcvY5Dz0WU00aM1Sg5iw";

const express = require("express");
const stripe = require("stripe")(SECRET_KEY);
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { amount } = req.body;
  console.log("amount", amount);
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-12-18.acacia" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51QkOYFDEuPKQynMzxjlRReQLf0sVwIFKKODnb0FGIKzgRGW3UQYFoE0qmKkleLoVPFbPz6RDvr7wqBPBObeOGJw400iuUOkUBA",
  });
});

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const WebSocket = require("ws");
// const http = require("http");

// // Create a simple HTTP server to integrate with WebSocket
// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.end("WebSocket server is running");
// });

// // Create a WebSocket server
// const wss = new WebSocket.Server({ server });

// let clients = new Map();

// // Handle connection
// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   // Assign a unique ID to each client
//   const clientId = Date.now();
//   clients.set(clientId, ws);

//   // Handle messages from the client
//   ws.on("message", (message) => {
//     try {
//       if (message) {
//         const data = JSON.parse(message);
//         console.log("Received:", data);

//         // Broadcast the message to all connected clients
//         console.log("clients", clients);
//         clients.forEach((client, id) => {
//           console.log(`Broadcasting to client ${id}`);
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(data));
//             console.log(`Message sent to client ${id}`);
//           } else {
//             console.log(
//               `Client ${id} is not open. ReadyState: ${client.readyState}`
//             );
//           }
//         });
//       } else {
//         console.error("Received empty message");
//       }
//     } catch (error) {
//       console.error("Error parsing message:", error.message);
//     }
//   });

//   // Handle disconnection
//   ws.on("close", () => {
//     console.log("Client disconnected");
//     clients.delete(clientId);
//   });
// });

// // Start the server
// const PORT = 8000;
// server.listen(PORT, () => {
//   console.log(`WebSocket server running on ws://localhost:${PORT}`);
// });
