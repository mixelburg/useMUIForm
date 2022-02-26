import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {Provider} from 'jotai'

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#071b2f',
            paper: '#071b2f',
        }
    }
});

ReactDOM.render(
  <React.StrictMode>
      <Provider>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <App />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
