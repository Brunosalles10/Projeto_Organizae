const fs = require("fs").promises;
const path = require("path");

class DataServico {
  constructor() {
    this.dataPath = path.join(__dirname, "../../data/trilhas.json");
  }

  /**
    @returns {Promise<Array>} 
    
    **/

  async getTrilhas() {
    try {
      const arquivoPlayload = await fs.readFile(this.dataPath, "utf-8");
      return JSON.parse(arquivoPlayload);
    } catch (error) {
      console.error("Erro ao ler o arquivo de trilhas:", error);
      return [];
    }
  }

  async getTrilhaById(id) {
    const trilhas = await this.getTrilhas();
    return trilhas.find((t) => t.id === id);
  }

  async addTrilha(novaTrilha) {
    const trilhas = await this.getTrilhas();
    trilhas.push(novaTrilha);
    await this.saveTrilhas(trilhas);
    return novaTrilha;
  }

  async updateTrilha(id, trilhaAtualizada) {
    const trilhas = await this.getTrilhas();
    const index = trilhas.findIndex((t) => t.id === id);
    if (index === -1) return null;
    trilhas[index] = { ...trilhas[index], ...trilhaAtualizada };
    await this.saveTrilha(trilhas);
    return trilhas[index];
  }

  async deleteTrilha(id) {
    const trilhas = await this.getTrilhas();
    const novasTrilhas = trilhas.filter((t) => t.id !== id);
    await this.saveTrilha(novasTrilhas);
    return trilhas.length !== novasTrilhas.length;
  }

  async saveTrilha(trilhas) {
    try {
      const arquivoPlayload = JSON.stringify(trilhas, null, 2);
      await fs.writeFile(this.dataPath, arquivoPlayload, "utf-8");
      return true;
    } catch (error) {
      console.error("Erro ao escrever no arquivo de trilhas:", error);
      return false;
    }
  }
}

module.exports = new DataServico();
