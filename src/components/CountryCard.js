import styled from "styled-components";

const Card = styled.div`
        background-color: ${({ theme }) => theme.elements};            
        width: 20.5%;
        margin-bottom: 79px;
        border-radius: 10px;
    `;

    const Flag = styled.img`
        width: 100%;
    `;

    const CardInfo = styled.div`
        padding: 20px;
    `;
    
const CountryCard = ( props ) => {

    

    return(
        <Card>
            <Flag 
                src={ props.flag }
                alt={ props.name }
            />
            <CardInfo>
                <h3>{ props.name }</h3>
                <p><b>Region:</b> { props.region }</p>
            </CardInfo>
        </Card>
    )
}

export default CountryCard;