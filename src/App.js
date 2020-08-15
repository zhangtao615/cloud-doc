import React from 'react';
import FileSearch from './components/FileSearch'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 bg-light left-panel">
          <FileSearch 
            title="我的云文档"
            onFileSearch={()=>{console.log('hello')}}
          ></FileSearch>
        </div>
        <div className="col-9 bg-primary right-panel">
          right
        </div>
      </div>
    </div>
  );
}

export default App;
