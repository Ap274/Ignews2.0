import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>ig.news</title>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp