import React, {useState, useEffect, useRef, Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit , faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../hooks/useKeyPress'
import PropTypes from 'prop-types'
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
  const [ editStatus, setEditStatus ] = useState(false)
  const [ value, setValue ] = useState('')
  let node = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  useEffect(()=>{
    const newFile = files.find(files => files.isNew)
    if(newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  },[files])
  useEffect(() => {
    const editItem = files.find(files => files.id === editStatus)
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value, editItem.isNew)
      setEditStatus(false)
      setValue('')
    }
    if(escPressed && editStatus) {
      closeSearch(editItem.id)
    }
  })
  // useEffect(() => {
  //   if (editStatus) {
  //     node.current.focus()
  //   }
  // }, [editStatus])
  const closeSearch = (editItem) => {
    setEditStatus('false');
    setValue('')
    if (editItem.isNew) {
      onFileDelete(editItem)
    }
  }
    return(
        <ul className="list-group list-group-flush file-list">
            { 
                files.map(file => (
                    <li
                        className="list-group-item bg-light d-flex align-items-center file-item mx-0"
                        key={file.id}
                    >
                      { (file.id !== editStatus && !file.isNew) &&
                        <Fragment>
                          <span className="col-2"><FontAwesomeIcon icon={faMarkdown} /></span>
                          <span className="col-6 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                          >{file.title}</span>
                          
                          <button
                              type="button"
                              className="icon-button col-2"
                              onClick={()=>{setEditStatus(file.id);setValue(file.title)}}
                          >
                              <FontAwesomeIcon title="编辑" icon={faEdit}></FontAwesomeIcon>
                          </button>
                          <button
                              type="button"
                              className="icon-button col-2"
                              onClick={() => {onFileDelete(file.id)}} 
                          >
                              <FontAwesomeIcon title="删除" icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </Fragment>
                      }
                      { ((file.id === editStatus) || file.isNew) && 
                        <Fragment>
                          <input
                            className="form-control col-10"
                            value={value}
                            ref={node}
                            placeholder="请输入文件名"
                            onChange={(e)=>{setValue(e.target.value)}}
                          ></input>
                          <button
                            type="button"
                            className="icon-button col-2"
                          >
                            <FontAwesomeIcon title="关闭" icon={faTimes} onClick={() => {closeSearch(file)}}></FontAwesomeIcon>
                          </button>
                        </Fragment>

                      }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files:PropTypes.array,
    onFileClick:PropTypes.func,
    onFileDelete:PropTypes.func,
    onSaveEdit:PropTypes.func
}
export default FileList;