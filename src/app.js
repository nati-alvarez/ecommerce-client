import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/App';
import store from './store';
import styles from './styles/index.sass';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));