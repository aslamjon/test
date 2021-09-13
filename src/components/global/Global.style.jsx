import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-size: 14px;
  background: #212529;
  color: #fff;
}
`;
const Global = ({children}) => {
    return <ThemeProvider theme={{dark: false}}>
        <GlobalStyle/>
        {children}
    </ThemeProvider>
}
export default Global;