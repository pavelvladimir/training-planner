// @ts-nocheck
import App from 'next/app'
import Head from 'next/head'

import '../scss/styles.scss'

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props

        return (
            <>
                <Head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, maximum-scale=1.0, user-scalable=no" />
                    <meta name="format-detection" content="telephone=no" />
                </Head>
                <div className="app">
                    <Component {...pageProps} />
                </div>
            </>
        )
    }
}

export default MyApp
