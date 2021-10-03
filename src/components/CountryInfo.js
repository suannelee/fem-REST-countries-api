import styled, { css } from "styled-components";
import breakpoints from "../utilities/breakpoints";

const flexComponent = css`
    display: flex;
    flex-direction: column;

`;

const InfoWrapper = styled.div`
    ${flexComponent}
    justify-content: space-between;
    padding-top: 50px;

    @media ${breakpoints.device.md}{
        padding-top: 82px;
        flex-direction: row;
    }

    p {
        font-size: 16px;
    }
`;

const Flag = styled.img`
    width: 100%;

    @media ${breakpoints.device.md}{
        width: 60%;
    }

    @media ${breakpoints.device.lg}{
        width: 44%;
    }
`;

const Info = styled.div`
    padding-top: 40px;
    width: 100%;

    @media ${breakpoints.device.md}{
        width: 31%;
    }

    @media ${breakpoints.device.lg}{
        width: 47%;
    }
`;
  
const InfoOne = styled.div`
    ${flexComponent}
    padding-top: 28px;
    
    @media ${breakpoints.device.lg}{
        flex-direction: row;
    }

    p {
        margin: 8px 0;
    }
`;

const InfoLeft = styled.div`
    width: 100%;

    @media ${breakpoints.device.lg}{
        width: 57%;
    }
`;

const InfoRight = styled.div`
    width: 100%;

    @media ${breakpoints.device.lg}{
        width: 42%;
    }
`;

const BorderCountries = styled.div`
    ${flexComponent}
    padding-top: 50px;

    @media ${breakpoints.device.lg}{
        flex-direction: row;
    }

    button {
        background-color: ${({ theme }) => theme.elements}; 
        border-radius: 1px;
        cursor: pointer;
        padding: 6px 24px;
        width; 200px;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
        border: none;
        margin: 0 8px 10px 0px;
        color: ${({ theme }) => theme.text}; 

    }

    p {
        padding-top: 1px;
        padding-bottom: 20px;
        width: 100%;

        @media ${breakpoints.device.lg}{
            padding-bottom: 0;
            width: 24%;
        }
    }

    div {
        width: 100%;

        @media ${breakpoints.device.lg}{
            width: 76%;
        }
    }

`;

const CountryInfo = ( {country, countryCodes, onClick} ) => {

    return(
        <InfoWrapper>
            <Flag 
                src={ country.flag }
                alt={ country.name }
            />
            <Info>
                <h2>{country.name}</h2>
                <InfoOne>
                    <InfoLeft>
                        <p><b>Native Name: </b>{country.nativeName}</p>
                        <p><b>Population: </b>{country.population}</p>
                        <p><b>Region: </b>{country.region}</p>
                        <p><b>Sub Region: </b>{country.subregion}</p>
                        <p><b>Capital: </b>{country.capital}</p>
                    </InfoLeft>
                    <InfoRight>
                        <p><b>Top Level Domain: </b>{country.topLevelDomain}</p>
                        <p><b>Currencies: </b>{country.currencies.join(", ")}</p>
                        <p><b>Languages: </b>{country.languages.join(", ")}</p>
                    </InfoRight>
                </InfoOne>
                <BorderCountries>
                    <p><b>Border Countries:</b></p>
                    <div>
                        {country.borders ? 
                        (
                            country.borders.map((c, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => onClick(c)}>
                                        {countryCodes[c]}
                                </button>
                            ))
                        ) : 
                        (
                            <p>None</p>
                        )
                        }
                    </div>
                </BorderCountries>
            </Info>
        </InfoWrapper>
    )
}

export default CountryInfo;