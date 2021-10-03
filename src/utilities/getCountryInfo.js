
// https://dmitripavlutin.com/javascript-fetch-async-await/
//https://selvaganesh93.medium.com/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7

export async function getCountryInfo(countryCode) {
    //const APIKEY = process.env.REACT_APP_COUNTRY_LAYER_API_KEY;
    const url = "https://restcountries.com/v3.1/alpha/" + countryCode;
  
    const axios = require('axios');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
  
    try {
      const response = await axios
        .get(url, { cancelToken: source.token });

        var result = response.data[0];

        var country =  {
                name: result.name.common,
                code: result.cca3,
                nativeName: (result.name.nativeName ? Object.values(result.name.nativeName)[0].common : "NA"),
                population: result.population.toLocaleString(),
                region: result.region,
                subregion: (result.subregion ? result.subregion : "NA"),
                capital: (result.capital ? result.capital[0] : "NA"),
                topLevelDomain: result.tld[0],
                currencies: Object.keys(result.currencies),
                languages: Object.values(result.languages),
                flag: result.flags.svg,
                borders: result.borders
            
        };
        return country;
    } catch (error) {
      console.error(error);
    }
  
    return() => {
      source.cancel();
    }
  }