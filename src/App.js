import React from 'react';
import './App.css';
import Game from './component/Game'


function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;
