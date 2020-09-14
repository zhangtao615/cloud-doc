import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({text,colorClass,icon,onBtnClick}) => {
    return(
        <button
            type="button"
            className={`btn btn-block no-border ${colorClass}`}
            onClick = {onBtnClick}
        >
            <FontAwesomeIcon className ="mr-2" icon={icon}></FontAwesomeIcon>
            {text}
        </button>
    )
    
}

Button.propTypes = {
    text:PropTypes.string,
    colorClass:PropTypes.string,
    icon:PropTypes.element.isRequired,
    onBtnClick:PropTypes.func
}
Button.defultProps = {
    text:'新建'
}
export default Button