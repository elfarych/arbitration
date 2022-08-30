let tickers


function getTickers() {
    return tickers || []
}


async function loadTickers() {
    try {
        await $axios('https://api.gateio.ws/api/v4/spot/tickers')
            .then(res => {
                tickers = res.data
                    .filter(item => item.currency_pair.endsWith('USDT'))
                    .map(item => {
                        return {
                            symbol: item.currency_pair.replace('_', ''),
                            price: parseFloat(item.last)
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
