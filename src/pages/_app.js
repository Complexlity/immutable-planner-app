import '@/styles/globals.css'
import "./App.css";
import "./styles.css"
import { MyProvider } from '@/store/passportStore'

export default function App({ Component, pageProps }) {
  return(
   <MyProvider>
    <Component {...pageProps} />
   </MyProvider>
  )
}
