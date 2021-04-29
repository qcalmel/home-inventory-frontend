import React, {useEffect, useState} from "react";
import {Switch, Route, Link, NavLink, useLocation} from "react-router-dom";
import './App.css';
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Location from "./components/Location"
import LocationsList from "./components/LocationList";
import AddLocation from "./components/AddLocation";

function App() {
    const [navToggle, setNavToggle] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setNavToggle(false)
    }, [location])
    return (
        <div>
            <div className="menu">
                <input type="checkbox" checked={navToggle} onClick={(e) => setNavToggle(!navToggle)}
                       className="nav-toggle"/>
                <div className="overlay"></div>
                <ul className="nav">
                    <li><NavLink activeClassName="active" to={"/locations"}>Emplacements</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/items"}>Objets</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/add/item"}>Ajouter Objet</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/add/location"}>Ajouter Emplacement</NavLink></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div>
                <Switch>
                    <Route exact path={["/", "/locations"]} component={LocationsList}/>
                    <Route exact path={"/items"} component={ItemList}/>
                    <Route exact path="/add/item" component={AddItem}/>
                    <Route exact path="/add/location" component={AddLocation}/>
                    <Route path="/items/:id" component={Item}/>
                    <Route path="/locations/:id" component={Location}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
