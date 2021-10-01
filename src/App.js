import React, { useRef, useState, useEffect } from 'react';
import CountryCard from './components/CountryCard';
import CountryInfo from './components/CountryInfo';
import DropdownMenu from './components/DropdownMenu';
import Toggle from "./components/ThemeToggler";
import Loader from './components/Loader';
import { getCountries } from './utilities/getCountries';
import { getCountryInfo } from './utilities/getCountryInfo';
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode"
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

import styled from "styled-components";

const Header = styled.header`
  background-color: ${({ theme }) => theme.elements}; 
  display: flex;
  justify-content: space-between;
  padding: 27px 81px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
`;

const Body = styled.div`
  padding: 48px 81px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  position: relative;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.elements};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 5px;
  width: 475px;
  padding-left: 75px;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 35px;
  top: 18px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

function App() {

  const inputRef = useRef(null);

  const [theme, themeToggler] = useDarkMode();
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState({});
  const [regionsList, setRegionsList] = useState([]);
  const [showRegion, setShowRegion] = useState('');
  const [showCountry, setShowCountry] = useState({});

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    getCountries()
    .then(result => {
      setCountries(result);
      setLoading(false);

      // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
      // eslint-disable-next-line
      let regionsList = Object.keys(result.reduce((r,{region}) => (r[region]='', r), {}))
      setRegionsList(regionsList.sort());
    })
  }, [])

  const renderCountries = () => {
    const cards = countries
                    .filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(country => country.region.toLowerCase().includes(showRegion.toLowerCase()))
                    .map((country) => (
                      <CountryCard 
                        key={country.code}
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        flag={country.flag}
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
                    ref={inputRef}
                    placeholder="Search for a country..."
                    onChange={e => setSearch(e.target.value)}
                    />
                    <Icon><FontAwesomeIcon icon={faSearch}/></Icon>
                    <DropdownMenu
                      regions={regionsList}
                      onClick={i => changeRegions(i)}
                    />
                  </Filter>
                  {renderCountries()}
                </div>
              ) : (
                <div>
                  <button onClick={() => setShowCountry({})}>Back</button>  
                  <CountryInfo
                    country={showCountry}
                    onClick={(code) => showCountryInfo(code)}
                  />
                </div>
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
