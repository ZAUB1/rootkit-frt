export const camelToSnake = (camel: string) =>
    camel.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);