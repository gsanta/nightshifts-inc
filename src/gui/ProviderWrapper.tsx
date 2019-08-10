import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const ProviderWrapper = ({ children, store }) => (
  <Provider store={store}>
    <Router>
      { children }
    </Router>
  </Provider>
);

export default ProviderWrapper;
