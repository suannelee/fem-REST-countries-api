
// https://dmitripavlutin.com/javascript-fetch-async-await/
//https://selvaganesh93.medium.com/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7

export async function getCountries() {
    //const APIKEY = process.env.REACT_APP_COUNTRY_LAYER_API_KEY;
    const url = "https://restcountries.com/v3.1/all";
  
    const axios = require('axios');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
  
    try {
      const response = await axios
        .get(url, { cancelToken: source.token });

        var countries = response.data.map(country => {
            return {
                name: country.name.common,
                capital: (country.capital ? country.capital[0] : "NA"),
                population: country.population,
                region: country.region,
                flag: country.flags.png,
                code: country.cca3
            }
        });

        countries = countries.sort((a, b) => a.name > b.name ? 1 : -1);
        return countries;
    } catch (error) {
      console.error(error);
    }
  
    return() => {
      source.cancel();
    }
  }