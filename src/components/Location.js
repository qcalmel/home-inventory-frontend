import LocationDataService from "../services/LocationService";
import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import useModal from "./useModal";
import Modal from "./Modal";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";
import Items from "./Items";
import Item from "./Item";

import "../styles/Location.css"


const Location = () => {
    const [location, setLocation] = useState({});
    const [children, setChildren] = useState([]);
    const [items, setItems] = useState([])
    const [history, setHistory] = useState([])
    const [currentItem, setCurrentItem] = useState(null);
    console.log(currentItem)
    const {id} = useParams();

    const [isShowingAddItem, toggleAddItem] = useModal();
    const [isShowingAddLocation, toggleAddLocation] = useModal();

    useEffect(() => {
        refreshData()
    }, [id])

    const refreshData = () => {
        retrieveLocation()
        retrieveChildren()
        retrieveItems()
    }
    const setActiveItem = (item) => {
        setCurrentItem(item);
    };

    const parentsLinks = async (parentId) => {
        let parents = []
        let count = 0
        while (parentId > 0) {
            await LocationDataService.get(parentId)
                .then(res => {
                    parents = [{id: res.data.id, name: res.data.name}, ...parents];
                    parentId = res.data.parentId
                })
                .catch(e => console.log(e))
            count++
            if (count > 10) break
        }
        return parents
    }

    const retrieveLocation = () => {
        LocationDataService.get(id)
            .then(res => {
                setLocation(res.data)
                setHistory([])
                parentsLinks(res.data.parentId)
                    .then(res => setHistory(res))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e));
    }

    const retrieveChildren = () => {
        LocationDataService.getAllChildren(id)
            .then(res => {
                setChildren(res.data)
            })
            .catch(e => console.log(e));
    }

    const retrieveItems = () => {
        LocationDataService.getAllItems(id)
            .then(res => {
                setItems(res.data)
            })
            .catch(e => console.log(e));
    }

    return <div >
        {/*<div style={{overflowY: "scroll", height: "100vh"}}>*/}
        {history.length ?
            history.map((parent) => (
                <Link to={"/locations/" + parent.id} key={"parent" + parent.id}>
                    <span>{parent.name}{">"}</span>
                </Link>
            ))
            :
            <Link to={"/locations/"}>
                <span>Retour{">"}</span>
            </Link>
        }

        <span>{location.name}</span>
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