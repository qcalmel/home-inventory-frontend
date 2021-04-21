import React, { useState, useEffect } from "react";
import LocationDataService from "../services/LocationService";
import { Link } from "react-router-dom";

const LocationsList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        retrieveLocations();
    }, []);

    const retrieveLocations = () => {
        LocationDataService.getAll()
            .then(response => {
                setLocations(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="col-md-6">
            <h4>Locations List</h4>

            <ul className="list-group">
                {locations &&
                locations.map((location, index) => (
                    <Link to={"/locations/"+location.id} key={index}>
                    <li>
                        {location.name}
                    </li>
                    </Link>
                ))}
            </ul>

            {/*<button*/}
            {/*    className="m-3 btn btn-sm btn-danger"*/}
            {/*    onClick={removeAllItems}*/}
            {/*>*/}
            {/*    Remove All*/}
            {/*</button>*/}
        </div>
    )
};

export default LocationsList;