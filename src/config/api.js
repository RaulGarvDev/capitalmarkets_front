export const heading = "currency converter"
export const API_DOMAIN = "https://api.frankfurter.app/latest?"
export const endpointPath = (from, to) =>
    `${API_DOMAIN}from=${from}&to=${to}`;