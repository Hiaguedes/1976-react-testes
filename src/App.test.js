import React from 'react';
import App, { calcularNovoSaldo } from './App';
import { render, screen, fireEvent } from '@testing-library/react';

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

    describe('Quando realiza transação', () => {
        test(' do tipo saque, espera-se que o saldo diminua', () => {
            const valoresSaque = {
                transacao: 'saque', 
                valor: 10,
            }
            const novoSaldo = calcularNovoSaldo(valoresSaque, 110);
            expect(novoSaldo).toBe(100);
        })
        test('do tipo depósito, espera-se que o saldo aumente', () => {
            const valoresDeposito = {
                transacao: 'deposito', 
                valor: 10,
            }
            expect(calcularNovoSaldo(valoresDeposito, 110)).toBe(120);
        })
        test('do tipo saque, a transação tem que ser feita', () => {
            render(<App />);

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');
            fireEvent.click(transacao, { target: { value: 'saque' } });
            fireEvent.change(valor, { target: { value: 10 } });
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        })
    })
})
