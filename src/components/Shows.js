import React from 'react';
import shows from '../static/data.json'

const Shows = (props) => {
    let rows = []
    let index = 0
    let carIndex = 0
    shows.forEach(show => {
        rows.push(<p className='level1' key={'show'+index}>Name: {show.name}</p>);
        if (show.cars) {
            show.cars.forEach(car => {
                rows.push(<p className='level2' key={'car'+carIndex}>Car: {car.make}, {car.model}</p>);
                carIndex++
            })
        }
        index++
    })
    return (
        <div className="shows">
            <h2>Shows</h2>
            {rows}
        </div>
    );
}

export default Shows;
