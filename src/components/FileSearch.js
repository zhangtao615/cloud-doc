<<<<<<< HEAD
import React,{useState,useEffect,useRef, Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faTimes } from '@fortawesome/free-solid-svg-icons'
=======
import React,{useState,useEffect,useRef} from 'react'
>>>>>>> 4671f1c34ee2f43a4b85798762a0314ffcebbc6d

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
<<<<<<< HEAD
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
=======
        <div className="alert alert-primary">
            { !inputActive &&
                <div className="d-flex justify-content-between align-items-center">
                    <span>{title}</span>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>{setInputActive(true)}}
                    >搜索</button>
                </div>
            }
            { inputActive &&
                <div className="row">
>>>>>>> 4671f1c34ee2f43a4b85798762a0314ffcebbc6d
                    <input
                        className="form-control col-8"
                        value={value}
                        ref={node}
                        onChange={(e)=>{setValue(e.target.value)}}
                    ></input>
                    <button
                        type="button"
<<<<<<< HEAD
                        className="icon-close"
                        onClick={closeSearch}
                    >
                    <FontAwesomeIcon title="关闭" icon={faTimes}></FontAwesomeIcon>
                    </button>
                </Fragment>
=======
                        className="btn btn-primary col-4"
                        onClick={closeSearch}
                    >关闭</button>
                </div>
>>>>>>> 4671f1c34ee2f43a4b85798762a0314ffcebbc6d

            }
        </div>
    )
}
export default FileSearch;