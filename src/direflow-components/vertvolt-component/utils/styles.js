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
background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' version='1.1' id='svg3747' sodipodi:docname='navigation-down-blue.svg' inkscape:version='0.92.4 (5da689c313, 2019-01-14)'%3E%3Cmetadata id='metadata3753'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3ENavigation Down%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs3751' /%3E%3Csodipodi:namedview pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1' objecttolerance='10' gridtolerance='10' guidetolerance='10' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:window-width='1920' inkscape:window-height='1001' id='namedview3749' showgrid='false' inkscape:zoom='12.15625' inkscape:cx='18.410686' inkscape:cy='32' inkscape:window-x='-9' inkscape:window-y='-9' inkscape:window-maximized='1' inkscape:current-layer='svg3747' /%3E%3Ctitle id='title3741'%3ENavigation Down%3C/title%3E%3Cdesc id='desc3743'%3EA solid styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' d='M21 22a2.99 2.99 0 0 1 2.121.879l8.89 8.636 8.868-8.636a3 3 0 0 1 4.242 4.242L32.011 40 18.879 27.121A3 3 0 0 1 21 22z' id='path3745' fill='%23202020' style='fill:%23004899;fill-opacity:1' /%3E%3C/svg%3E");    background-repeat: no-repeat;
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
