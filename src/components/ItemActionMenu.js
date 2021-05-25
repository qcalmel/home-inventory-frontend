import "../styles/ItemActionMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import useModal from "./useModal";
import AddItem from "./AddItem";
import Modal from "./Modal";
import React from "react";

const ItemActionMenu = ({itemId}) => {
    const [isShowingUpdateItem, toggleUpdateItem] = useModal();
    return (
        <>
            <div className="action-dropdown">
                <button className="action-dropdown-btn">...</button>
                <div className="action-dropdown-content">
                    <Link className="dropdown-"><FontAwesomeIcon icon="arrows-alt"/> Déplacer</Link>
                    <Link><FontAwesomeIcon icon="copy"/> Copier</Link>
                    <span onClick={toggleUpdateItem}><FontAwesomeIcon icon="edit"/> Modifier</span>
                    <Link><FontAwesomeIcon icon="trash-alt"/> Supprimer</Link>
                    <Link><FontAwesomeIcon icon="star"/> Ajouter aux favoris</Link>
                </div>
            </div>
            <Modal isShowing={isShowingUpdateItem} hide={toggleUpdateItem} title="Modifier un objet">
                <AddItem itemId={itemId}/>
            </Modal>
        </>)
}

export default ItemActionMenu