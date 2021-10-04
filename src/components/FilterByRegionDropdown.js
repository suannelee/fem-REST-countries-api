import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../utilities/useDetectOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownStyle, DropdownButton, Menu } from './DropDownStyles';
import '../index.scss';


const FilterByRegion = ( props ) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    
    return(
        <DropdownStyle>
            <DropdownButton onClick={() => setIsActive(!isActive)}>
                <span>
                    Filter by Region
                </span>
                <FontAwesomeIcon icon={faChevronDown} size="xs"/>
            </DropdownButton>
            <Menu 
                ref={dropdownRef} 
                className={`${isActive ? 'active' : 'inactive'}`} 
                menuWidth="200px">
                <ul>
                    {props.regions.map((region,index) => (
                        <li key={index}
                        onClick={() => props.onClick(index)}
                        >
                        {region}
                        </li>
                    ))}
                    <li onClick={() => props.onClick('all')}>Show All</li>
                </ul>
            </Menu>
        </DropdownStyle>
    )
}

export default FilterByRegion;
