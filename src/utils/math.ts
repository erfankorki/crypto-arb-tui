export const mask = (value: Big | undefined) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-US', {
        useGrouping: true,
    }).format(value.toNumber());
}