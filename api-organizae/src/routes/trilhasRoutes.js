const express = require("express");
const router = express.Router();
const trilhasController = require("../controllers/trilhasController");

router.get("/trilhas", trilhasController.listarTrilhas);
router.get("/trilhas/:id", trilhasController.buscarTrilha);
router.post("/trilhas", trilhasController.criarTrilha);
router.put("/trilhas/:id", trilhasController.atualizarTrilha);
router.delete("/trilhas/:id", trilhasController.deletarTrilha);

module.exports = router;
