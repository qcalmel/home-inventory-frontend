import LocationDataService from "../services/LocationService";
import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import "../styles/Location.css"
import useModal from "./useModal";
import Modal from "./Modal";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";

const Location = () => {
    const [location, setLocation] = useState({});
    const [children, setChildren] = useState([]);
    const [items, setItems] = useState([])
    const [history, setHistory] = useState([])
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
    const parentsLinks = async (parentId) => {
        let parents = []
        let count = 0
        while (parentId > 0) {
            await LocationDataService.get(parentId)
                .then(res => {
                    parents = [...parents, {id: res.data.id, name: res.data.name}];
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

    return <div>
        {history.length ?
            history.reverse().map((parent) => (
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
        <ul>
            {children.map((child) => (
                <Link to={"/locations/" + child.id} key={"child" + child.id}>
                    <li>{child.name}</li>
                </Link>
            ))}
        </ul>

        <ul>
            {items.map((item) => (
                <Link to={"/items/" + item.id} key={"item" + item.id}>
                    <li>{item.name}</li>
                </Link>
            ))}
        </ul>
        <div>
            <button className="modal-toggle" onClick={toggleAddItem}>
                Ajouter Objet
            </button>

            <Modal isShowing={isShowingAddItem} hide={toggleAddItem}>
                <AddItem/>
            </Modal>
        </div>
        <div>
            <button className="modal-toggle" onClick={toggleAddLocation}>
                Ajouter Emplacement
            </button>

            <Modal isShowing={isShowingAddLocation} hide={toggleAddLocation}>
                <AddLocation/>
            </Modal>
        </div>
    </div>
}

export default Location