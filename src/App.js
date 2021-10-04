import React, { useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import CountryInfo from './components/CountryInfo';
import FilterByRegion from './components/FilterByRegionDropdown';
import SortBy from './components/SortByDropdown';
import Toggle from "./components/ThemeToggler";
import Loader from './components/Loader';
import { getCountries } from './utilities/getCountries';
import { getCountryInfo } from './utilities/getCountryInfo';
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./utilities/useDarkMode"
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import breakpoints from './utilities/breakpoints';
import './App.scss';

import styled from "styled-components";

const Header = styled.header`
  background-color: ${({ theme }) => theme.elements}; 
  display: flex;
  justify-content: space-between;
  padding: 27px 20px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);

  @media ${breakpoints.device.sm}{
    padding: 27px 81px;
  }
`;

const Body = styled.div`
  padding: 30px 20px;

  @media ${breakpoints.device.sm}{
    padding: 48px 81px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 48px;
  position: relative;

  @media ${breakpoints.device.md}{
    flex-direction: row;
  }
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.elements};
  color: ${({ theme }) => theme.text};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  border: none;
  width: 100%;
  border-radius: 5px;
  padding: 20px 0 20px 75px;
  margin-bottom: 40px;

  &:focus {
    outline: none;
  }

  @media ${breakpoints.device.md}{
    width: 475px;
    padding: 0 0 0 75px;
    margin-bottom: 0;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 35px;
  top: 18px;
`;

const Dropdown = styled.div`
  display: flex;
  gap: 20px;
  flex-flow: column;
  @media ${breakpoints.device.sm}{
    flex-flow: row;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 6%;
  justify-content: center;

  @media ${breakpoints.device.sm}{
    justify-content: left;
  }
`;

const CountryInfoWrapper = styled.div`

  @media ${breakpoints.device.md}{
    padding-top: 32px;
  }
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.elements}; 
  border-radius: 3px;
  cursor: pointer;
  padding: 10px 40px 10px 60px;
  width; 200px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  border: none;
  vertical-align: middle;
  color: ${({ theme }) => theme.text}; 
  font-size:16px;
  position: relative;

`;

const BackIcon = styled(Icon)`
  top: 10px;
`;

function App() {

  const [theme, themeToggler] = useDarkMode();
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [sortCountry, setSortCountry] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [showRegion, setShowRegion] = useState('');
  const [showCountry, setShowCountry] = useState({});

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    getCountries()
    .then(result => {
      setCountries(result);
      setLoading(false);

      // https://vmarchesin.medium.com/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
      let countryCodes = result.reduce((map, country) => ({
        ...map,
        [country.code]: country.name,
      }), {})
      setCountryCodes(countryCodes);

      // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
      // eslint-disable-next-line
      let regionsList = Object.keys(result.reduce((r,{region}) => (r[region]='', r), {}))
      setRegionsList(regionsList.sort());
    })
  }, [])

  const renderCountries = () => {
    let newCountries = countries;
    switch(sortCountry) {
      case "alphaInc":
        newCountries = countries.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      case "alphaDec":
        newCountries = countries.sort((a, b) => a.name < b.name ? 1 : -1);
        break;
      case "popInc":
        newCountries = countries.sort((a, b) => a.population - b.population);
        break;
      case "popDec":
        newCountries = countries.sort((a, b) => b.population - a.population);
        break;
      default:
        newCountries = countries.sort((a, b) => a.name > b.name ? 1 : -1);
    }

    const cards = newCountries
                    .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(country => country.region.toLowerCase().includes(showRegion.toLowerCase()))
                    .map((country) => (
                      <CountryCard 
                        key={country.code}
                        country={country}
                        onClick={() => showCountryInfo(country.code)}
                      />
                    ))

    return(
        <CardsWrapper>{cards}</CardsWrapper>
    )
  } 

  const changeRegions = (region) => {
    if(region ==="all"){
      setShowRegion('')
    } else{
      setShowRegion(regionsList[region]);
    }
  }
  
  const showCountryInfo = (code) => {
    getCountryInfo(code)
    .then(result => {
      setShowCountry(result);
      //console.log(result);
    })
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles/>
        <Header>
          <h1>Where in the world?</h1>
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </Header>
        <Body>
        {isLoading ? (
            <Loader></Loader>
          ) : (
            <div>
              {Object.keys(showCountry).length === 0 && showCountry.constructor === Object ? (
                <div>
                  <Filter>
                    <Input 
                    value={search}
                    placeholder="Search for a country..."
                    onChange={e => setSearch(e.target.value)}
                    />
                    <Icon><FontAwesomeIcon icon={faSearch}/></Icon>
                    <Dropdown>
                      <SortBy
                        onClick={i => setSortCountry(i)}
                      />
                      <FilterByRegion
                        regions={regionsList}
                        onClick={i => changeRegions(i)}
                      />
                    </Dropdown>
                  </Filter>
                  {renderCountries()}
                </div>
              ) : (
                <CountryInfoWrapper>
                  <BackButton onClick={() => setShowCountry({})}>
                    <BackIcon><FontAwesomeIcon icon={faLongArrowAltLeft}/></BackIcon>
                    Back</BackButton>  
                  <CountryInfo
                    country={showCountry}
                    countryCodes={countryCodes}
                    onClick={(code) => showCountryInfo(code)}
                  />
                </CountryInfoWrapper>
              )}
            </div>
          )
        }
        </Body>
      </>
    </ThemeProvider>
  );
}

export default App;
