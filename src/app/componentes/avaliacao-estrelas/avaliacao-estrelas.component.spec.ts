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

  it('não deveria atualizar a classificação quando a propriedade readOnly for true', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange'); // Espiona o método onChange
    const novaClassificacao = 5;
    component.readOnly = true; // Define readOnly como verdadeiro
    component.classificar(novaClassificacao); // Tenta classificar com o mesmo valor
    expect(onChangeSpy).not.toHaveBeenCalled(); // Verifica se onChange não foi chamado
    expect(component.classificacao).not.toBe(novaClassificacao); // Verifica se a classificação foi atualizada
  });

  it('deveria ignorar os valores inválidos e setar o valor padrão 1  à classificacao', () => {
    const valoresInvalidos = [0, -1, 'abc', undefined]; // Lista de valores inválidos
    valoresInvalidos.forEach((valorInvalido: any) => {
      component.writeValue(valorInvalido); // Tenta escrever um valor inválido
      expect(component.classificacao).toBe(1);
    });
  });

  it('deveria atualizar o DOM a cada mudança da classificação', () => {
    const novaClassificacao = 3;
    component.classificar(novaClassificacao);
    fixture.detectChanges(); // Atualiza o DOM após a mudança de classificação
    const elementoPreenchida = fixture.nativeElement.querySelector('.filled'); // Seleciona o elemento estrela preenchida
    expect(elementoPreenchida).toBeTruthy(); // Verifica se o elemento estrela preenchida existe
  });
});
