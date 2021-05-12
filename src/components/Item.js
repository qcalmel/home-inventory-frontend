const Item = ({currentItem}) => {
    console.log(currentItem)


    return <div>
        {currentItem &&
        <div>
            <label>Nom : </label>
            <span>{currentItem.name}</span>
        </div>
        }
    </div>
}

export default Item