import React,{Fragment, useState} from 'react';
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
  const [files, setfiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openFileIDs, setOpenFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const openedFiles = openFileIDs.map(openID => {
    return files.find(files => files.id === openID)
  })
  const activeFile = files.find(files => files.id === activeFileID)
  return (
    <div className="App container-fluid px-0">
      <div className="row  no-gutters">
        <div className="col-3 bg-light left-pannel">
          <FileSearch 
            title="我的云文档"
            onFileSearch={(value)=>{console.log(value)}}
          ></FileSearch>
          <FileList
           files={files}
           onFileClick={(id)=>{}}
           onFileDelete={(id)=>{}}
           onSaveEdit={(id,newVal)=>{alert(newVal)}}
          ></FileList>
          <div className="row no-gutters button-group">
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
          {!activeFile && 
            <div className="start-page">
              选择或者创建新的 Markdown 文档
            </div>
          }
          { activeFile && 
            <Fragment>
              <TabList
                files={openedFiles}
                unsavedIds={unsavedFileIDs}
                onTabClick={(id) => {console.log(id)}}
                onCloseTab={(id) => {console.log(id)}}
                activedId={activeFileID}
              ></TabList>
              <SimpleMDE className="mt-2"
                value={activeFile && activeFile.body}
                options={{
                  minHeight:'620px',
                  autosave: {
                    enabled:true,
                    delay:1000
                  },
                  tabSize: 2
                }}
              ></SimpleMDE>
          </Fragment>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
