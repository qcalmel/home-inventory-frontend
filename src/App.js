import {Switch, Route} from "react-router-dom";
import './App.css';
import Menu from "./components/Menu";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import Location from "./components/Location"
import LocationsList from "./components/LocationList";
import AddLocation from "./components/AddLocation";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";


library.add(fas)

function App() {
    return (
        <div className="app-container">
            <Menu/>
            <div>
                <Switch>
                    <Route exact path={"/locations"} component={LocationsList}/>
                    <Route exact path={["/", "/home"]} component={Location}/>
                    <Route exact path={"/items"} component={ItemList}/>
                    <Route exact path="/add/item" component={AddItem}/>
                    <Route exact path="/add/location" component={AddLocation}/>
                    <Route exact path="/items/:id" component={Item}/>
                    <Route path="/items/edit/:id" component={Item}/>
                    <Route path="/locations/:id" component={Location}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
