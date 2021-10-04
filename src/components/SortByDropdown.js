import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../utilities/useDetectOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownStyle, DropdownButton, Menu } from './DropDownStyles';
import '../index.scss';


const SortBy = ( props ) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    
    return(
        <DropdownStyle>
            <DropdownButton onClick={() => setIsActive(!isActive)}>
                <span>
                    Sort by
                </span>
                <FontAwesomeIcon icon={faChevronDown} size="xs"/>
            </DropdownButton>
            <Menu ref={dropdownRef} className={`${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li onClick={() => props.onClick('alphaInc')}>Name (A - Z)</li>
                    <li onClick={() => props.onClick('alphaDec')}>Name (Z - A)</li>
                    <li onClick={() => props.onClick('popInc')}>Population <FontAwesomeIcon icon={faArrowUp} size="xs"/></li>
                    <li onClick={() => props.onClick('popDec')}>Population <FontAwesomeIcon icon={faArrowDown} size="xs"/></li>
                </ul>
            </Menu>
        </DropdownStyle>
    )
}

export default SortBy;
