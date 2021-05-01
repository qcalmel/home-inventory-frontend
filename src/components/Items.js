import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/Items.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import boxOpenSvg from "../assets/icons/box-open-solid.svg"
import fileSvg from "../assets/icons/file-solid.svg"
import ItemActionMenu from "./ItemActionMenu";

const Items = ({locations, items}) => {
    const [itemContainerWidth, setItemContainerWidth] = useState(0)

    useEffect(() => {
        updateItemColumn()
        window.addEventListener("resize", updateItemColumn)
        return () => window.removeEventListener("resize", updateItemColumn)
    }, [])

    useEffect(() => {
        updateItemColumn()
    }, [itemContainerWidth])

    const updateItemColumn = () => {
        const itemContainer = document.getElementsByClassName("location-items-container")[0]
        const newWidth = itemContainer.getBoundingClientRect().width
        setItemContainerWidth(newWidth)
        const newColumn = Math.ceil(itemContainerWidth / 180)
        itemContainer.style.gridTemplateColumns = `repeat(${newColumn},1fr)`
    }
    let selectedItem = []
    const handleSelect = (event) => {
        const itemContainerSelector = event.target.parentNode.parentNode
        const locationId = itemContainerSelector.getAttribute("locationid")
        if (event.target.checked) {
            selectedItem = [...selectedItem, locationId]
            itemContainerSelector.querySelector('.item-select').classList.add("selected")
            console.log(itemContainerSelector.querySelector('.item-select'))
        } else {
            const index = selectedItem.indexOf(locationId)
            if (index >= 0) {
                selectedItem.splice(index, 1)
            }
            itemContainerSelector.querySelector('.item-select').classList.remove("selected")
        }
        console.log(selectedItem)
    }

    return (
        <div className="location-items-container">
            {locations.map((location) => (

                <div locationid={location.id} className="location-item" key={"child" + location.id}>
                    <div className="item-select-checkbox-container">
                        <input onChange={(e) => handleSelect(e)} className="item-select-checkbox" type="checkbox"/>
                    </div>
                    <div className="item-action-button-container">
                        <div className="item-action-button">
                            <ItemActionMenu itemId={location.id}/>
                        </div>
                    </div>
                    <Link to={"/locations/" + location.id}>
                    <div className="item-select">
                        <div className="item-icon">
                            <img alt="box-open" src={boxOpenSvg}/>
                        </div>

                        <div className="item-title">{location.name}</div>
                    </div>
                    </Link>
                </div>

            ))}
            {items.map((item) => (
                // <Link className="location-item" to={"/items/" + item.id} key={"item" + item.id}>
                //     {/*<li>{item.name}</li>*/}
                //     <div>{item.name}</div>
                // </Link>
                <div locationid={item.id} className="location-item" key={"item" + item.id}>
                    <div className="item-select-checkbox-container">
                        <input onChange={(e) => handleSelect(e)} className="item-select-checkbox" type="checkbox"/>
                    </div>
                    <div className="item-action-button-container">
                        <div className="item-action-button">
                            <ItemActionMenu itemId={item.id}/>
                        </div>
                    </div>
                    <Link to={"/items/" + item.id}>
                        <div className="item-select">
                            <div className="item-icon">
                                <img alt="item-icon" src={fileSvg}/>
                            </div>

                            <div className="item-title">{item.name}</div>

                        </div>
                    </Link>

                </div>
            ))}
        </div>
    )
}

export default Items