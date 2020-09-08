import React, {useState, useEffect, Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit , faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
    const [editStatus, setEditStatus] = useState(false);
    const [value, setValue] = useState('');
    useEffect(()=>{
      const handleInputEvent = (event) => {
          const  { keyCode} = event
          if(keyCode === 13 && setEditStatus){
            const editItem = files.find(file => file.id === editStatus)
            setEditStatus(false);
            setValue('');
            onSaveEdit(editItem.id,value);
          }else if(keyCode === 27){
              closeSearch(event)
          }
      }
      document.addEventListener('keyup',handleInputEvent);
      return ()=> {
          document.removeEventListener('keyup',handleInputEvent)
      }
  })
    const closeSearch = () => {
      setEditStatus('false');
      setValue('')
    }
    return(
        <ul className="list-group list-group-flush file-list">
            { 
                files.map(file => (
                    <li
                        className="list-group-item bg-light d-flex align-items-center file-item"
                        key={file.id}
                    >
                      { (file.id !== editStatus) &&
                        <Fragment>
                          <span className="col-2"><FontAwesomeIcon icon={faMarkdown} /></span>
                          <span className="col-8 c-link"
                            onClick={()=>{onFileClick(file.id)}}
                          >{file.title}</span>
                          
                          <button
                              type="button"
                              className="icon-button col-1"
                              onClick={()=>{setEditStatus(file.id);setValue(file.title)}}
                          >
                              <FontAwesomeIcon title="编辑" icon={faEdit}></FontAwesomeIcon>
                          </button>
                          <button
                              type="button"
                              className="icon-button col-1"
                              onClick={onFileDelete}
                          >
                              <FontAwesomeIcon title="删除" icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </Fragment>
                      }
                      { (file.id === editStatus) && 
                        <Fragment>
                          <input
                            className="form-control col-10"
                            value={value}
                            onChange={(e)=>{setValue(e.target.value)}}
                          ></input>
                          <button
                            type="button"
                            className="icon-button col-2"
                            onClick={closeSearch}
                          >
                            <FontAwesomeIcon title="关闭" icon={faTimes}></FontAwesomeIcon>
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
    file:PropTypes.array,
    onFileClick:PropTypes.func,
    onFileDelete:PropTypes.func,
    onSaveEdit:PropTypes.func
}
export default FileList;