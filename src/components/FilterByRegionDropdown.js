import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../utilities/useDetectOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled , { css } from "styled-components";
import '../index.scss';

const commonStyles = css`    
    background-color: ${({ theme }) => theme.elements}; 
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: ${({ theme }) => theme.text}; 
    cursor: pointer;
`;

const DropdownStyle = styled.div`
    position: relative;
`;

const DropdownButton = styled.button`
    ${commonStyles}
    padding: 21px 24px;
    width; 200px;
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;

    span {
        padding-right: 50px;
    }
`;

const Menu = styled.nav`
    ${commonStyles}
    position: absolute;
    top: 60px;
    width: 200px;
    font-size: 13px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    ul {
        list-style: none;
        padding: 10px 0;
        margin: 0;
    }

    li {
        padding: 4px 25px;

        &:hover {
            background-color: ${({ theme }) => theme.input};;
        }
        
    }

`;

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
            <Menu ref={dropdownRef} className={`${isActive ? 'active' : 'inactive'}`}>
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
