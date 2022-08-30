let results

const derivatives = [
    'ETH3LUSDT', 'BTC3LUSDT', 'XRP3SUSDT', 'BTC3SUSDT', 'EOS3SUSDT', 'DOGUSDT', 'GBPUSDT', 'BTTUSDT', 'EURUSDT',
    'DOGE3SUSDT', 'WNDUSDT', 'BNB3LUSDT', 'FAMEUSDT'
]

function checkDifference (markets) {
    results = []
    markets.forEach((market) => { // Все биржи
        market.tickers.forEach(ticker => { // Тикеры одной биржи
            markets.forEach(item => {
                if (item.name !== market.name) {
                    const handlTicker = item.tickers.find(f => f.symbol === ticker.symbol)
                    if (handlTicker) {
                        if (
                            getDifferencePercent(ticker.price, handlTicker.price) > 0.5 &&
                            getDifferencePercent(ticker.price, handlTicker.price) < 30 &&
                            !derivatives.includes(ticker.symbol)) {

                            const inResultsTicker = results.find(f => {
                                return f.symbol === ticker.symbol && f.market1 === item.name
                            })
                            if (!inResultsTicker) {
                                results.push({
                                    symbol: ticker.symbol,
                                    market1:  market.name,
                                    market1_price: ticker.price,
                                    market2: item.name,
                                    market2_price: handlTicker.price,
                                    difference: getDifferencePercent(ticker.price, handlTicker.price).toFixed(2)
                                })
                            }
                        }
                    }
                }
            })
        })
    })
    results.sort((a, b) => b.difference - a.difference)
}

function getResults() {
    return results
}

function getDifferencePercent (val1, val2) {
    if (typeof val1 === 'string' || typeof val2 === 'string') {
        val1 = parseFloat(val1)
        val2 = parseFloat(val2)
    }
    const result = (val2 - val1) / val1 * 100
    return Math.abs(result)
}

module.exports = {
    checkDifference,
    getResults
}
