import {GithubOutlined} from '@ant-design/icons/lib/icons';
import React from 'react';
import styles from "./App.module.scss"
import {MainContainer} from "./Components/MainContainer/MainContainer";

export const App = () => {
    return <div className={styles.appWrapper}>
        <header className={styles.header}>
            <div className={styles.naming}>
                <h1>Crypto Tracker</h1>
            </div>
            <div className={styles.contact}>
                <a href="https://github.com/MDemx/crypto-tracker"><GithubOutlined/></a>
            </div>
        </header>
        <div className={styles.body}>
            <MainContainer/>
        </div>
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.footerText}>Enjoy it! 🙃</p>
                <p className={styles.footerReference}>Crypto Tracker created by <a target={'_blank'} href="https://github.com/MDemx">MDemx</a>👨‍💻</p>
            </div>
        </footer>
    </div>
}