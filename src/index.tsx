import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import 'antd/dist/antd.css';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

const client = new ApolloClient({
    uri: "https://api.blocktap.io/graphql",
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <ReactNotification />
            <App/>
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
