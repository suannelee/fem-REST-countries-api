
// https://dmitripavlutin.com/javascript-fetch-async-await/
//https://selvaganesh93.medium.com/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7

export async function getCountryInfo(countryCode) {
    //const APIKEY = process.env.REACT_APP_COUNTRY_LAYER_API_KEY;
    const url = "https://restcountries.com/v2/alpha/" + countryCode;
  
    const axios = require('axios');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
  
    try {
      const response = await axios
        .get(url, { cancelToken: source.token });

        var result = response.data;

        var country =  {
                name: result.name,
                //code: result.alpha3Code,
                nativeName: result.nativeName,
                population: result.population.toLocaleString(),
                region: result.region,
                subregion: result.subregion,
                capital: result.capital,
                topLevelDomain: result.topLevelDomain[0],
                currencies: result.currencies.map(curr =>{
                    return curr.name
                }),
                languages: result.languages.map(lang =>{
                    return lang.name
                }),
                flag: result.flag,
                borders: result.borders
            
        };

        console.log(country);
        return country;
    } catch (error) {
      console.error(error);
    }
  
    return() => {
      source.cancel();
    }
  }