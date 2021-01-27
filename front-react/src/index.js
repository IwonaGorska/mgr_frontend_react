import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom'
import Chat from './components/Chat';
import Content from './components/Content';

ReactDOM.render(
<BrowserRouter>
  <App />
  {/* <Route exact path="/" component={App} /> */}
  <Route exact path="/" component={Content} />
  <Route path="/chat" component={Chat} />
</BrowserRouter>,
document.getElementById('root')
  /*<React.StrictMode>
    <App />
  </React.StrictMode>,*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();