import React from 'react';
import Conta from './Conta';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Componente de conta', () => {
    test('Exibir saldo da conta com formatação monetária', () => {
        render(<Conta saldo={1000}/>)
        const saldo = screen.getByTestId('saldo-conta');

        expect(saldo.textContent).toBe('R$ 1000');
    })

    test('Chamar função de realizar transação com o clique do botão', () => {
        const funcaoRealizarTransacao = jest.fn()
        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao}/>)

        fireEvent.click(screen.getByTestId('botao-addtransacao'))

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    })
})