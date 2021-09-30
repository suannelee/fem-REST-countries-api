import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import '../index.scss';

const DropdownStyle = styled.div`
    position: relative;
`;

const DropdownButton = styled.button`
    background-color: ${({ theme }) => theme.elements}; 
    border-radius: 5px;
    cursor: pointer;
    padding: 21px 24px;
    width; 200px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;
    color: ${({ theme }) => theme.text}; 

    span {
        padding-right: 50px;
    }
`;

const Menu = styled.nav`
    background-color: ${({ theme }) => theme.elements};
    border-radius: 5px;
    color: ${({ theme }) => theme.text}; 
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
        cursor: pointer;
    }

    li {
        padding: 4px 25px;
        
    }


`;

const DropdownMenu = ( props ) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    
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
                </ul>
            </Menu>
        </DropdownStyle>
    )
}

export default DropdownMenu;