//função criada para converter valores para real 
function converterDinheiroPTBR(valor) {
    //convertendo o valor que chega em string para float
    const valorFormatado = parseFloat(valor)
    //formatando para moeda real sem o 'R$'
    const valorConvertido = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(valorFormatado)
    //retornando moeda formatada em real
    return valorConvertido
}
module.exports = converterDinheiroPTBR