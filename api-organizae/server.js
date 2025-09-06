const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const trilhasRoutes = require("./src/routes/trilhasRoutes");

// Middleware para rotas de trilhas
app.use(express.json());

// Rotas de trilhas
app.use("/api", trilhasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
