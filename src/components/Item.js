import {useParams} from "react-router-dom";
import ItemDataService from "../services/ItemService";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import("../styles/Item.css")


const Item = ({currentItem}) => {
    const [item, setItem] = useState()
    const {id} = useParams();
    const setCurrentItem = () => {
        id ?
        ItemDataService.get(id)
            .then(res => {
                setItem(res.data)
            })
            .catch(e => console.log(e))
            :
            setItem({name:"Home"})
    }
    useEffect(() => {
        console.log("useEffect of Item")
        if (item !== currentItem) {
            setItem(currentItem)
        }
        if (!currentItem) {
            setCurrentItem()
        }
    }, [currentItem])


    return <div className="SelectionItem">
        {item &&
        <>
            <div className="SelectionItem_container">
                <div className="SelectionItem_image">
                    <FontAwesomeIcon className="icon" icon={item.isLocation ? "box-open" : "file"}/>
                </div>
            </div>
            <div className="SelectionItem_details">
                <div>
                    <label>Nom : </label>
                    <span>{item.name}</span>
                </div>
                <div>
                    <label>Prix : </label>
                    <span>{item.price}</span>
                </div>
            </div>
        </>
        }
    </div>
}

export default Item