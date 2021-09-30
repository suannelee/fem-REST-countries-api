import React from 'react'
import { func, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components"

const Button = styled.button`
    background:none;
    border: none;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    padding:0;
`;

const Toggle = ({theme,  toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
          {(theme === 'light') ? 
            (<span><FontAwesomeIcon icon={faMoon} size="lg"/></span>) : 
            (<span><FontAwesomeIcon icon={faSun} size="lg"/></span>)}
        </Button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;