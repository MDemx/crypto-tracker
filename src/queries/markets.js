import {gql} from "@apollo/client";

export const GET_ALL_MARKET_CURRENCIES = gql`
    query markets {
        markets(marketSymbol:"Binance:*/USDT") {
            exchangeSymbol
            baseSymbol
            quoteSymbol
        }
}`

export const GET_PRICE = gql`
    query price($baseSymbol: String, $quoteSymbol: String) {
     markets(filter:{  baseSymbol: {_eq:$baseSymbol} quoteSymbol: {_eq:$quoteSymbol} marketStatus: { _eq: Active }}) {
        marketSymbol
        baseSymbol
        quoteSymbol
        ticker {
          lastPrice
        }
    }
}
`

export const GET_CANDLES = gql`
   query MarketCandles($startDate: String, $baseSymbol: String, $quoteSymbol: String) {
      markets(marketSymbol:"Binance:*/*" filter:{ baseSymbol: {_eq:$baseSymbol} quoteSymbol: {_eq:$quoteSymbol} }) {
            ohlcv(resolution: _1h, limit: 24,  startDate:$startDate, sort:OLD_FIRST)
      }
}
`