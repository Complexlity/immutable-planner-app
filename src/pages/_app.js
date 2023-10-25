import '@/styles/globals.css'
import "@/styles/App.css";
import "@/styles/styles.css"
import { MyProvider } from '@/store/passportStore'

export default function App({ Component, pageProps }) {
  return(
   <MyProvider>
    <Component {...pageProps} />
   </MyProvider>
  )
}
