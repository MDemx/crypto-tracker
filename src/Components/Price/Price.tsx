import React from 'react';
import styles from "./Price.module.scss";

type PriceProps = {
    price: string
    selectedBaseSymbol: string
    selectedQuoteSymbol: string
}

export const Price: React.FC<PriceProps> = ({price, selectedBaseSymbol, selectedQuoteSymbol}) => {
    return (
        <div className={styles.priceWrapper}>
            <div className={styles.price}>
                <p>{price ? (`1 ${selectedBaseSymbol} = ` + Number(price).toFixed(3) + ` ${selectedQuoteSymbol}`) : 'Please select currencies'}</p>
            </div>
        </div>
    );
};
