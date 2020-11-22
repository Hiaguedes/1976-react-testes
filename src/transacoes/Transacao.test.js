import React from 'react';
import { render } from '@testing-library/react';
import Transacao from './Transacao';

describe('Componente de transação do extrato', () => {
    test('Snapshot do componente deve sempre ser o mesmo', () => {
        const { container } = render(<Transacao data="01/01/1111" tipo="saque" valor="20"/>)
        expect(container.firstChild).toMatchSnapshot();
    })
})