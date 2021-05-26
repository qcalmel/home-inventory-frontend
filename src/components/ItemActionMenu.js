import "../styles/ItemActionMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import useModal from "./useModal";
import AddItem from "./AddItem";
import Modal from "./Modal";
import React from "react";

const ItemActionMenu = ({itemId}) => {
    const [isShowingUpdateItem, toggleUpdateItem] = useModal();
    const [isShowingMoveItem, toggleMoveItem] = useModal();
    const [isShowingCopyItem, toggleCopyItem] = useModal();
    return (
        <>
            <div className="action-dropdown">
                <button className="action-dropdown-btn">...</button>
                <div className="action-dropdown-content">
                    <span onClick={isShowingMoveItem}><FontAwesomeIcon icon="arrows-alt"/> Déplacer</span>
                    <span onClick={isShowingCopyItem}><FontAwesomeIcon icon="copy"/> Copier</span>
                    <span onClick={toggleUpdateItem}><FontAwesomeIcon icon="edit"/> Modifier</span>
                    <Link><FontAwesomeIcon icon="trash-alt"/> Supprimer</Link>
                    <Link><FontAwesomeIcon icon="star"/> Ajouter aux favoris</Link>
                </div>
            </div>
            <Modal isShowing={isShowingUpdateItem} hide={toggleUpdateItem} title="Modifier un objet">
                <AddItem itemId={itemId}/>
            </Modal>
            <Modal isShowing={isShowingMoveItem} hide={toggleMoveItem} title="Déplacer un objet">
                {/*<AddItem itemId={itemId}/>*/}
            </Modal>
            <Modal isShowing={isShowingCopyItem} hide={toggleCopyItem} title="Copier un objet">
                <AddItem itemId={itemId}/>
            </Modal>
        </>)
}

export default ItemActionMenu