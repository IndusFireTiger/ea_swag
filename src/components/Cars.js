import React from 'react';
import shows from '../static/data.json'

const Cars = (props) => {
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

  const processList = () => {
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
    brands.sort((a, b) => {
      if (a.make < b.make) { return -1; }
      if (a.make > b.make) { return 1; }
      return 0;
    })
    return brands
  }
  let cars = processList()
  let rows = []
  let makeIdx = 0
  let modelIdx = 0
  let showIdx = 0
  cars.forEach(car => {
    rows.push(<p className ='level1' key={'make'+makeIdx}>Make: {car.make}</p>);
    car.models.forEach(model => {
      rows.push(<p className ='level2' key={'model'+modelIdx}>model: {model.name}</p>);
      modelIdx++
      model.shows.forEach(show => {
        rows.push(<p className ='level3' key={'show'+showIdx}>show: {show}</p>);
        showIdx++
      })
    })
    makeIdx++
  })
  return (
    <div className = "cars">
      <h2>Cars</h2>
      {rows}
    </div>
  );
}

export default Cars;
