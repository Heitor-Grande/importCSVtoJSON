//importando bibliotecas 
const fs = require("fs")
const csvParser = require("csv-parser")
const converterDinheiroPTBR = require("./functions/converterDinheiro")
const verificaTipoDocumento = require("./functions/verificaDocumentos")
const criarArquivoJson = require("./functions/criarArquivoJson")
//Manipulação de Dados de CSV e Conversão para Array
const dados = []
fs.createReadStream("./data/data.csv").pipe(csvParser()).on("data", function (data) {
    //Validação de Valor Total e Prestações
    const vlPrestaCalculado = parseFloat(data.vlTotal) / parseInt(data.qtPrestacoes)
    dados.push({
        ...data,
        vlTotal: converterDinheiroPTBR(data.vlTotal),//Conversão de Dados para Moeda Real Brasileira
        vlPresta: converterDinheiroPTBR(data.vlPresta),
        vlPrestaCalculado: converterDinheiroPTBR(vlPrestaCalculado),
        valorTotalPrestaValidado: vlPrestaCalculado == data.vlPresta ? true : false,
        vlMora: converterDinheiroPTBR(data.vlMora),
        vlMulta: converterDinheiroPTBR(data.vlMulta),
        vlOutAcr: converterDinheiroPTBR(data.vlOutAcr),
        vlIof: converterDinheiroPTBR(data.vlIof),
        vlDescon: converterDinheiroPTBR(data.vlDescon),
        vlAtual: converterDinheiroPTBR(data.vlAtual),
        nrCpfCnpj: verificaTipoDocumento(data.nrCpfCnpj)//Validação de CPF ou CNPJ

    })
}).on("end", function () {
    //criando arquivo .json de resposta para consulta
    const caminhoArquivo = "./json/dadosFormatados.json"
    //verificando se arquivo já existe
    if (fs.existsSync(caminhoArquivo)) {
        console.log("Arquivo já existe, deletando arquivo.")
        fs.unlink(caminhoArquivo, function (erro) {
            if (erro) {
                console.log("Erro ao excluir arquivo")
                console.log(erro)
            }
            else{
                criarArquivoJson(dados, caminhoArquivo)
            }
        })
    }
    else{
        criarArquivoJson(dados, caminhoArquivo)
    }
})
