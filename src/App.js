import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './configureStore'

import './App.css';

import ArticleListContainer from './containers/ArticleListContainer'
import Endpoints from './Endpoints'

const App = (props) => {

    const store = configureStore();

    return (
      <div className="App">
        <div className="article-list">
          <Provider store={store}>
            <ArticleListContainer
              url={endpoint.url}
              sortField="created"
              sortOrder="DESC"
              sortMap={endpoint.sortMap}
            />
          </Provider>
        </div>
      </div>
    );
}

export default App;
