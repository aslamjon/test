import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import Global from './components/global';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Global >
          <App />
        </Global>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

