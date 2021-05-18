import LocationDataService from "../services/LocationService"
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LocationTreeElement from "./LocationTreeElement";
import "../styles/LocationTree.css"

const LocationTree = () => {
    const [locations, setLocations] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const getRootLocations = async () => {
            setIsLoading(true)
            await LocationDataService.getRootLocations()
                .then((res) => {
                    setLocations(res.data)
                    console.log(locations)
                })
                .catch((err) => {
                    console.log(err)
                })
                setIsLoading(false)
        }
        getRootLocations()
    }, [])

    const renderElement = () => {
        if(isLoading){
            return <h1>Loading...</h1>
        }
        return (
            <ul className="list-location">
                {isLoading ?
                    <span>Loading...</span>
                    :
                    locations.map((location, index) => (
                        <LocationTreeElement id={location.id}/>
                    ))}
            </ul>
        )
    }

    return (
        <>
            {renderElement()}
        </>

    )
}

export default LocationTree