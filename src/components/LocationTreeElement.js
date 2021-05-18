import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LocationDataService from "../services/LocationService"
import ItemDataService from "../services/ItemService";
import {useEffect, useState} from "react";

const LocationTreeElement = ({id}) => {
    const [isShowingChildren, setIsShowingChildren] = useState(false)
    const [children, setChildren] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState({})
    const toggleChildren = () => {
        console.log('test')
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
            <li>
                <span onClick={toggleChildren}>
                    <FontAwesomeIcon
                        size={"xs"}
                        icon={isLoading ? "spinner" : isShowingChildren ? "chevron-down" : "chevron-right"}
                        spin={isLoading}
                    /></span> {location.name}

            </li>
            {
                isShowingChildren &&
                children.map((location) => (
                    <LocationTreeElement id={location.id}/>
                ))

            }
        </ul>
    )
}

export default LocationTreeElement