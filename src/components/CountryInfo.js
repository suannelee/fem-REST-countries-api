import styled from "styled-components";

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p {
        font-size: 16px;
    }
`;

const Flag = styled.img`
    width: 45%;
`;

const Info = styled.div`
    width: 47%;
`;
  
const InfoOne = styled.div`
    display: flex;
    flex-direction: row;
`;

const InfoLeft = styled.div`
    width: 57%;
`;

const InfoRight = styled.div`
    width: 43%;
`;

const BorderCountries = styled.div`
    display: flex;
    flex-direction: row;
`;

const CountryInfo = ( {country, onClick} ) => {

    return(
        <InfoWrapper>
            <Flag 
                src={ country.flag }
                alt={ country.name }
            />
            <Info>
                <h1>{country.name}</h1>
                <InfoOne>
                    <InfoLeft>
                        <p><b>Native Name: </b>{country.nativeName}</p>
                        <p><b>Population: </b>{country.population}</p>
                        <p><b>Region: </b>{country.region}</p>
                        <p><b>Sub Region: </b>{country.subregion}</p>
                        <p><b>Capital: </b>{country.capital}</p>
                    </InfoLeft>
                    <InfoRight>
                        <p><b>Top Level Doamin: </b>{country.topLevelDomain}</p>
                        <p><b>Currencies: </b>{country.currencies.join(", ")}</p>
                        <p><b>Languages: </b>{country.languages.join(", ")}</p>
                    </InfoRight>
                </InfoOne>
                <BorderCountries>
                    <p><b>Border Countries: </b></p>
                    <div>
                        {country.borders.map((c, index) => (
                            <button 
                                key={index} 
                                onClick={() => onClick(c)}>
                                    {c}
                            </button>
                        ))}
                    </div>
                </BorderCountries>
            </Info>
        </InfoWrapper>
    )
}

export default CountryInfo;