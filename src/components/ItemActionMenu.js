import "../styles/ItemActionMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const ItemActionMenu = ({itemId}) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">...</button>
            <div className="dropdown-content">
                <Link><FontAwesomeIcon icon="arrows-alt"/> Déplacer</Link>
                <Link><FontAwesomeIcon icon="copy"/> Copier</Link>
                <Link to={"/locations/" + itemId}><FontAwesomeIcon icon="edit"/> Modifier</Link>
                <Link><FontAwesomeIcon icon="trash-alt"/> Supprimer</Link>
                <Link><FontAwesomeIcon icon="star"/> Ajouter aux favoris</Link>
            </div>
        </div>
    )
}

export default ItemActionMenu