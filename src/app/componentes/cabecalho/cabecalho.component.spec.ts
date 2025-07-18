import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa TestBed para configurar o ambiente de testes
import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let component: CabecalhoComponent; // Variável para armazenar a instância do componente
  let fixture: ComponentFixture<CabecalhoComponent>; // Variável para armazenar o fixture do componente

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CabecalhoComponent],
    });
    fixture = TestBed.createComponent(CabecalhoComponent); // Cria o fixture do componente
    component = fixture.componentInstance; // Obtém a instância do componente a partir do fixture
  });

  it('Deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deveria definir as propriedades alt e src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });
});
