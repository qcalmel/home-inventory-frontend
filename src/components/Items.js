import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/Items.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ItemActionMenu from "./ItemActionMenu";

const Items = ({items, activeItem}) => {
    const [itemContainerWidth, setItemContainerWidth] = useState(0)
    const [selectedItem, setSelectedItems] = useState([])
    let history = useHistory()

    const redirect = (item) => {
        history.push((item.isLocation ? "/locations/" : "/items/") + item.id)
    }

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
    const deselect = (event) => {
        const items = [...event.currentTarget.getElementsByClassName('location-item')]
        items.forEach((item) => {
            item.getElementsByClassName('item-select-checkbox')[0].checked = false
            item.getElementsByClassName('item-select')[0].classList.remove('selected')

        })
        setSelectedItems([])
        activeItem(event, null)
    }
    const handleSelect = (event) => {
        let itemContainerSelector = ""
        if(event.currentTarget.classList[0] === "item-select"){
            itemContainerSelector = event.currentTarget.parentNode
        }else{
            itemContainerSelector = event.currentTarget.parentNode.parentNode
        }
        const checkbox = itemContainerSelector.querySelector('.item-select-checkbox')
        const locationId = itemContainerSelector.getAttribute("locationid")
        if (checkbox.checked) {
            setSelectedItems([...selectedItem, locationId])
            itemContainerSelector.querySelector('.item-select').classList.add("selected")
            console.log(itemContainerSelector.querySelector('.item-select'))
        } else {
            const index = selectedItem.indexOf(locationId)
            if (index >= 0) {
                const updatedSelectedItems = [...selectedItem]
                updatedSelectedItems.splice(index, 1)
                setSelectedItems(updatedSelectedItems)
            }
            itemContainerSelector.querySelector('.item-select').classList.remove("selected")
        }

    }
    return (
        <div className="location-items-container" onClick={(e) => deselect(e)}>
            {items.map((item) => (
                <div onClick={(event) => {
                    event.stopPropagation()
                    // activeItem(event, item)
                }}
                     onDoubleClick={() => {
                         redirect(item)
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
                    <div className="item-select" onClick={(event)=>{
                         activeItem(event, item)
                        handleSelect(event)
                    }}>
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