import React, {useEffect, useState} from 'react';
import styles from './MainContainer.module.scss'
import {Select} from 'antd';
import {useQuery} from "@apollo/client";
import {GET_ALL_MARKET_CURRENCIES, GET_CANDLES, GET_PRICE} from "../../queries/markets";
import {SwapOutlined} from '@ant-design/icons';
import {Price} from "../Price/Price";
import {store} from 'react-notifications-component';
import {ChartWrapper} from "../Chart/ChartWrapper";
import dayjs from 'dayjs';

export const MainContainer = () => {

    const handleError = (title: string, message: string) => {
        store.addNotification({
            title: title,
            message: message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 4000,
                onScreen: true
            }
        });
    }

    const [firstCurrency, setFirstCurrency] = useState<string>('')
    const [secondCurrency, setSecondCurrency] = useState<string>('')

    const {
        data: allCurrenciesData,
        loading: allCurrenciesLoading,
        error: allCurrenciesError
    } = useQuery(GET_ALL_MARKET_CURRENCIES)

    const {
        data: priceData,
        loading: priceLoading,
        error: priceError
    } = useQuery(GET_PRICE, {
        variables: {
            baseSymbol: firstCurrency,
            quoteSymbol: secondCurrency
        }
    })

    const {
        data: candlesData,
        loading: candlesLoading,
        error: candlesError
    } = useQuery(GET_CANDLES, {
        variables: {
            startDate: dayjs().add(-1, 'day').format('YYYY-MM-DD'),
            baseSymbol: firstCurrency,
            quoteSymbol: secondCurrency
        }
    })


    const [market, setMarket] = useState<string>('')
    const [allCurrencies, setAllCurrencies] = useState([])
    const [candles, setCandles] = useState([])

    const [price, setPrice] = useState<string>('')
    const [selectedBaseSymbol, setSelectedBaseSymbol] = useState<string>('')
    const [selectedQuoteSymbol, setSelectedQuoteSymbol] = useState<string>('')


    useEffect(() => {
        if (!allCurrenciesLoading) {
            setAllCurrencies(allCurrenciesData.markets)
            setMarket(allCurrenciesData.markets[0].exchangeSymbol)
        }

        if (allCurrenciesError) {
            handleError('Getting currencies error!', 'Something went wrong')
        }
    }, [allCurrenciesData]);

    const swap = () => {
        if (firstCurrency && secondCurrency) {
            setFirstCurrency(secondCurrency)
            setSecondCurrency(firstCurrency)
        } else {
            handleError('Error swapping currencies!', 'Please select both currencies')
        }
    }

    const getInfo = () => {
        if (firstCurrency && secondCurrency) {
            if ((!priceLoading && priceData.markets.length > 0) || (!candlesLoading && candlesData.markets[0] && candlesData.markets[0].ohlcv.length > 0)) {
                setPrice(priceData.markets[0].ticker.lastPrice)
                setSelectedBaseSymbol(priceData.markets[0].baseSymbol)
                setSelectedQuoteSymbol(priceData.markets[0].quoteSymbol)

                setCandles(candlesData.markets[0].ohlcv)
            } else {
                handleError('Error getting price!', 'Sorry, but price for this pair is unavailable at the moment')
            }

            if (priceError) {
                handleError('Error getting price!', priceError.message)
            }
        } else {
            handleError('Error getting price!', 'Please select both currencies')
        }
    }

    if (allCurrenciesLoading) {
        return <div>Loading...</div>
    }

    return <div className={styles.pricesWrapper}>
        <div className={styles.currentMarket}>All data taken from: <b>{market}</b></div>
        <div className={styles.currenciesSelectWrapper}>
            <div className={styles.currencySelectItem}>
                <Select
                    showSearch
                    onChange={(value: string) => setFirstCurrency(value)}
                    style={{width: 200}}
                    value={firstCurrency || 'Start typing to select...'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                >
                    {allCurrencies.length > 0 && allCurrencies.map((item: any) => (
                        <Select.Option key={item.baseSymbol} value={item.baseSymbol}>
                            {item.baseSymbol}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className={styles.swapIcon}>
                <button onClick={swap}>
                    <SwapOutlined/>
                </button>
            </div>
            <div className={styles.currencySelectItem}>
                <Select
                    showSearch
                    onChange={(value: string) => setSecondCurrency(value)}
                    style={{width: 200}}
                    value={secondCurrency || 'Start typing to select...'}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                >
                    {allCurrencies.length > 0 && allCurrencies.map((item: any, index) => (
                        <Select.Option key={index} value={item.baseSymbol}>
                            {item.baseSymbol}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </div>

        <button className={styles.getInfoBtn} onClick={getInfo}>
            Get info
        </button>

        <Price price={price} selectedBaseSymbol={selectedBaseSymbol} selectedQuoteSymbol={selectedQuoteSymbol}/>
        <ChartWrapper candles={candles} selectedBaseSymbol={selectedBaseSymbol} selectedQuoteSymbol={selectedQuoteSymbol}/>
    </div>
}