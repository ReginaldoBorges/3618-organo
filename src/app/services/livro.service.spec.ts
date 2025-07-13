import { Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { LivroService } from './livro.service';

/**
 * This file contains unit tests for the LivroService class.
 */
describe('LivroService', () => {
  let service: LivroService; // Variable to hold the instance of LivroService

  it('should be created', () => {
    service = new LivroService(); // Create an instance of LivroService
    expect(service).toBeTruthy();
  });

  it('should return books by genre informed', () => {
    service = new LivroService(); // Create an instance of LivroService
    const livrosPorGenero = service.obterLivrosPorGenero('romance'); // Call the method with a genre
    const LivrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    ); // Filter expected books by genre

    expect(livrosPorGenero).toEqual(LivrosEsperados); // Check if the returned books match the expected ones
  });

  it('should add a new book', () => {
    service = new LivroService(); // Create an instance of LivroService
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
});
