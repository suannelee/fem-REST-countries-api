import styled , { css } from "styled-components";

export const commonStyles = css`    
    background-color: ${({ theme }) => theme.elements}; 
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: ${({ theme }) => theme.text}; 
    cursor: pointer;
`;

export const DropdownStyle = styled.div`
    position: relative;
`;

export const DropdownButton = styled.button`
    ${commonStyles}
    padding: 21px 24px;
    border: none;
    vertical-align: middle;
    transition: box-shadow 0.4s ease;

    span {
        padding-right: 50px;
    }
`;

export const Menu = styled.nav`
    ${commonStyles}
    position: absolute;
    top: 60px;
    width: ${props => props.menuWidth || "150px"};
    font-size: 13px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    z-index:1;

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