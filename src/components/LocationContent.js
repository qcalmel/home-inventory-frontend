import Modal from "./Modal";
import AddItem from "./AddItem";
import Items from "./Items";
import Item from "./Item";
import LocationDataService from "../services/LocationService";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useModal from "./useModal";

const LocationContent = ({location}) => {
    const [items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState(null);
    const {id} = useParams();
    const [isShowingAddItem, toggleAddItem] = useModal();

    useEffect(()=>{
        retrieveItems()
        setCurrentItem(location)
    },[id])

    const setActiveItem = (event, item) => {
        setCurrentItem(item);
        if (item.id && item.id != id) {
            const checked = event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked
            event.currentTarget.parentNode.getElementsByClassName('item-select-checkbox')[0].checked = !checked
        }
    };
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
    return (
        <div>
            <div>
                <button className="modal-toggle" onClick={toggleAddItem}>
                    Ajouter Objet
                </button>

                <Modal isShowing={isShowingAddItem} hide={toggleAddItem} title="Ajouter un nouvel objet">
                    <AddItem onSuccess={() => retrieveItems()}/>
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
    )
}

export default LocationContent