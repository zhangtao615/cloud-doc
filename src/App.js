import React,{Fragment, useState} from 'react';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
// import defaultFiles  from './utils/defaultFiles'
import {flattenArr, objToArr} from './utils/helper'
import fileHelper from './utils/fileHelper'
import ButtonBtn from './components/ButtonBtn'
import TabList from './components/TabList'
import { faPlus , faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from "react-simplemde-editor";
import { v4 as uuidv4 } from 'uuid';
import "easymde/dist/easymde.min.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const { join } = window.require('path')
const { remote } = window.require('electron')
const Store = window.require('electron-store')
const fileStore = new Store({'name':'cloud file'})

const saveFilesToStore = (files) => {
  const filesStoreObj = objToArr(files).reduce((result,file) => {
    const { id, path, title, createdAt } = file
    result[id] = {
      id,
      path,
      title,
      createdAt,
    }
    return result
  }, {})
  fileStore.set('files',filesStoreObj)
}

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {}) //已有的markdown文档
  const [activeFileID, setActiveFileID] = useState('') //正在展示的markdown文档
  const [openFileIDs, setOpenFileIDs] = useState([]) //所有打开的markdown文档
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]) //未保存的的markdown文档
  const [searchedFiles, setSearchedFiles] = useState([]) //搜索结果的文件
  const filesArr = objToArr(files)
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr
  const savedLocation = remote.app.getPath('desktop') //存储文件地址
  const openedFiles = openFileIDs.map(openID => {
    return files[openID]
  })
  const activeFile = files[activeFileID]
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
      setActiveFileID(tabWithout[tabWithout.length-1])
    }else {
      setActiveFileID('')
    }
  }
  const fileChange = (id,value) => {
    //更新文件
    const newFile = { ...files[id],body:value}
    setFiles({ ...files,[id]:newFile})
    if (!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([ ...unsavedFileIDs, id])
    }
  }
  const deleteFile = (id) => {
    fileHelper.deleteFile(files[id].path).then(() => {
      delete files[id]
      setFiles(files)
      saveFilesToStore(files)
      tabClose(id)
    })
  }
  const updateFileName = (id, title, isNew) => {
   const newPath = join(savedLocation, `${title}.md`)
   const modifiedFile = { ...files[id], title, isNew: false, path:newPath}
   const newFiles = { ...files, [id]:modifiedFile}
   if(isNew) {
    fileHelper.writeFile(newPath, files[id].body).then(() => {
      setFiles( newFiles )
      saveFilesToStore(newFiles)
    })
   }else{
    const oldPath = join(savedLocation, `${files[id].title}.md`)
    fileHelper.renameFile(oldPath, newPath).then(()=>{
      setFiles( newFiles )
      saveFilesToStore(newFiles)
    })
   }
   
  }
  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(files => files.title.includes(keyword))
    setSearchedFiles(newFiles)
  }
  //创建新文档
  const createNewFile = () => {
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '',
      body: '## 请输出 Markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles({ ...files, [newID]: newFile })
  }
  const saveCurrentFile = (id) => {
    fileHelper.writeFile(join(savedLocation, `${activeFile.title}.md`),activeFile.body).then(() => {
      setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id))
    })
  }
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
              <ButtonBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <ButtonBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
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
                  minHeight:'610px',
                  autosave: {
                    enabled:true,
                    delay:1000
                  },
                  tabSize: 2
                }}
              ></SimpleMDE>
              <ButtonBtn
                text="保存"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={saveCurrentFile}
              />
          </Fragment>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
