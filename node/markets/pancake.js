let tickers = []


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    tickers = []
    try {
        await $axios('https://api.pancakeswap.info/api/v2/tokens')
            .then(res => {
                const data = res.data.data
                for (let key in data) {
                    tickers.push(data[key])
                }
                tickers = tickers.map(item => {
                    return {
                        symbol: item.symbol.toUpperCase() + 'USDT',
                        price: parseFloat(item.price)
                    }
                })
            })
            .catch(e => {
                $errorHandler(e)
            })
    } catch (e) {
        $errorHandler(e)
    }
}


module.exports = {
    getTickers,
    loadTickers
}
