import React, {useEffect, useState} from "react";
import ItemDataService from "../services/ItemService";
import {useParams} from "react-router-dom";
import LocationTree from "./LocationTree";
import "../styles/AddItem.css"
import useModal from "./useModal";
import Modal from "./Modal";
import moment from "moment";

const AddItem = ({onSuccess, itemId}) => {
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
    const [location, setLocation] = useState()

    const [isShowingLocationTree, toggleLocationTree] = useModal();

    useEffect(() => {
        const retrieveItem = () => {
            ItemDataService.get(itemId)
                .then(res => setItem(res.data))
                .catch(err=> console.log(err))
        };
        retrieveItem()
    }, [itemId]);

    useEffect(() => {
        retrieveLocation(item.locationId);
    }, [item.locationId]);


    const retrieveLocation = (id) => {
        ItemDataService.get(id)
            .then((res) => {
                setLocation(res.data)
            })
            .catch(err => console.log(err))
    }
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

        ItemDataService.create(data)
            .then(response => {
                // setItem({
                //     id: response.data.id,
                //     name: response.data.name,
                //     price: response.data.price,
                //     acquisitionDate : response.data.acquisitionDate
                // });
                setSubmitted(true);
                onSuccess()

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateItem = () => {
        let data = {}
        for (const propName in item) {
            if (item[propName] !== null && item[propName] !== '') {
                data[propName] = item[propName];
            }
        }
        ItemDataService.update(item.id, data)
            .then(res => {
                setSubmitted(true);
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    const newItem = () => {
        setItem(initialItemState);
        setSubmitted(false);
    };
    const handleLocationChange = (id) => {
        setItem({...item, locationId: id})
    }
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
                            value={moment(item.acquisitionDate).format('YYYY-MM-DD')}
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

                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="location">Emplacement</label>*/}
                    {/*    <select*/}
                    {/*        className="form-control"*/}
                    {/*        id="location"*/}
                    {/*        value={item.locationId}*/}
                    {/*        onChange={handleInputChange}*/}
                    {/*        name="locationId"*/}
                    {/*    >*/}
                    {/*        <option >Aucun</option>*/}
                    {/*        {locations.map(({name,id})=>(*/}
                    {/*            <option key={"location"+id} value={id}>{name}</option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="location">Emplacement</label>
                        <input type="text" value={location ? location.name : ""} onClick={toggleLocationTree}/>
                        <Modal isShowing={isShowingLocationTree} hide={toggleLocationTree}
                               title="Sélectionnez un emplacement">
                            <LocationTree onSelect={(id) => handleLocationChange(id)} itemLocation={item.locationId}
                                          hide={toggleLocationTree}/>
                        </Modal>
                        {/*<div className="location-tree-container">*/}
                        {/*    */}
                        {/*</div>*/}
                    </div>
                    <button onClick={itemId ? updateItem : saveItem} className="btn btn-success">
                        {itemId?
                            "Modifier"
                            :
                            "Ajouter"
                        }
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddItem;