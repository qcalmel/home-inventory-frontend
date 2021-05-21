import LocationDataService from "../services/LocationService"
import ItemDataService from "../services/ItemService";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LocationTreeElement from "./LocationTreeElement";
import "../styles/LocationTree.css"
import {logDOM} from "@testing-library/react";

const LocationTree = ({onSelect, itemLocation, hide}) => {
    const [locations, setLocations] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState(itemLocation || null)

    useEffect(async () => {
        const getRootLocations = async () => {
            setIsLoading(true)
            await LocationDataService.getRootLocations()
                .then((res) => {
                    setLocations(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            setIsLoading(false)
        }
        await getRootLocations()
        const parents = await getParentsOfSelectedLocation(itemLocation)
        console.log(parents)
    }, [])

    const getParentsOfSelectedLocation = async (id) => {
        if (id) {
            console.log(id)
            let parents = []
            const getParentId = id => ItemDataService.get(id).then(res => (res.data.locationId)).catch(err=>console.log(err))
            let parentId = await getParentId(id)
            console.log(parentId)
            while(parentId>0){
                parents = [parentId,...parents]
                parentId = await getParentId(parentId)
            }
            console.log(parents)
            return parents
        }
    }
    const handleSubmit = (id) => {
        hide()
        onSelect(selectedLocation)
    }

    const handleSelect = (id) => {
        setSelectedLocation(id)
    }

    const renderElement = () => {
        if (isLoading) {
            return <h1>Loading...</h1>
        }
        return (
            <ul className="list-location">
                {isLoading ?
                    <span>Loading...</span>
                    :
                    locations.map((location, index) => (
                        <LocationTreeElement id={location.id} onSelect={(id) => {
                            handleSelect(id)
                        }} itemLocation={itemLocation} selectedLocation={selectedLocation}/>
                    ))}
            </ul>
        )
    }

    return (
        <>
            {renderElement()}
            <button onClick={hide}>Annuler</button>
            <button onClick={() => handleSubmit(selectedLocation)}>Valider</button>
        </>

    )
}

export default LocationTree