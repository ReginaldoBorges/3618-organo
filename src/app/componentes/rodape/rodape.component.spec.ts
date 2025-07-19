import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodapeComponent } from './rodape.component';

describe('RodapeComponent', () => {
  let component: RodapeComponent; // Variável para armazenar a instância do componente
  let fixture: ComponentFixture<RodapeComponent>; // Variável para armazenar o fixture do componente

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RodapeComponent],
    });
    fixture = TestBed.createComponent(RodapeComponent); // Cria o fixture do componente
    component = fixture.componentInstance; // Obtém a instância do componente a partir do fixture
  });

  it('Deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deveria definir as propriedades alt e src', () => {
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('Deveria renderizar o conteúdo baseado nas propriedades alt e src', () => {
    component.src = 'https://example.com/test-image.jpg';
    component.alt = 'Imagem teste';

    expect(component).toMatchSnapshot(); // Verifica se o componente renderiza corretamente com as propriedades definidas
  });
});
