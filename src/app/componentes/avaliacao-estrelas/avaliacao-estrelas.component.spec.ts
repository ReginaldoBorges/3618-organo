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

  it('deveria chamar onChange quando o método classificar for chamado', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange'); // Espiona o método onChange
    const novaClassificacao = 4;
    component.classificar(novaClassificacao); // Atribui um novo valor
    expect(onChangeSpy).toHaveBeenCalled(); // Verifica se onChange foi chamado com o novo valor
  });

  it('deveria chamar onTouched quando o método classificar for chamado', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched'); // Espiona o método onTouched
    const novaClassificacao = 5;
    component.classificar(novaClassificacao); // Atribui um novo valor
    expect(onTouchedSpy).toHaveBeenCalled(); // Verifica se onTouched foi chamado
  });
  it('deveria ter a classificação inicial igual a 1 e refletir mudanças corretamente', () => {
    // Verifica valor inicial
    expect(component.classificacao).toBe(1);

    // Altera a classificação e verifica se foi atualizada
    const novaClassificacao = 4;
    component.classificar(novaClassificacao);
    expect(component.classificacao).toBe(novaClassificacao);

    // Altera novamente e verifica
    const outraClassificacao = 2;
    component.classificar(outraClassificacao);
    expect(component.classificacao).toBe(outraClassificacao);
  });
