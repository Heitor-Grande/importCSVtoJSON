const fs = require("fs")
function criarArquivoJson(arrayDados, caminhoArquivo) {
    fs.appendFile(caminhoArquivo, JSON.stringify(arrayDados), function (erro) {
        if (erro) {
            console.log("Erro ao criar arquivo JSON")
            console.log(erro)
        }
        else {
            console.log("Dados exportados para: " + caminhoArquivo)
        }
    })
}
module.exports = criarArquivoJson