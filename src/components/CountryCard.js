import styled from "styled-components";
import breakpoints from "../utilities/breakpoints";

const Card = styled.div`
    background-color: ${({ theme }) => theme.elements};            
    width: 80%;
    margin-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    @media ${breakpoints.device.sm}{
        width: 45%;
    }

    @media ${breakpoints.device.md}{
        width: 29.3%;
    }

    @media ${breakpoints.device.lg}{
        width: 20.5%;
        margin-bottom: 73px;
    }
`;

const Flag = styled.div`
    height: 160px;  
    overflow: hidden;
    border-radius: 5px 5px 0 0;

    img {
        transition: transform .5s;  
        height: 100%;
        width: 100%;  
        object-fit: cover;
    } 

    &:hover img {
        transform: scale(1.15);
    }  
`;

const CardInfo = styled.div`
    padding: 21px 23px 40px;
    
    h3 {
        padding-bottom: 15px;
    }

    p {
        margin: 5px 0;
    }
`;
    
const CountryCard = ( {country, onClick} ) => {

    return(
        <Card onClick={onClick}>
            <Flag> 
                <img
                src={ country.flag }
                alt={ country.name }/>
            </Flag>
            <CardInfo>
                <h3>{ country.name }</h3>
                <p><b>Population:</b> { country.population.toLocaleString() }</p>
                <p><b>Region:</b> { country.region }</p>
                <p><b>Capital:</b> { country.capital }</p>
            </CardInfo>
        </Card>
    )
}

export default CountryCard;