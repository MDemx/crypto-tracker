import React from 'react';
import styles from './Chart.module.scss'
import {Chart} from "./Chart";
import * as dayjs from 'dayjs';

type ChartWrapper = {
    candles: Array<Array<string>>,
    selectedBaseSymbol: string
    selectedQuoteSymbol: string
}

export const ChartWrapper: React.FC<ChartWrapper> = ({candles, selectedBaseSymbol, selectedQuoteSymbol}) => {

        const data = [
            {
                "id": `${selectedBaseSymbol}/${selectedQuoteSymbol}`,
                "color": "hsl(180, 33%, 65%)",
                "data":
                    candles.length > 0 && candles.map((candle: string[]) => {
                        return {
                            "x": dayjs.unix(+candle[0]).format('HH:mm'),
                            "y": String((Number(candle[1]) + Number(candle[4])) / 2) // (open price + close price) / 2
                        }
                    })
            }
        ]

        return <>
            <div className={styles.chartWrapper}>
                <h2>Price yesterday</h2>
                <div className={styles.chart}>
                    {candles.length > 0 && <Chart selectedQuoteSymbol={selectedQuoteSymbol} data={data}/>}
                </div>
            </div>
        </>
    }
;