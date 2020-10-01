import React from "react";
import classNames from "classnames"
import PropTypes from 'prop-types';

const TabList = ({ files, activedId, unsavedIds, onTabClick, onCloseTab}) => {
    return (
        <ul className="nav nav-pills">
            { files.map(files => {
                const fClassName = classNames({
                    'nav-link':true,
                    'active':files.id === activedId
                })
                return (
                    <li className={fClassName} key={files.id}>
                        <a href="#"
                         className="nav-link"
                         onClick={(e) => {e.preventDefault();onTabClick(files.id)}}
                         >{files.title}</a>
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