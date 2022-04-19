import { darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #F0F2F5;
    --shape: #FFFFFF;

    --blue: #5429CC;
    --blue-light: #6933ff;
    --green: #33CC95;
    --red: #E62E4D;

    
    --text-title: #363F5F;
    --text-body: #969CB3;

    --container-max-width: 70rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialised;
  }

  body, input, text-area, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input:focus {
    outline: none !important;
    border: 2px solid var(--blue);
    //box-shadow: 0 0 1rem ${darken(0.04)('#5429CC')};
  }

  .modal-overlay-class-name {
    background-color: rgb(0, 0, 0, 0.6);

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content-class-name {
    width: 100%;
    max-width: 576px;
    background: var(--shape);
    padding: 3rem;
    border-radius: 0.24rem;
    position: relative;
  }

  .modal-close-button {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
  }

`