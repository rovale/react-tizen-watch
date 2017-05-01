import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

import './tau/wearable/theme/default/tau.css';
import './tau/wearable/theme/default/tau.circle.css';
// import './tau/wearable/js/tau';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
