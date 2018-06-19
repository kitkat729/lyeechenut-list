import React, { Component } from 'react';
import './App.css';

import ArticleListContainer from './containers/ArticleListContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <ArticleListContainer
            url="https://gist.githubusercontent.com/stefsic/6cccb57ca589369692aa850328d901cd/raw/f11e8fba16079af7d1c9c4a5f9eb66d6626f1217/test_api.json"
            sortField="created"
            sortOrder="DESC"
          />
      </div>
    );
  }
}

export default App;
