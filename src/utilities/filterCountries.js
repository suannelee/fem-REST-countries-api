export function filterCountries(countries, filter){
    //console.log(query);
    let result = {};
    if(filter[0] === "search"){
        result = countries.filter(country => country.name.toLowerCase().includes(filter[1].toLowerCase()));
    } else if(filter[0] === "region"){
        result = countries.filter(country => country.region.toLowerCase().includes(filter[1].toLowerCase()));
    }
    return result; 
      
}