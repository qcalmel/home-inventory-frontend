import LocationDataService from "../services/LocationService";
import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import useModal from "./useModal";
import Modal from "./Modal";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";
import Items from "./Items";
import Item from "./Item";
import ItemDataService from "../services/ItemService";
import "../styles/Location.css"
import PathNavigation from "./PathNavigation";


const Location = () => {
    const defaultLocation = {name:"Home"}
    const [location, setLocation] = useState(defaultLocation);
    const [items, setItems] = useState([])
    const [path, setPath] = useState([])
    const [currentItem, setCurrentItem] = useState(null);
    const {id} = useParams();

    console.log(currentItem)
    const [isShowingAddItem, toggleAddItem] = useModal();
    const [isShowingAddLocation, toggleAddLocation] = useModal();

    useEffect(() => {
        refreshData()
        console.log(currentItem)
    }, [id])
    console.log(location)
    const refreshData = () => {
        retrieveLocation()
        retrieveItems()
    }
    const setActiveItem = (event, item) => {
        setCurrentItem(item);
        if (item.id && item.id != id) {
            console.log(item.id)
            console.log(id)
            const checked = event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked
            event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked = !checked
        }


    };
    const parentsLinks = async (parentId) => {
        let parents = []
        let count = 0
        while (parentId > 0) {
            await ItemDataService.get(parentId)
                .then(res => {
                    parents = [{id: res.data.id, name: res.data.name}, ...parents];
                    parentId = res.data.locationId
                })
                .catch(e => console.log(e))
            count++
            if (count > 10) break
        }
        return parents
    }

    const retrieveLocation = () => {
        id ?
            ItemDataService.get(id)
                .then(res => {
                    setLocation(res.data)
                    setCurrentItem(res.data)
                    setPath([])
                    parentsLinks(res.data.locationId)
                        .then(res => setPath(res))
                        .catch(e => console.log(e))
                })
                .catch(e => console.log(e))
            :
            setLocation(defaultLocation)
        setCurrentItem(defaultLocation)
        setPath([])
        ;
    }

    const retrieveItems = () => {
        id ?
            LocationDataService.getAllItems(id)
                .then(res => {
                    setItems(res.data)
                })
                .catch(e => console.log(e))
            :
            LocationDataService.getRootLocations()
                .then(res => {
                    setItems(res.data)
                })
                .catch(e => console.log(e))
        ;
    }
    return <div>
        <PathNavigation currentLocation={location} parentLocations={path}/>
        <div>
            <button className="modal-toggle" onClick={toggleAddItem}>
                Ajouter Objet
            </button>

            <Modal isShowing={isShowingAddItem} hide={toggleAddItem}>
                <AddItem onSuccess={() => retrieveItems()}/>
            </Modal>
            <button className="modal-toggle" onClick={toggleAddLocation}>
                Ajouter Emplacement
            </button>

            <Modal isShowing={isShowingAddLocation} hide={toggleAddLocation}>
                <AddLocation/>
            </Modal>
        </div>
        <div className="grid-container">
            <div className="content">
                <Items items={items} activeItem={setActiveItem} location={location}/>
            </div>
            <div className="sidebar">
                <Item currentItem={currentItem}/>
            </div>
        </div>
    </div>
}

export default Location