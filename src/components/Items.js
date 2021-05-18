import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/Items.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ItemActionMenu from "./ItemActionMenu";

const Items = ({items, activeItem, location}) => {
    const [itemContainerWidth, setItemContainerWidth] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    let history = useHistory()
    const redirect = (item) => {
        deselectItems()
        history.push((item.isLocation ? "/locations/" : "/items/") + item.id)
    }

    useEffect(() => {
        updateItemColumn()
        window.addEventListener("resize", updateItemColumn)
        return () => window.removeEventListener("resize", updateItemColumn)
    }, [])
    useEffect(()=>{
        deselectItems()
    },[location])

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
    const deselectItems = () => {
        let items = []
        selectedItems.forEach((id) => {
            items.push(document.querySelector(`.location-item[locationid="${id}"]`))
        })
        items.forEach((item) => {
            item.getElementsByClassName('item-select-checkbox')[0].checked = false
            item.getElementsByClassName('item-select')[0].classList.remove('selected')

        })
        setSelectedItems([])
    }
    const handleDeselect = (event) => {
        deselectItems()
        activeItem(event, location)
    }
    const handleSelect = (event,item) => {
        let itemContainerSelector = ""
        if (event.currentTarget.classList[0] === "item-select") {
            deselectItems()
            activeItem(event, item)
            itemContainerSelector = event.currentTarget.parentNode
        } else {
            itemContainerSelector = event.currentTarget.parentNode.parentNode
        }
        const checkbox = itemContainerSelector.querySelector('.item-select-checkbox')
        const locationId = itemContainerSelector.getAttribute("locationid")
        if (checkbox.checked) {
            setSelectedItems((selectedItems) => ([...selectedItems, locationId]))
            itemContainerSelector.querySelector('.item-select').classList.add("selected")
        } else if (event.currentTarget.classList[0] !== "item-select") {
            const index = selectedItems.indexOf(locationId)
            if (index >= 0) {
                const updatedSelectedItems = [...selectedItems]
                updatedSelectedItems.splice(index, 1)
                setSelectedItems(updatedSelectedItems)
            }
            itemContainerSelector.querySelector('.item-select').classList.remove("selected")
        }

    }
    return (
        <div className="location-items-container" onClick={(e) => handleDeselect(e)}>
            {items.map((item) => (
                <div onClick={(event) => {
                    event.stopPropagation()
                    // activeItem(event, item)
                }}

                     locationid={item.id}
                     className="location-item"
                     key={"item" + item.id}
                >
                    <div className="item-select-checkbox-container">
                        <input onChange={(e) => handleSelect(e)} className="item-select-checkbox" type="checkbox"/>
                    </div>
                    <div className="item-action-button-container">
                        <div className="item-action-button">
                            <ItemActionMenu itemId={item.id}/>
                        </div>
                    </div>
                    <div className="item-select" onClick={(event) => {

                        handleSelect(event,item)

                    }}
                         onDoubleClick={() => {
                             redirect(item)
                         }}
                        >
                        <div className="item-icon">
                            {/*<img alt="item-icon" src={item.isLocation ? boxOpenSvg :fileSvg}/>*/}
                            <FontAwesomeIcon className="icon" icon={item.isLocation ? "box-open" : "file"}/>
                        </div>

                        <div className="item-title">{item.name}</div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default Items