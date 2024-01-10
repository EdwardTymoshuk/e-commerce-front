import { Helmet, HelmetProvider } from "react-helmet-async"
import CartContextProvider from "@/components/CartContext"
import { GlobalStyles } from "@/utils/globalStyles"
import { Toaster } from "react-hot-toast"

// This component serves as the entry point for the application.
// It includes essential setup for global styling, font loading,
// and the context provider for managing the shopping cart.

export default function App({ Component, pageProps }) {
  return (
    <HelmetProvider>
    <>
      <Toaster /> {/* Notification toaster for displaying messages */}
      <Helmet>
        {/* Load fonts from Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles /> {/* Apply global styles to your entire app */}
      <CartContextProvider>
        {/* Provide shopping cart context to all components */}
        <Component {...pageProps} />
        {/* Render the component associated with the current route */}
      </CartContextProvider>
    </>
    </HelmetProvider>
  )
}
