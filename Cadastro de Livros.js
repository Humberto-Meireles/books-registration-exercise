var prompt = require("prompt-sync")()
var LocalStorage = require("node-localstorage").LocalStorage
localStorage = new LocalStorage("./data")

console.clear()

while (true) {
    title("--- Cadastro de Livros ---")
    console.log("1. Incluir Livro")
    console.log("2. Listar Livros")
    console.log("3. Pesquisar por Categoria")
    console.log("4. Excluir Livro")
    console.log("5. Estatística")
    console.log("6. Finalizar")
    var opcao = Number(prompt("Opção: "))
    if (opcao == 1) {
        incluir()
    } else if (opcao == 2) {
        listar()
    } else if (opcao == 3) {
        pesquisar()
    } else if (opcao == 4) {
        excluir()
    } else if (opcao == 5) {
        estatistica()
    } else if (opcao == 6) {
        break
    } else {
        console.log('Opção inválida')
    }
}

function title(texto) {
    console.log()
    console.log(texto)
    console.log("-".repeat(50))
}

function incluir() {
    title("Inclusão de Livros")

    var titulo = prompt("Título do Livro: ")
    var categoria = prompt("Categoria..........: ")
    var autor = prompt("Autor......: ")
    var paginas = Number(prompt("Nº de páginas......: "))

    var data = ""

    if (localStorage.getItem("livros.txt")) {
        data = localStorage.getItem("livros.txt") + "\n"
    }

    localStorage.setItem("livros.txt", `${data}${titulo};${categoria};${autor};${paginas}`)

    console.log("Ok! Livro Cadastrado com Sucesso")
}

function listar() {
    title("Lista de Livros Cadastrados")

    if (!localStorage.getItem("livros.txt")) {
        console.log("Obs.: Não há livros cadastrados")
        return
    }

    console.log("Nº Título do Livro...................: Categoria...............: Autor..............................: Nº de páginas.:")

    var livros = localStorage.getItem("livros.txt")

    var linhas = livros.split("\n")

    var num = 0

    for (linha of linhas) {
        var partes = linha.split(";")

        var titulo = partes[0]
        var categoria = partes[1]
        var autor = partes[2]
        var paginas = Number(partes[3])

        num = num + 1

        console.log(`${String(num).padStart(2)} ${titulo.padEnd(35)} ${categoria.padEnd(35)} ${autor.padStart(25)} ${paginas.toFixed(0).padStart(10)}`)
    }
}

function pesquisar() {
    title("Pesquisa de Livros")

    if (! localStorage.getItem("livros.txt")) {
        console.log("Obs.: Não há livros cadastrados")
        return
    }

    var pesq = prompt("Qual categoria de livros pesquisar? ")

    console.log("\nNº Título do Livro...................: Categoria...............: Autor..............................: Nº de páginas.:")

    var livros = localStorage.getItem("livros.txt")

    var linhas = livros.split("\n")

    var num = 0

    for (linha of linhas) {
        var partes = linha.split(";")

        var titulo = partes[0]
        var categoria = partes[1]
        var autor = partes[2]
        var paginas = Number(partes[3])

        if (categoria == pesq) {
            num = num + 1
            console.log(`${String(num).padStart(2)} ${titulo.padEnd(35)} ${categoria.padEnd(25)} ${autor.padStart(35)} ${paginas.toFixed(0).padStart(10)}`)
        }
    }

    if (num == 0) {
        console.log(`* Obs.: Não há livros cadastrados na categoria "${pesq}"`)
    }
}

function excluir() {
    listar()

    console.log()

    var numExc = Number(prompt("Nº do livro a ser excluído (ou 0, para voltar): "))

    if (numExc == 0) {
        return
    }

    var livros = localStorage.getItem("livros.txt")

    var linhas = livros.split("\n")

    linhas.splice(numExc - 1, 1)

    localStorage.setItem("livros.txt", linhas.join("\n"))

    console.log("Ok! Livro removido com sucesso")
}

function estatistica() {
    title("Estatística de Livros Cadastrados")

    var livros = localStorage.getItem("livros.txt")

    var linhas = livros.split("\n")

    var num = 0
    var total = 0
    var maior = 0
    var livro = ""
    var escritor = ""

    for (linha of linhas) {
        var partes = linha.split(";")

        var titulo = partes[0]
        var autor = partes[2]
        var paginas = Number(partes[3])

        num = num + 1
        total = total + paginas

        if (paginas > maior) {
            maior = paginas
            livro = titulo
            escritor = autor
        }
    }

    var media = total / num

    console.log(`Nº de Livros Cadastrados.......: ${num}`)
    console.log(`Total de Páginas dos Livros....: ${total}`)
    console.log(`Nº Médio de páginas dos Livros.: ${media.toFixed(2)}`)
    console.log(`Livro com Maior Nº de páginas..: ${maior} - ${livro} - ${escritor}`)
}