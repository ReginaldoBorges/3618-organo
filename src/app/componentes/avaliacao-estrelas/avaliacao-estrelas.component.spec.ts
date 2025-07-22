import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe.only('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  // Configuração do TestBed antes de cada teste
  beforeEach(() => {
    // Configuração do TestBed para o componente AvaliacaoEstrelasComponent
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent], // Importa o componente diretamente
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent); // Cria uma instância do componente
    component = fixture.componentInstance; // Obtém a instância do componente
    component.readOnly = false; // Definir como falso para fins de teste
  });

  it('deveria criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deveria atribuir o valor da classificação quando o método writeValue for chamado', () => {
    const valorClassificacao = 3;
    component.writeValue(valorClassificacao);
    expect(component.classificacao).toBe(valorClassificacao);
  });
});
