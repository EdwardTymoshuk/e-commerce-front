import Head from "next/head"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #E9C46A;
    --light-primary-color: #EAC873;
    --header-color: #343a40;
    --light-header-color: #2F5767;
    --text-color: #ced4da;
    --success-color: #2A9D8F;
    --light-success-color: #2EAFA0;
    --danger-color: #E76F51;
    --light-danger-color: #E9795C;
  }
  body{
    padding: 0;
    margin: 0; 
    color: var(--text-color);
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

`

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
