import express from "express";
import trilhasController from "../controllers/trilhasController.js";

const router = express.Router();

router.get("/trilhas", trilhasController.listarTrilhas);
router.get("/trilhas/:id", trilhasController.buscarTrilha);
router.post("/trilhas", trilhasController.criarTrilha);
router.put("/trilhas/:id", trilhasController.atualizarTrilha);
router.delete("/trilhas/:id", trilhasController.deletarTrilha);

export default router;
