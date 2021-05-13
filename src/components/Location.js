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
    const [location, setLocation] = useState({});
    const [children, setChildren] = useState([]);
    const [items, setItems] = useState([])
    const [path, setPath] = useState([])
    const [currentItem, setCurrentItem] = useState(null);
    // console.log(currentItem)
    const {id} = useParams();


    const [isShowingAddItem, toggleAddItem] = useModal();
    const [isShowingAddLocation, toggleAddLocation] = useModal();

    useEffect(() => {
        refreshData()
    }, [id])

    const refreshData = () => {
        retrieveLocation()
        // retrieveChildren()
        retrieveItems()
    }
    const setActiveItem = (event, item) => {
        setCurrentItem(item);
        const checked = event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked
        event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked = !checked


    };
    const parentsLinks = async (parentId) => {
        let parents = []
        let count = 0
        console.log(parentId)
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
        ItemDataService.get(id)
            .then(res => {
                console.log(res.data)
                setLocation(res.data)
                setPath([])
                parentsLinks(res.data.locationId)
                    .then(res => setPath(res))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e));
    }

    // const retrieveChildren = () => {
    //     LocationDataService.getAllChildren(id)
    //         .then(res => {
    //             setChildren(res.data)
    //         })
    //         .catch(e => console.log(e));
    // }

    const retrieveItems = () => {
        LocationDataService.getAllItems(id)
            .then(res => {
                setItems(res.data)
            })
            .catch(e => console.log(e));
    }
    console.log(path)
    return <div>
        {/*< Link to="/locations/">*/}
        {/*    <span>Home</span>*/}
        {/*</Link>*/}
        {/*/!*<div style={{overflowY: "scroll", height: "100vh"}}>*!/*/}
        {/*{*/}
        {/*    path.map((location) => (*/}
        {/*        <Link to={"/locations/" + location.id} key={"parent" + location.id}>*/}
        {/*            <span> {">"}{location.name}</span>*/}
        {/*        </Link>*/}
        {/*    ))*/}
        {/*}*/}
        
        {/*<span>{">"}{location.name}</span>*/}
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
                <Items locations={children} items={items} activeItem={setActiveItem}/>
            </div>
            <div className="sidebar">
                <Item currentItem={currentItem}/>
            </div>
        </div>
    </div>
}

export default Location