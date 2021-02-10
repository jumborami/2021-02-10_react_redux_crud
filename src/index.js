import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import board_reducer from './App_reducer';

let store = createStore(board_reducer, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



// 데이터 입출력과 관련된 모든 기능은 App_reducer.js 파일에 구현되어 있고,

// 이상의 코드는 이 App_reducer.js 파일을 Redux의 문법에 맞추어 App 전체에서 사용할 수 있도록 등록하는 것이다.



// 출처: https://forest71.tistory.com/184?category=683254 [SW 개발이 좋은 사람]