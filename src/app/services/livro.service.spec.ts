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
});
