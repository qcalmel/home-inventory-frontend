import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import './App.css';
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Location from "./components/Location"
import LocationsList from "./components/LocationList";
import AddLocation from "./components/AddLocation";

function App() {
    return (
        <div >
            <div className="navbar">
            <ul >
                <li><Link to={"/locations"}>Emplacements</Link></li>
                <li><Link to={"/items"}>Objets</Link></li>
                <li><Link to={"/add/item"}>Ajouter Objet</Link></li>
                <li><Link to={"/add/location"}>Ajouter Emplacement</Link></li>
                <li><a href="#about">About</a></li>
            </ul>
            </div>
            <div className="container mt-3">
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
