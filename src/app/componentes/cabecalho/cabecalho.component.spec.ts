import { TestBed } from '@angular/core/testing'; // Importa TestBed para configurar o ambiente de testes
import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let component: CabecalhoComponent; // Variável para armazenar a instância do componente

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CabecalhoComponent],
    });
    component = new CabecalhoComponent(); // Cria uma nova instância do componente antes de cada teste
  });

  it('Deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
