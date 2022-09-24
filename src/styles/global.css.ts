import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 html,
 body {
   padding: 0;
   padding-inline: 1em;
   margin: 0;
   font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
 }
 a {
   color: inherit;
   text-decoration: none;
 }
 * {
   box-sizing: border-box;
 }

 @media (max-width: 600px) {
  html,
  body {
    padding-inline: .4em;
  }
} 
`;
