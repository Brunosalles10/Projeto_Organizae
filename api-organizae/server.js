import cors from "cors";
import express from "express";
import trilhasRoutes from "./src/routes/trilhasRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para rotas de trilhas
app.use(express.json());
app.use(cors({ origin: "*" }));

// Rotas de trilhas
app.use("/api", trilhasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
