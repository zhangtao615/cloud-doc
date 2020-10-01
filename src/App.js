import React from 'react';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles  from './utils/defaultFiles'
import Button from './components/Button'
import TabList from './components/TabList'
import { faPlus , faFileImport } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row  no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch 
            title="我的云文档"
            onFileSearch={(value)=>{console.log(value)}}
          ></FileSearch>
          <FileList
           files={defaultFiles}
           onFileClick={(id)=>{}}
           onFileDelete={(id)=>{}}
           onSaveEdit={(id,newVal)=>{alert(newVal)}}
          ></FileList>
          <div className="row  no-gutters">
            <div className="col">
              <Button
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
              ></Button>
            </div>
            <div className="col">
              <Button
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              ></Button>
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          <TabList
            files={defaultFiles}
            onTabClick={(id)=>{console.log(id)}}
            activedId="1"
          ></TabList>
        </div>
      </div>
    </div>
  );
}

export default App;
