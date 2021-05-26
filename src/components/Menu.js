import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/Menu.css"

const Menu = () => {
    const [navToggle, setNavToggle] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setNavToggle(false)
    }, [location])
    return(
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
                <li><span>Home Inventory</span></li>
                <li><NavLink activeClassName="active" to={"/home"}>Emplacements</NavLink></li>
                <li><NavLink exact activeClassName="active" to={"/items"}>Objets</NavLink></li>
                <li><NavLink exact activeClassName="active" to={""}>Corbeille</NavLink></li>
            </ul>
        </div>
    )
}

export default Menu