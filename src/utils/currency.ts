const formatter = new Intl.NumberFormat('uk-UA', { currency: 'UAH', style: 'currency' });

export function currency(value: number) {
    return formatter.format(value);
}
