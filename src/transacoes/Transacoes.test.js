import React from 'react';
import Transacao from './Transacao';
import Transacoes from './Transacoes';
import { render } from '@testing-library/react';
describe('Componente de TransaçÕes', () => {
    test('Snapshot do componente deve sempre ser o mesmo', () => {
        const transacoes = [
            {
                "valor": 10,
                "transacao": "saque",
                "data": "10/08/2020",
                "id": 1
              },
              {
                "transacao": "deposito",
                "valor": "20",
                "data": "26/09/2020",
                "id": 2
              },
              {
                "transacao": "deposito",
                "valor": "50",
                "data": "21/11/2020",
                "id": 3
              },
              {
                "transacao": "deposito",
                "valor": "50",
                "data": "21/11/2020",
                "id": 4
              }
        ]

        const { container } = render(<Transacoes transacoes={transacoes} />)

        expect(container.firstChild).toMatchSnapshot();

    })


})