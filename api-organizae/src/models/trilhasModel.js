class TrilhasModel {
  constructor(id, nome, materia, professor, dataEntrega, status, linkTrilha) {
    this.id = id;
    this.nome = nome;
    this.materia = materia;
    this.professor = professor;
    this.dataEntrega = dataEntrega;
    this.status = status;
    this.linkTrilha = linkTrilha;
  }
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      materia: this.materia,
      professor: this.professor,
      dataEntrega: this.dataEntrega,
      status: this.status,
      linkTrilha: this.linkTrilha,
    };
  }
}

module.exports = TrilhasModel;
