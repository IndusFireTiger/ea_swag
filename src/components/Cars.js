import React from 'react';
import shows from '../static/data.json' // read a local json file instead of API

const Cars = (props) => { 
  let displayCars = []
  const getModelDetails = (brand, name) => {
    for (let i = 0; i < brand.models.length; i++) {
      if (brand["models"][i].name === name) {
        return brand["models"][i]
      }
    }
  }

  const getbrandDetails = (brands, name) => {
    for (let i = 0; i < brands.length; i++) {
      if (brands[i].make === name) {
        return brands[i]
      }
    }
    return null
  }
  
  const createBrands = (cars) => {
    let brands = []
    cars.forEach(car => {
      let name = car.make
      let brandDetails = getbrandDetails(brands, name)
      let brand = {}
      if (!brandDetails) {
        brand.make = name
        brand.models = [{ name: car.model, shows: [car.show] }]
        brands.push(brand)
      } else {
        let modelDetails = getModelDetails(brandDetails, car.model)
        if (!modelDetails) {
          let model = { name: car.model, shows: [car.show] }
          brandDetails.models.push(model)
        } else {
          modelDetails.shows.push(car.show)
        }
      }
    })
    return brands
  }

  const getCarsFromShows = () => {
    let cars = []
    shows.forEach(show => {
      for (let i = 0; i < show.cars.length; i++) {
        let car = {
          make: show.cars[i].make,
          model: show.cars[i].model,
          show: show.name
        }
        cars.push(car)
      }
    })
    let brands = createBrands(cars)
    brands.sort((a, b) => {
      if (a.make < b.make) { return -1; }
      if (a.make > b.make) { return 1; }
      return 0;
    })
    return brands
  }

  function makeCarDisplayList() {
    let cars = getCarsFromShows()
    let displayCars = []
    let makeIdx = 0
    let modelIdx = 0
    let showIdx = 0
    cars.forEach(car => {
      displayCars.push(<p className ='level1' key={'make'+makeIdx}>Make: {car.make}</p>);
      car.models.forEach(model => {
        displayCars.push(<p className ='level2' key={'model'+modelIdx}>model: {model.name}</p>);
        modelIdx++
        model.shows.forEach(show => {
          displayCars.push(<p className ='level3' key={'show'+showIdx}>show: {show}</p>);
          showIdx++
        })
      })
      makeIdx++
    })
    return displayCars
  }
  function fetchData() {
    let url =
      "http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars"
    let options = {
      method: "GET",
      // mode: "no-cors", // setting no-cors header results in an opaque response in which the data is not readable
      headers: {
        "Content-Type": "text/plain"
      }
    }
    fetch(url, options)
      .then(response => {
        console.log(response) 
        // shows = response.json() // ideally response from the API to populate the shows here
        // instead read a local json file
      })
      .catch(function(error) {
        console.log(error)
        // logs the following error
        /* -------------------------------------------------------------------------------------
        Access to fetch at 'http://eacodingtest.digital.energyaustralia.com.au/api/v1/cars' 
        from origin 'http://localhost:3000' has been blocked by CORS policy: 
        No 'Access-Control-Allow-Origin' header is present on the requested resource. 
        If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch 
        the resource with CORS disabled.       
        -------------------------------------------------------------------------------------*/
      })
  }
  // fetchData()  // requests swagger API to get the data to display
  displayCars = makeCarDisplayList() 
  return (
    <div className = "cars">
      <h2>Cars</h2>
      {displayCars}
    </div>
  );
}

export default Cars;
