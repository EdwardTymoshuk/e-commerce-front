import { Helmet } from "react-helmet"
import CartContextProvider from "@/components/CartContext"
import { GlobalStyles } from "@/utils/globalStyles"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }) {
  return (
    <>
    <Toaster />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
