import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from "classnames"
import './TabList.scss'
import PropTypes from 'prop-types';

const TabList = ({ files, activedId, unsavedIds, onTabClick, onCloseTab}) => {
    return (
        <ul className="nav nav-pills tablist-component">
            { files.map(files => {
                const withUnsavedMark = unsavedIds.includes(files.id) 
                const fClassName = classNames({
                    'nav-link':true,
                    'active':files.id === activedId,
                    "withUnsaved": withUnsavedMark
                })
                return (
                    <li className="nav-item" key={files.id}>
                        <a href="#"
                         className={fClassName}
                         onClick={(e) => {e.preventDefault();onTabClick(files.id);}}>
                          {files.title}
                          <span className="ml-2 close-icon">
                            <FontAwesomeIcon
                             title="关闭"
                             icon={faTimes}
                             onClick={(e)=> {e.stopPropagation(); onCloseTab(files.id)}}
                             ></FontAwesomeIcon>
                          </span>
                          { withUnsavedMark && <span className="rounded-circle unsaved-icon ml-2"></span>}
                        </a>
                    </li>
                )
            })

            }
        </ul>
    )
}

TabList.propTypes = {
    files: PropTypes.array,
    activedId: PropTypes.string,
    unsavedIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func,
}
TabList.defaultProps = {
    unsavedIds: []
}
export default TabList;