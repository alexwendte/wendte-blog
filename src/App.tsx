import { Router } from '@reach/router'
import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'
import Header from './header/Header'
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export const theme = {
  black: '#333333',
  lightGray: '#EDEFF2',
  offWhite: 'hsl(150, 40%, 96%)',
  primary: '#cf6776',
  success: 'hsl(154, 90%, 41%)',
  warning: 'hsl(0, 100%, 37%)',
  white: 'hsl(0, 0%, 100%)',
}

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyle />
      <Router>
        <Header path="/*" />
      </Router>
      <Router primary={false}>
        <Home path="/" />
        <AboutUs path="/about-us" />
        <NotFound default={true} />
      </Router>
    </div>
  </ThemeProvider>
)

export default App

const GlobalStyle = createGlobalStyle`
  body,
  input,
  textarea,
  button {
    background: ${theme.white};
    font-family: Rubik, Arial, Helvetica, Verdana, sans-serif;
    color: ${theme.black};
  }
  b {
    font-weight: 500;
  }
  h1 {
    font-size: 3.6rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
  h2 {
    font-size: 2.7rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
  h3 {
    font-size: 2.11rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
  h4 {
    font-size: 1.8rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
  h5 {
    font-size: 1.5rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
  h6 {
    font-size: 1.35rem;
    font-family: 'Architects Daughter', Arial, Helvetica, Verdana, sans-serif;
    margin: 0;
  }
`
