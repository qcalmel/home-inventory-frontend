import React, { useState, useEffect } from "react";
import ItemDataService from "../services/ItemService";
import { Link } from "react-router-dom";

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveItems();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveItems = () => {
        ItemDataService.getAll()
            .then(response => {
                setItems(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveItems();
        setCurrentItem(null);
        setCurrentIndex(-1);
    };

    const setActiveItem = (item, index) => {
        setCurrentItem(item);
        setCurrentIndex(index);
    };

    const removeAllItems = () => {
        ItemDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeItem = (id) => {
        ItemDataService.remove(id)
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        ItemDataService.findByTitle(searchTitle)
            .then(response => {
                setItems(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Items List</h4>

                <ul className="list-group">
                    {items &&
                    items.map((item, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveItem(item, index)}
                            key={index}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllItems}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentItem ? (
                    <div>
                        <h4>Objet</h4>
                        <div>
                            <label>
                                <strong>Nom:</strong>
                            </label>{" "}
                            {currentItem.name}
                        </div>
                        <div>
                            <label>
                                <strong>Prix:</strong>
                            </label>{" "}
                            {currentItem.price}
                        </div>

                        <Link
                            to={"/items/" + currentItem.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={() => removeItem(currentItem.id)}
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Item...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsList;