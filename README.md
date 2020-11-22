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

## Função pura

Sempre que executamos a função passando os mesmos parâmetros, o resultado será o mesmo. Ela não depende de nenhum fator externo ou faz alterações globais na aplicação. Temos a previsão do resultado para poder escrever um teste unitário.

Um função que faz somente a exponenciação de um número, ou soma de dois números são exemplos de funções puras, funções que mudam o resultado de forma aleatória ou que dependem de uma variável externa como um estado são exemplos de funções não puras.

## Testes unitários de funções

Com a ideia de testar funções puras nós fazemos o seguinte teste:

```js
    	import App, { calcularNovoSaldo } from './App';
        test(' do tipo saque, espera-se que o saldo diminua', () => {
            const valoresSaque = {
                transacao: 'saque', 
                valor: 10,
            }
            const novoSaldo = calcularNovoSaldo(valoresSaque, 110);
            expect(novoSaldo).toBe(100);
        })
```

Primeiro importamos a função que queremos testar e aí fazemos a execução dela esperando que o valor retornado seja o correto.

## Testando componentes com snapshots

Snapshots de componentes são a forma como o componente irá renderizar na tela, e para que você garanta que o componente irá renderizar sempre da mesma forma você usa um método do expect chamado `.toMatchSnapshot()` que irá gerar o resultado na pasta onde o teste está sendo realizado, então caso alguém mude a função essa função será comparada com o arquivo que está em _snapshots_ e que deve ser passado no commit. Uma forma de fazer esse teste é como está abaixo

```js
import React from 'react';
import { render } from '@testing-library/react';
import Transacao from './Transacao';

describe('Componente de transação do extrato', () => {
    test('Snapshot do componente deve sempre ser o mesmo', () => {
        const { container } = render(<Transacao data="01/01/1111" tipo="saque" valor="20"/>)
        expect(container.firstChild).toMatchSnapshot();
    })
})
```

O destruct pegando o elemento container é justamente para sabermos o filho que será gerado pela renderização desse componente

## Fire Event para simular ações do usuário

Primeiramente podemos selecionar elementos com o jest com

```js
            const { getByText, getByTestId, getByLabelText } = render(<App />);

            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque');
            const valor = getByTestId('valor');
            const botaoTransacao = getByText('Realizar operação');
```

Onde primeiro simulamos o texto do saldo, a label da transação escolhida, selecionamos o input e o botão, agora podemos fazer os eventos de usuário com:

```js
            expect(saldo.textContent).toBe('R$ 1000');
            fireEvent.click(transacao, { target: { value: 'saque' } });
            fireEvent.change(valor, { target: { value: 10 } });
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
```

O primeiro expect é por que é o valor padrão sem alteração da api, ai clicamos no radio de saque, digitamos o valor de 10 e esperamos que o texto mude para 990 reais, sensacional!

Todos esses parâmetros foram pegos com ele já renderizado

Quando vamos escrever um teste de um componente React, precisamos de alguma forma, criá-los no ambiente de testes para que seja possível acessar seus elementos e valores na execução dos testes.

Com o React Testing Library temos uma forma definida de fazer isso, usando:

Render e screen

```js
render(<Conta saldo={1000} />)
screen.getByText('R$1000,00')
```

O render é uma função que o React Testing Library nos fornece para renderizar o componente como um elemento do DOM. Por padrão, esse elemento é renderizado dentro de um elemento raíz, chamado container. Já para acessar um componente, a biblioteca nos fornece o objeto screen, que possui todas as possíveis queries suportadas para buscar elementos no DOM.

## Sobre as querys que eu posso fazer com o testing-library

Link útil: <https://testing-library.com/docs/dom-testing-library/cheatsheet#queries>

<https://testing-library.com/docs/dom-testing-library/api-queries/#queries>

A query `data-testid ` seleciona os elementos que tem um data-testid com algum valor específico, e eles são bem úteis para garantirmos que iremos pegar os elementos corretos.

## Testando APIs

Quando precisamos encontrar elementos de algum componente, usamos as queries do React Testing Library e com código assíncrono não é diferente.

Nesse tipo de teste, qual query devemos usar?

`findBy*` (por exemplo: findByText)

A query findBy retorna uma promise que é completada quando o elemento é encontrado, dessa forma nosso teste espera até que o componente esteja disponível.

Para ver o teste de uma requisição api nós devemos mockar os dados no testes e com isso além de importarmos a api para a aplicação nós fazemos:

```js
jest.mock('./api')
```

e o seguinte teste

```js
describe('RequisiçÕes para a API', () => {
    test('Exibir lista de transações da API', async () => {
       api.listaTransacoes.mockResolvedValue([
            {
              "valor": '10',
              "transacao": "saque",
              "data": "10/08/2020",
              "id": 1
            },
            {
              "transacao": "deposito",
              "valor": "20",
              "data": "26/09/2020",
              "id": 2
            }])

        render(<App />)


        expect(await screen.findByText('saque')).toBeInTheDocument();
        expect(screen.getByTestId('transacoes').children.length).toBe(2)
    })
})
```

Por ser assincrono usamos async/await com o findByText que é o geyBy com um then no meio para requisição assíncrona e a função mockResolvedValue com o resultado da função da api que retorna as transações

## E para testarmos uma função que está sendo passada a um componente?

Para testar podemos mockar essa função e ver se ela foi chamada ou não da seguinte forma

```js
    test('Chamar função de realizar transação com o clique do botão', () => {
        const funcaoRealizarTransacao = jest.fn()
        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao}/>)

        fireEvent.click(screen.getByTestId('botao-addtransacao'))

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    })
```

Onde mockamos a funcaoRealizarTransacao com `const funcaoRealizarTransacao = jest.fn()` e verificamos se ela será chamada com o click no botão em `fireEvent.click(screen.getByTestId('botao-addtransacao'))` e depois esperamos se ela vai ser chamada em `expect(funcaoRealizarTransacao).toHaveBeenCalled();`

O mock de função não testa sua implementação e sim se ela foi chamada ou não

## Quando usar cada teste no seu front end?

Teste unitários -> testes que testam os menores módulos da aplicação como componentes e funções, os testes de snapshots tbm entram nessa

Teste de integração -> integração com o back end e integração entre componentes

e2e -> teste de interação do usuário com a página, normalmente testam o fluxo inteiro da aplicação

É aquele triangulo de testes clássicos mas pensando em front end

Nem sempre os códigos que fazemos precisam ser testados, como landing pages (paginas de marketing) ou códigos que não estão bem implementados. Normalmente códigos que não mexem com dinheiro não precisam ser testados. Testes A/B também não precisam de testes, ao menos que ela seja muito crítica

Geralmente ouvimos que devemos testar todo nosso código e aplicação, mas em alguns momentos, o esforço e tempo de criar os testes podem não ser justificados pelo propósito do nosso projeto.

Dentre as opções abaixo, em qual(is) cenário(s) devemos adicionar testes automatizados?

Nova funcionalidade na aplicação, que vai permitir adicionar comentários nos produtos do site.

É um novo fluxo na aplicação que provavelmente terá comunicação com o backend e outras partes da aplicação. Além da complexidade de desenvolvimento, também temos que levar em consideração a importância para o negócio em garantir que os comentários sejam sempre exibidos corretamente.

Teste A/B que muda o fluxo de transferência no site do ByteBank.

Apesar de ser um teste a/b, sendo nosso código até mesmo descartável, o fluxo que estamos testando é um dos mais importantes da aplicação. É preciso garantir que as transferências funcionem em todas as variantes do experimento.

O conteúdo completo do curso pode ser visto no repositório que estou mesmo, já que eu forkei o projeto original.
