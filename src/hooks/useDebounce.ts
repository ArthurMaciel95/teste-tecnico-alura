import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * @param value - Valor a ser "debouncado"
 * @param delay - Delay em milissegundos (padrão: 500ms)
 * @returns Valor debouncado
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Criar um timer que atualiza o valor debouncado após o delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpar o timer se o valor mudar antes do delay terminar
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}