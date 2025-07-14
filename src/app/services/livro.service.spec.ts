import { TestBed } from '@angular/core/testing'; // Importa TestBed para configurar o ambiente de testes
import { GeneroLiterario, Livro } from '../componentes/livro/livro'; // Importa as interfaces Livro e GeneroLiterario
import { livros } from '../mock-livros'; // Importa a lista de livros mockados
import { ErroGeneroLiterario, LivroService } from './livro.service'; // Importa a classe LivroService e o erro personalizado ErroGeneroLiterario

/**
 * Este arquivo contém os testes unitários para a classe LivroService.
 */
describe('LivroService', () => {
  let service: LivroService; // Variável para armazenar a instância de LivroService

  // Executado antes de cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura o TestBed para o ambiente de testes
    service = TestBed.inject(LivroService); // Injeta a instância do LivroService
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve adicionar um novo livro', () => {
    const novoLivro: Livro = {
      titulo: 'Novo Livro',
      autoria: 'Autor Desconhecido',
      imagem: 'https://example.com/imagem.jpg',
      genero: { id: 'romance', value: 'Romance' },
      dataLeitura: '2023-10-01',
      classificacao: 5,
    };

    // Adiciona o novo livro usando o serviço
    service.adicionarLivro(novoLivro);

    // Verifica se o livro foi adicionado, verificando se ele existe na lista de livros para o gênero especificado
    const livrosAtualizados = service.obterLivrosPorGenero('romance');
    expect(livrosAtualizados).toContain(novoLivro);
  });

  it('Deve retornar livros pelo gênero informado', () => {
    const livrosPorGenero = service.obterLivrosPorGenero('romance'); // Chama o método com um gênero
    const LivrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    ); // Filtra os livros esperados pelo gênero

    expect(livrosPorGenero).toEqual(LivrosEsperados); // Verifica se os livros retornados correspondem aos esperados
  });

  it('Deve inicializar os gêneros corretamente', () => {
    // Constante com a lista de gêneros esperados
    const generos: GeneroLiterario[] = [
      {
        id: 'romance',
        value: 'Romance',
      },
      {
        id: 'misterio',
        value: 'Mistério',
      },
      {
        id: 'fantasia',
        value: 'Fantasia',
      },
      {
        id: 'ficcao-cientifica',
        value: 'Ficção Científica',
      },
      {
        id: 'tecnicos',
        value: 'Técnicos',
      },
    ];

    const generosService = service.generos; // Obtém a lista de gêneros do serviço

    expect(generosService).toEqual(generos); // Verifica se os gêneros do serviço correspondem aos esperados
  });

  it('Deve gerar erro ao adicionar livro com gênero desconhecido', () => {
    let error: any;
    const novoLivro: Livro = {
      titulo: 'Livro Desconhecido',
      autoria: 'Autor Desconhecido',
      imagem: 'https://example.com/imagem.jpg',
      genero: { id: 'desconhecido', value: 'Desconhecido' }, // Gênero desconhecido
      dataLeitura: '2023-10-01',
      classificacao: 5,
    };

    expect(() => service.adicionarLivro(novoLivro)).toThrow(
      ErroGeneroLiterario
    ); // Verifica se o erro é lançado

    try {
      service.adicionarLivro(novoLivro);
    } catch (e) {
      error = e;
    }
    expect(error.message).toBe('Gênero literário desconhecido'); // Verifica se o erro é lançado com a mensagem correta
  });
});
