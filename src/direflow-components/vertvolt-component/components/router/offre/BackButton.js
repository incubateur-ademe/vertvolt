import React, { useContext } from 'react'
import styled from 'styled-components'
import SearchContext from '../../../utils/SearchContext'

const Wrapper = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4rem;
  padding: 1.6rem 2.4rem 1.6rem 4.5rem;
  color: ${(props) => props.theme.colors.main};
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.background};
  background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' version='1.1' id='svg821' sodipodi:docname='arrow-gauche-blue.svg' inkscape:version='0.92.4 (5da689c313, 2019-01-14)'%3E%3Cmetadata id='metadata827'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3EAngle Down%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs825' /%3E%3Csodipodi:namedview pagecolor='%23ffffff' bordercolor='%23004899' borderopacity='1' objecttolerance='10' gridtolerance='10' guidetolerance='10' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:window-width='1920' inkscape:window-height='1017' id='namedview823' showgrid='false' inkscape:zoom='12.8125' inkscape:cx='32' inkscape:cy='32' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:current-layer='svg821' /%3E%3Ctitle id='title815'%3EAngle Down%3C/title%3E%3Cdesc id='desc817'%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' stroke-miterlimit='10' d='m 38.989106,45 -14,-11.994 14,-12.006' id='path819' inkscape:connector-curvature='0' style='fill:none;stroke:%23004899;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1' /%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position-x: 0.5rem;
  border: 0.1rem solid ${(props) => props.theme.colors.main};
  border-radius: 3.2rem;
  cursor: pointer;
  transition: background-color 200ms ease-out;

  &:hover {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.main};
    background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' viewBox='0 0 64 64' aria-labelledby='title' aria-describedby='desc' role='img' version='1.1' id='svg821' sodipodi:docname='arrow-gauche-white.svg' inkscape:version='0.92.4 (5da689c313, 2019-01-14)'%3E%3Cmetadata id='metadata827'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3EAngle Down%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs825' /%3E%3Csodipodi:namedview pagecolor='%23ffffff' bordercolor='%23FFFFFF' borderopacity='1' objecttolerance='10' gridtolerance='10' guidetolerance='10' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:window-width='1920' inkscape:window-height='1017' id='namedview823' showgrid='false' inkscape:zoom='0.14155946' inkscape:cx='16.10819' inkscape:cy='6595.2628' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:current-layer='svg821' /%3E%3Ctitle id='title815'%3EAngle Down%3C/title%3E%3Cdesc id='desc817'%3EA line styled icon from Orion Icon Library.%3C/desc%3E%3Cpath data-name='layer1' stroke-miterlimit='10' d='m 38.989106,45 -14,-11.994 14,-12.006' id='path819' inkscape:connector-curvature='0' style='fill:none;stroke:%23ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1' /%3E%3C/svg%3E%0A");
  }
`
export default function BackButton() {
  const { setCurrentOffre } = useContext(SearchContext)

  return (
    <Wrapper onClick={() => setCurrentOffre(null)}>
      Voir la liste des offres
    </Wrapper>
  )
}
