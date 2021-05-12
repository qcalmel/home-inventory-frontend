import {useParams} from "react-router-dom";
import ItemDataService from "../services/ItemService";
import {useEffect, useState} from "react";

const Item = ({currentItem}) => {
    const [item,setItem] = useState()
    const {id} = useParams();
    const setCurrentItem = () => {
        ItemDataService.get(id)
            .then(res =>{
                setItem(res.data)
            })
            .catch(e=>console.log(e))
    }
    useEffect(()=>{
        if(item !== currentItem){
            setItem(currentItem)
        }
        if (!currentItem) {
            setCurrentItem()
        }
    },[currentItem])


    return <div>
        <div>
            <label>Nom : </label>
            <span>{item ? item.name : ""}</span>
        </div>
    </div>
}

export default Item