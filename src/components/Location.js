import LocationDataService from "../services/LocationService";
import {Link, useParams} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import useModal from "./useModal";
import Modal from "./Modal";
import AddItem from "./AddItem";
import AddLocation from "./AddLocation";
import Items from "./Items";


const Location = () => {
    const [location, setLocation] = useState({});
    const [children, setChildren] = useState([]);
    const [items, setItems] = useState([])
    const [history, setHistory] = useState([])
    const {id} = useParams();
    console.log(history)
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
                    parents = [ {id: res.data.id, name: res.data.name},...parents];
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

    return <div style={{overflowY: "scroll", height: "100vh"}}>
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
        <Items locations={children} items={items}/>
        {/*<div className="location-content">*/}
        {/*    {children.map((child) => (*/}
        {/*        <Link className="location-item" to={"/locations/" + child.id} key={"child" + child.id}>*/}
        {/*            <div>{child.name}</div>*/}
        {/*        </Link>*/}
        {/*    ))}*/}
        {/*    {items.map((item) => (*/}
        {/*        <Link className="location-item" to={"/items/" + item.id} key={"item" + item.id}>*/}
        {/*            /!*<li>{item.name}</li>*!/*/}
        {/*            <div>{item.name}</div>*/}
        {/*        </Link>*/}
        {/*    ))}*/}
        {/*</div>*/}
    </div>
}

export default Location