import React, {useEffect, useState} from "react";
import {Switch, Route, NavLink, useLocation} from "react-router-dom";
import './App.css';
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Location from "./components/Location"
import LocationsList from "./components/LocationList";
import AddLocation from "./components/AddLocation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import LocationTree from "./components/LocationTree";

library.add(fas)

function App() {
    const [navToggle, setNavToggle] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setNavToggle(false)
    }, [location])
    return (
        <div>
            <div className="menu">
                <input type="checkbox"
                       id="toggle-menu"
                       name="toggle-menu"
                       checked={navToggle}
                       onClick={(e) => setNavToggle(!navToggle)}
                       className="nav-toggle"
                />
                <label htmlFor="toggle-menu">
                    <FontAwesomeIcon icon={['fas','bars']}/>
                </label>
                <div className="overlay"></div>
                <ul className="nav">
                    <li><NavLink activeClassName="active" to={"/home"}>Emplacements</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/items"}>Objets</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/add/item"}>Ajouter Objet</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/add/location"}>Ajouter Emplacement</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={"/location-tree"}>LocationTree</NavLink></li>
                </ul>
            </div>
            <div>
                <Switch>
                    <Route exact path={"/locations"} component={LocationsList}/>
                    <Route exact path={["/", "/home"]} component={Location}/>
                    <Route exact path={"/items"} component={ItemList}/>
                    <Route exact path="/add/item" component={AddItem}/>
                    <Route exact path="/add/location" component={AddLocation}/>
                    <Route exact path="/items/:id" component={Item}/>
                    <Route exact path="/location-tree" component={LocationTree}/>
                    <Route path="/items/edit/:id" component={Item}/>
                    <Route path="/locations/:id" component={Location}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
