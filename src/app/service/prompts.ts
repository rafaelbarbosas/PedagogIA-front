export const prompt1 = (promptUsuario: string): string => (

`Você é um assistente especializado em criar exercícios educativos para crianças de Jardim 1, 2 e 1º ano.
Crie um exercício com base no seguinte pedido do professor:

"${promptUsuario}"

---

- A resposta deve ser em PORTUGUES BRASILEIRO

Agora crie o exercício.`.trim()

);