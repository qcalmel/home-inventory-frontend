import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LocationDataService from "../services/LocationService"
import ItemDataService from "../services/ItemService";
import {useEffect, useState} from "react";

const LocationTreeElement = ({id, onSelect,selectedLocation}) => {
    const [isShowingChildren, setIsShowingChildren] = useState(false)
    const [children, setChildren] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState({})
    const toggleChildren = () => {
        setIsShowingChildren(!isShowingChildren)
    }
    useEffect(() => {
        const getLocation = (id) => {
            ItemDataService.get(id)
                .then((res) => {
                    setLocation(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getLocation(id)
    }, [])

    useEffect(() => {
        const getChildren = async (id) => {
            setIsLoading(true)
            await LocationDataService.getAllChildren(id)
                .then((res) => {
                    setChildren(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            setIsLoading(false)
        }

        isShowingChildren && getChildren(id)
    }, [isShowingChildren])

    return (
        <ul key={location.id} className="list-location">
            <li className={selectedLocation === location.id ? " active" : ""}>
                <span onClick={toggleChildren}>
                    <FontAwesomeIcon
                        size={"xs"}
                        icon={isLoading ? "spinner" : isShowingChildren ? "chevron-down" : "chevron-right"}
                        spin={isLoading}
                    /></span> <span onClick={()=>onSelect(location.id)}>{location.name}</span>

            </li>
            {
                isShowingChildren &&
                children.map((location) => (
                    <LocationTreeElement id={location.id} selectedLocation={selectedLocation} onSelect={onSelect}/>
                ))

            }
        </ul>
    )
}

export default LocationTreeElement