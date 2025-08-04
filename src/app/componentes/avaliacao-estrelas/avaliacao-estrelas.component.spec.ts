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
    expect(component).toBeTruthy(); // Verifica se o componente foi criado com sucesso
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
    const estrelasPreenchidas = fixture.nativeElement.querySelector('.filled'); // Seleciona o elemento estrela preenchida
    expect(estrelasPreenchidas).toBeTruthy(); // Verifica se o elemento estrela preenchida existe
  });

  it('deveria iniciar com a classificação padrão igual a 1 e refletir mudanças corretamente', () => {
    expect(component.classificacao).toBe(1); // Verifica se o valor inicial é 1
    component.classificar(4);
    expect(component.classificacao).toBe(4); // Verifica se a mudança foi refletida
    fixture.detectChanges();
    const estrelasPreenchidas =
      fixture.nativeElement.querySelectorAll('.filled'); // Seleciona todas as estrelas preenchidas
    expect(estrelasPreenchidas.length).toBe(4); // Verifica se o DOM reflete a nova classificação
  });

  it('deveria alterar a classificação corretamente ao clicar na terceira e depois na quinta estrela', () => {
    // Simula o clique na terceira estrela
    component.classificar(3); // Simula o clique na terceira estrela
    fixture.detectChanges(); // Atualiza o DOM após a mudança de classificação
    let estrelasPreenchidas = fixture.nativeElement.querySelectorAll('.filled'); // Seleciona todas as estrelas preenchidas
    expect(component.classificacao).toBe(3); // Verifica se a classificação foi atualizada
    expect(estrelasPreenchidas.length).toBe(3); // Verifica se três estrelas estão preenchidas

    // Simula o clique na quinta estrela
    component.classificar(5); // Simula o clique na quinta estrela
    fixture.detectChanges(); // Atualiza o DOM após a mudança de classificação
    estrelasPreenchidas = fixture.nativeElement.querySelectorAll('.filled'); // Seleciona novamente todas as estrelas preenchidas
    expect(component.classificacao).toBe(5); // Verifica se a classificação foi atualizada para 5
    expect(estrelasPreenchidas.length).toBe(5); // Verifica se cinco estrelas estão preenchidas
  });
});
