import {useEffect, useState} from "react";

import LocationDataService from "../services/LocationService"

const AddLocation = () => {
    const initialLocationState = {
        id: null,
        name: "",
        parentId: ""
    }


    const [location, setLocation] = useState(initialLocationState);
    const [submitted, setSubmitted] = useState(false)
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

    const handleInputChange = event => {
        const {name, value,} = event.target;
        setLocation({...location, [name]: value});
    };

    const saveLocation = () => {
        let data = {};
        for (const propName in location) {
            if (location[propName] !== null && location[propName] !== '') {
                data[propName] = location[propName]
            }
        }
        LocationDataService.create(data)
            .then(res => {
                setSubmitted(true)
            })
            .catch(e => {
                console.log(e)
            });
    };

    const newLocation = () => {
        setLocation(initialLocationState)
        setSubmitted(false);
    };
    return (
        <div>
            {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newLocation}>
                            Add
                        </button>
                    </div>
                ) :
                (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={location.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Emplacement</label>
                            <select
                                className="form-control"
                                id="location"
                                value={location.parentId}
                                onChange={handleInputChange}
                                name="parentId"
                            >
                                <option>Aucun</option>
                                {locations.map(({name, id}) => (
                                    <option key={"location" + id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={saveLocation} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )
            }
        </div>
    )
};

export default AddLocation;