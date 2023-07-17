import { createGlobalStyle } from "styled-components"
import { Helmet } from "react-helmet"
import CartContextProvider from "@/components/CartContext"

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #E9C46A;
    --text-color: #dee2e6;
    --dark-text-color: #212529;
    --bg-color: #e9ecef;

    --light-primary-color: #EAC873;
    --header-color: #343a40;
    --light-header-color: #2F5767;
    --success-color: #2A9D8F;
    --light-success-color: #2EAFA0;
    --danger-color: #E76F51;
    --light-danger-color: #E9795C;
  }
  body{
    padding: 0;
    margin: 0; 
    color: var(--text-color);
    background-color: var(--bg-color);
    font-family: 'Roboto', sans-serif;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  button {
    color: white;
  }
  button:hover {
    cursor: pointer;
  }
  h2 {
    color: #000;
  }

`

export default function App({ Component, pageProps }) {
  return (
    <>
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
