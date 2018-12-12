module.exports = {
    server: {
        port: 3000
    },
    crawler: {
        website: 'https://myreservations.omnibees.com',
        fixedParams: {
            c: 2983, // Le Canton
            lang: 'pt-BR'
        },
        resultField: '#search_results'
    }
}