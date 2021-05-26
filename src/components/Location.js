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
import SearchBar from "./SearchBar";
import LocationContent from "./LocationContent";


const Location = () => {
    const defaultLocation = {name: "Home"}
    const [location, setLocation] = useState(defaultLocation);
    const [path, setPath] = useState([])
    const {id} = useParams();



    useEffect(() => {
        refreshData()
    }, [id])
    const refreshData = () => {
        retrieveLocation()
        // retrieveItems()
    }

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
                    // setCurrentItem(res.data)
                    setPath([])
                    parentsLinks(res.data.locationId)
                        .then(res => setPath(res))
                        .catch(e => console.log(e))
                })
                .catch(e => console.log(e))
            :
            setLocation(defaultLocation)
        // setCurrentItem(defaultLocation)
        setPath([])
        ;
    }


    return (
        <div>
            <PathNavigation currentLocation={location} parentLocations={path}/>
            <SearchBar/>
            <LocationContent location={location}/>
        </div>
    )
}

export default Location