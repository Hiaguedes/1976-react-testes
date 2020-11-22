import React from 'react';
import App, { calcularNovoSaldo } from './App';
import { render, screen } from '@testing-library/react';

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
    })
})
