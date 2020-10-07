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
  const [files, setFiles] = useState(defaultFiles) //已有的markdown文档
  const [activeFileID, setActiveFileID] = useState('') //正在展示的markdown文档
  const [openFileIDs, setOpenFileIDs] = useState([]) //所有打开的markdown文档
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]) //未保存的的markdown文档
  const [searchedFiles, setSearchedFiles] = useState([])
  const openedFiles = openFileIDs.map(openID => {
    return files.find(files => files.id === openID)
  })
  const activeFile = files.find(files => files.id === activeFileID)
  //点击打开某个markdown文档
  const fileClick = (fileID) => {
    //当前点击的文件ID
    setActiveFileID(fileID)
    if(!openFileIDs.includes(fileID)){//如果文件未打开
      //将这个文件加入到打开数组中
      setOpenFileIDs([ ...openFileIDs, fileID])
    }
  }
  //点击某个tab页
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }
  //关闭某个markdown文件
  const tabClose = (id) => {
    const tabWithout = openFileIDs.filter(fileID => fileID !== id)
    setOpenFileIDs(tabWithout)
    //关闭当前文件后的处理
    if(tabWithout.length > 0){
      setActiveFileID(tabWithout[0])
    }else {
      setActiveFileID('')
    }
  }
  const fileChange = (id,value) => {
    //更新文件
    const newFiles = files.map(files => {
      if(files.id === id){
        files.body = value
      }
      return files
    })
    setFiles(newFiles)
    if (!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([ ...unsavedFileIDs, id])
    }
  }
  const deleteFile = (id) => {
    const newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
    tabClose(id)
  }
  const updateFileName = (id,title) => {
    const newFiles = files.map(files => {
      if(files.id === id) {
        files.title = title
      }
      return files
    })
    setFiles(newFiles)
  }
  const fileSearch = (keyword) => {
    const newFiles = files.filter(files => files.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : files
  return (
    <div className="App container-fluid px-0">
      <div className="row  no-gutters">
        <div className="col-3 bg-light left-pannel">
          <FileSearch 
            title="我的云文档"
            onFileSearch={fileSearch}
          ></FileSearch>
          <FileList
           files={fileListArr}
           onFileClick={fileClick}
           onFileDelete={deleteFile}
           onSaveEdit={updateFileName}
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
                onTabClick={tabClick}
                onCloseTab={tabClose}
                activedId={activeFileID}
              ></TabList>
              <SimpleMDE className="mt-2"
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {fileChange(activeFile.id, value)}}
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
