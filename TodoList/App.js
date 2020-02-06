import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';
import Main from './containers/Main';

//상태 저장을 위해 reducers 로 부터 store 생성 후 provider 에 전달(상태관리)
let store = createStore(todoApp);

const App = () => {
  return (
      <Provider store={store}>
        <Main />
      </Provider>
  );
}

export default App;
