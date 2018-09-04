// IMPORTS /////////////////////////////////////////////////////////////////////

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////
/**
 * Ordenações possíveis do mongoose.
 */
class Ordenacao {
  /** 
   * @returns {int} Inteiro que indica que a ordenação do índice é ascendente.
   */
  static get ascendente() { return 1; }

  /**
   * @returns {int} Inteiro que indica que a ordenação do índice é descendente.
   */
  static get descendente() { return -1; }
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = Ordenacao;
