import { createGlobalStyle } from 'styled-components'

export const themes = {
  default: {
    name: 'Défaut',
    colors: {
      main: '#004899',
      second: '#E42313',
      background: '#ffffff',
      text: '#666666',
      input: '#F5F5F5',
      mainLight: '#E5EDF5',
      label: {
        'Niveau très engagé sans ARENH': '#128371',
        'Niveau très engagé': '#128371',
        'Niveau engagé sans ARENH': '#ECC505',
        'Niveau engagé': '#ECC505',
      },
    },
    mq: {
      small: `@media screen and (max-width: ${46}em)`,
      medium: `@media screen and (max-width: ${75}em)`,
      mediumLandscape: `@media screen and (orientation: landscape) and (max-width: ${62}px)`,
      mediumPortrait: `@media screen and (orientation: portrait) and (max-width: ${62}px)`,
      large: `@media screen and (min-width: ${92}em)`,
      xlarge: `@media screen and (min-width: ${2000}px)`,
    },
  },
}

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-weight: 500;
    line-height: 1.4;
    text-rendering: geometricPrecision;
  }

  body {
    color: ${(props) => props.theme.colors.text};
  } 

  *, *:before, *:after {
    margin-top: 0;
    box-sizing: inherit;
  }

  #root {
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: ${(props) => props.theme.colors.main};
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    color: ${(props) => props.theme.colors.main};
  }
  
  select {
    appearance: none;
    height: 3.5rem;
    padding: 10px 35px 10px 10px;
    color: ${(props) => props.theme.colors.main};
    line-height: 1.2;
    text-align: left;
    background-image: url('https://ademe-styleguide.app.norsys.io/img/navigation-down-blue.svg');
    background-repeat: no-repeat;
    background-position: center right;
    border: 0.1rem solid ${(props) => props.theme.colors.main};
    border-radius: 0.5rem;
  }

  button {
    color: ${(props) => props.theme.colors.main};
    cursor: pointer;
  }

  option {
    color: #010101;
  }
`
