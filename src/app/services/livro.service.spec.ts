import { Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { LivroService } from './livro.service';

/**
 * This file contains unit tests for the LivroService class.
 */
describe('LivroService', () => {
  let service: LivroService; // Variable to hold the instance of LivroService

  // Executed before each test
  beforeEach(() => {
    service = new LivroService(); // Create a new instance of LivroService before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new book', () => {
    const novoLivro: Livro = {
      titulo: 'Novo Livro',
      autoria: 'Autor Desconhecido',
      imagem: 'https://example.com/imagem.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2023-10-01',
      classificacao: 5,
    };

    // Add the new book using the service
    service.adicionarLivro(novoLivro);

    // Verify that the book was added by checking if it exists in the list of books for the specified genre
    const livrosAtualizados = service.obterLivrosPorGenero('romance');
    expect(livrosAtualizados).toContain(novoLivro);
  });

  it('should return books by genre informed', () => {
    const livrosPorGenero = service.obterLivrosPorGenero('romance'); // Call the method with a genre
    const LivrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    ); // Filter expected books by genre

    expect(livrosPorGenero).toEqual(LivrosEsperados); // Check if the returned books match the expected ones
  });
});
