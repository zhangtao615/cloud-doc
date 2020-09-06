import React,{useState,useEffect,useRef, Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faTimes } from '@fortawesome/free-solid-svg-icons'

const FileSearch = ({title,onFileSearch}) => {
    const [inputActive,setInputActive] = useState(false);
    const [value,setValue] = useState('');

    const closeSearch = (e) => {
        //e.preventDefault();
        setInputActive(false)
        setValue('')
    };
    let node = useRef(null);
    useEffect(()=>{
        const handleInputEvent = (event) => {
            const  { keyCode} = event
            if(keyCode === 13 && inputActive){
                onFileSearch(value);
            }else if(keyCode === 27){
                closeSearch(event)
            }
        }
        document.addEventListener('keyup',handleInputEvent);
        return ()=> {
            document.removeEventListener('keyup',handleInputEvent)
        }
    })
    useEffect(()=>{
        if(inputActive){
            node.current.focus()
        }
    },[inputActive])
    return (
        <div className="alert alert-primary d-flex justify-content-between align-items-center">
            { !inputActive &&
                <Fragment>
                    <span>{title}</span>
                    <button
                        type="button"
                        className="icon-search"
                        onClick={()=>{setInputActive(true)}}
                    >
                    <FontAwesomeIcon title="搜索" icon={faSearch}></FontAwesomeIcon>
                    </button>
                </Fragment>
            }
            { inputActive &&
                <Fragment>
                    <input
                        className="form-control col-8"
                        value={value}
                        ref={node}
                        onChange={(e)=>{setValue(e.target.value)}}
                    ></input>
                    <button
                        type="button"
                        className="icon-close"
                        onClick={closeSearch}
                    >
                    <FontAwesomeIcon title="关闭" icon={faTimes}></FontAwesomeIcon>
                    </button>
                </Fragment>

            }
        </div>
    )
}
export default FileSearch;