import React, {useEffect, useState} from "react";
import ItemDataService from "../services/ItemService";
import LocationDataService from "../services/LocationService";
import {useParams} from "react-router-dom";

const AddItem = () => {
    const {id} = useParams();
    const initialItemState = {
        id: null,
        name: "",
        price: "",
        acquisitionDate: "",
        isLocation: false,
        locationId: id || ""
    };
    const [item, setItem] = useState(initialItemState);
    const [submitted, setSubmitted] = useState(false);
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
        setItem({...item, [name]: value});
    };
    console.log(item)

    const saveItem = () => {
        let data = {};
        for (const propName in item) {
            if (item[propName] !== null && item[propName] !== '') {
                data[propName] = item[propName];
            }
        }
        if(item.isLocation){
            data["location"] = {name:item.name}
        }
        ItemDataService.create(data)
            .then(response => {
                // setItem({
                //     id: response.data.id,
                //     name: response.data.name,
                //     price: response.data.price,
                //     acquisitionDate : response.data.acquisitionDate
                // });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newItem = () => {
        setItem(initialItemState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newItem}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={item.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Prix</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            required
                            value={item.price}
                            onChange={handleInputChange}
                            name="price"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="acquisitionDate">Date d'acquisition</label>
                        <input
                            type="date"
                            className="form-control"
                            id="acquisitionDate"
                            required
                            value={item.acquisitionDate}
                            onChange={handleInputChange}
                            name="acquisitionDate"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isLocation">L'objet est un emplacement</label>
                        <input
                            type="checkbox"
                            className="form-control"
                            id="isLocation"
                            required
                            checked={item.isLocation}
                            onChange={(e) => {
                                handleInputChange({
                                    target: {
                                        name: e.target.name,
                                        value: e.target.checked
                                    }
                                })
                            }}
                            name="isLocation"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Emplacement</label>
                        <select
                            className="form-control"
                            id="location"
                            value={item.locationId}
                            onChange={handleInputChange}
                            name="locationId"
                        >
                            <option >Aucun</option>
                            {locations.map(({name,id})=>(
                                <option key={"location"+id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={saveItem} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddItem;