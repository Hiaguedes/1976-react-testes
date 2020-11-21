## Testes no React

Quando escrevemos testes automatizados para aplicações em React, provavelmente uma grande parte dos nossos testes será sobre algum componente de UI e não apenas funções de regras de negócio. Por isso, precisamos de uma biblioteca que nos auxilie a interagir com o DOM, renderizando e encontrando os elementos que precisamos verificar nos testes.

Por muito tempo a principal ferramenta para isso foi o Enzyme, porém alguns anos atrás, o React Testing Library surgiu com uma abordagem centrada no usuário e com padrões para enfatizar boas práticas de semântica e acessibilidade. A biblioteca ganhou bastante força e hoje já faz parte do pacote padrão de uma aplicação feita com o Create React App, por isso vamos usá-la aqui no curso.

Uma das maiores vantagens de escrever nossos testes focados em como os usuários interagem com nossa aplicação é que conseguimos garantir que nossos cenários de teste se parecem ainda mais com os casos do mundo real. Além disso, passamos a nos preocupar muito mais com a funcionalidade da aplicação e não com implementações internas dos componentes, como estados e ciclos de vida. O que faz com que nossos testes quebrem cada vez menos por mudanças na forma de implementar, em vez de garantir que a funcionalidade se mantenha inalterada.

## Uma abordagem inicial para testes com react

Por padrão o react vem com a biblioteca do jest instalada e outro componente do próprio react que é o `@testing-library/react` (vwem outras também mas talvez isso seja abordado mais para frente) e com elas podemos garantir que certos elementos estão sempre sendo mostrados em tela

Uma estrutura minima de importação pode ser a que está sendo mostrada abaixo

```js
import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
```

Dentro de um arquivo que pode ter o nome `App.test.js` ou `App.spec.js` (mas mesmo com o nome precisamos importar o componente que vai ser testado o nome é somente por semantica de projeto mesmo) e com isso podemos testar nosso componente com a seguinte estrutura (describe, test, expect) que descreve o que está sendo testado, o que é o teste em si e o que esperar dele, ou seja:

```js
describe('Componente Principal', () => {
    describe('Quando se abre o app',() => {
        test(' o nome é mostrado', () => {
            render(<App />);
    
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
        test(' o saldo é exibido', () => {
            render(<App />);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
        test(' o botão de fazer transação é mostrado', () => {
            render(<App />);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })

    })
})
```

Onde descrevemos que estamos testando o principal componente (que é o app), depois mais uma descrição que são testes de quando se abre o app, no teste fazemos a renderização do componente app e esperamos (no primeiro teste) que na tela tenhamos o texto ByteBank presente no documento.

O resultado final deve sair como:

```cmd
 PASS  src/App.test.js
  Componente Principal
    Quando se abre o app
      √  o nome é mostrado (43ms)
      √  o saldo é exibido (8ms)
      √  o botão de fazer transação é mostrado (7ms)
```

E assim pegamos o básico de testes, a função `test` pode ser escrita com `it`, no jest é bem comum ver o `it` apesar de eu pessoalmente achar `test` mais semântico

### Organizando os testes

No nosso dia a dia com desenvolvimento é muito comum que tenhamos vários casos de teste diferentes para um mesmo componente ou função. Para tornar nosso projeto fácil de entender e contribuir, temos algumas estruturas para auxiliar a criação dos nossos testes automatizados.

Qual dos cenários abaixo representa uma estrutura adequada para o cenário de um componente com 4 testes unitários?

Apenas um arquivo para o componente, seguindo a estrutura abaixo.

```js
describe('nome do componente', () => {
    it('nome do teste 1', () => {
        */ código do teste */
     })
    it('nome do teste 2', () => {
        */ código do teste */
     })
    it('nome do teste 3', () => {
        */ código do teste */
     })
    it('nome do teste 4', () => {
        */ código do teste */
     })
 })
```

Temos os 4 casos de teste do componente no mesmo arquivo e usamos o describe para determinar que todos esses casos fazem parte de um mesmo contexto. Podemos usar a função it ou test para criar os testes, mas nesse exemplo estamos usando o it.
