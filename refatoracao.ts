class Consumidor {
    constructor(
        private nome: string,
        private idade: number,
        private email: string
    ) {
        if (nome.trim().length < 3) {
            throw new Error("O nome deve ter pelo menos 3 caracteres.");
        }
        if (!Number.isInteger(idade) || idade < 0) {
            throw new Error("A idade deve ser um numero inteiro.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("O email é inválido.");
        }
    }

    formatarExibicao(): string {
        return `Consumidor: ${this.nome}, idade: ${this.idade}, email: ${this.email}`;
    }

    static calcularMediaIdade(consumidores: Consumidor[]): number {
        if (consumidores.length === 0) {
            return 0;
        }

        const soma = consumidores.reduce((total, consumidor) => total + consumidor.idade, 0);
        return soma / consumidores.length;
    }

    static obterExtremosIdade(consumidores: Consumidor[]): {
        maisVelho: Consumidor | undefined;
        maisNovo: Consumidor | undefined;
    } {
        if (consumidores.length === 0) {
        return {
            maisNovo: undefined,
            maisVelho: undefined
        };
    }
    let maisVelho = consumidores[0];
    let maisNovo = consumidores[0];
    
    for (const consumidor of consumidores) {
        if (consumidor.idade > maisVelho.idade) {
        maisVelho = consumidor;
        }

        if (consumidor.idade < maisNovo.idade) {
            maisNovo = consumidor;
        }
    }

    return {maisVelho, maisNovo};
}

}

const consumidores = [
    new Consumidor("Flavio", 22, "flavio@email.com"),
    new Consumidor("Maria", 30, "maria@email.com"),
    new Consumidor("João", 23, "joao@email.com")
];

console.log("Média das idades: " + Consumidor.calcularMediaIdade(consumidores));


const { maisVelho, maisNovo } = Consumidor.obterExtremosIdade(consumidores);

if (maisVelho && maisNovo) {
    console.log("Consumidor mais velho:");
    console.log(maisVelho.formatarExibicao());

    console.log("Consumidor mais novo:");
    console.log(maisNovo.formatarExibicao());
}

console.log("\n=== Teste de Validação ===");

try {
    const teste = new Consumidor("Joao", 20, "emailinvalido");
    console.log(teste.formatarExibicao());
} catch (erro) {
    if (erro instanceof Error) {
        console.log("Erro ao cadastrar:", erro.message);
    }
}