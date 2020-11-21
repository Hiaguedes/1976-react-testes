import React from 'react';
import App from './App';
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
})
