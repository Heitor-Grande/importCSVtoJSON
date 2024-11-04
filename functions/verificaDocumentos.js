//função para verificar se documento é cpf ou cnpj e aplicar a mascara
function verificaTipoDocumento(documento) {
    return documento.length == 11 ?
        documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
        : documento.length == 14 ? documento.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5")
            : 'DOC. INVÁLIDO'
}
module.exports = verificaTipoDocumento