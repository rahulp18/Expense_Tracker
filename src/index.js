import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from './context/Context' 
import {SpeechProvider} from '@speechly/react-client'
ReactDOM.render(
  <SpeechProvider appId='bc79b436-3295-4294-8985-7ea8c7243f7f' language='en-US'>
 <Provider>
   <App />
 </Provider>
  </SpeechProvider>

   ,
  document.getElementById('root')
);

 
