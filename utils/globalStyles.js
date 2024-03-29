import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #ec9b00;
    --text-color: #fff;
    --dark-text-color: #212529;
    --bg-color: #e9ecef;

    --light-primary-color: #EAC873;
    --dark-primary-color: #E2B43E;
    --header-color: #343a40;
    --light-header-color: #2F5767;
    --success-color: #2A9D8F;
    --light-success-color: #2EAFA0;
    --danger-color: #E76F51;
    --light-danger-color: #EC8D75;
    --dark-danger-color: #E24E29;
  }
  body{
    padding: 0;
    margin: 0; 
    color: var(--dark-text-color);
    background-color: var(--bg-color);
    font-family: "Roboto", sans-serif;
    min-height: 100vh;
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
  .cart-delete-item {
    vertical-align: baseline;
  }

`