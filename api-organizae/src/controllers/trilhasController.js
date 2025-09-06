const dataService = require("../services/dataService");
const TrilhasModel = require("../models/trilhasModel");

class TrilhasController {
  async listarTrilhas(req, res) {
    try {
      const trilhas = await dataService.getTrilhas();
      res.status(200).json({
        mensage: "Trilhas listadas com sucesso",
        data: trilhas,
        sucess: true,
      });
    } catch (error) {
      res.status(500).json({
        mensage: "Erro ao listar trilhas",
      });
    }
  }

  //busca por id
  async buscarTrilha(req, res) {
    try {
      const id = parseInt(req.params.id);
      const trilha = await dataService.getTrilhaById(id);

      if (!trilha) {
        return res.status(404).json({
          message: "Trilha não encontrada",
          success: false,
        });
      }

      res.status(200).json({
        message: "Trilha encontrada",
        data: trilha,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar trilha",
        error: error.message,
      });
    }
  }

  async criarTrilha(req, res) {
    try {
      const { nome, materia, professor, dataEntrega, status, linkTrilha } =
        req.body;

      const trilhasExistentes = await dataService.getTrilhas();
      const novoId =
        trilhasExistentes.length > 0
          ? trilhasExistentes[trilhasExistentes.length - 1].id + 1
          : 1;

      const novaTrilha = new TrilhasModel(
        novoId,
        nome,
        materia,
        professor,
        dataEntrega,
        status,
        linkTrilha
      );
      trilhasExistentes.push(novaTrilha);

      dataService.saveTrilha(trilhasExistentes);

      res.status(201).json({
        message: "Trilha criada com sucesso",
        data: novaTrilha,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar trilha",
        error: error.message,
      });
    }
  }

  async atualizarTrilha(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { nome, materia, professor, dataEntrega, status, LinkTrilha } =
        req.body;

      const trilhaAtualizada = await dataService.updateTrilha(id, {
        nome,
        materia,
        professor,
        dataEntrega,
        status,
        LinkTrilha,
      });

      if (!trilhaAtualizada) {
        return res.status(404).json({
          message: "Trilha não encontrada para atualização",
          success: false,
        });
      }
      res.status(200).json({
        message: "Trilha atualizada com sucesso",
        data: trilhaAtualizada,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar trilha",
        error: error.message,
      });
    }
  }

  async deletarTrilha(req, res) {
    try {
      const id = parseInt(req.params.id);
      const deletada = await dataService.deleteTrilha(id);

      if (!deletada) {
        return res.status(404).json({
          message: "Trilha não encontrada para exclusão",
          success: false,
        });
      }

      res.status(200).json({
        message: "Trilha deletada com sucesso",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao deletar trilha",
        error: error.message,
      });
    }
  }
}

module.exports = new TrilhasController();
