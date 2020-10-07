import React from 'react';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles  from './utils/defaultFiles'
import Button from './components/Button'
import TabList from './components/TabList'
import { faPlus , faFileImport } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
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
            unsavedIds={["1"]}
            onTabClick={(id) => {console.log(id)}}
            onCloseTab={(id) => {console.log(id)}}
            activedId="1"
          ></TabList>
          <SimpleMDE className="mt-2"
            value={defaultFiles[1].body}
            options={{
              minHeight:'620px',
              autosave: {
                enabled:true,
                delay:1000
              },
              tabSize: 2
            }}
          ></SimpleMDE>
        </div>
      </div>
    </div>
  );
}

export default App;
