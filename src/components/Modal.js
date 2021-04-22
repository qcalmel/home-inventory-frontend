import ReactDOM from "react-dom";
import "../styles/Modal.css"
const Modal = ({isShowing, hide, ...props}) => (
    isShowing
        ? ReactDOM.createPortal(
        <>
            <div onClick={hide} className="modal-overlay">
                <div className="modal-wrapper">
                    <div onClick={e=>{e.stopPropagation()}} className="modal">
                        <div className="modal-header">
                            <h4>Modal Header</h4>
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={hide}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{props.children}</div>
                    </div>
                </div>
            </div>
        </>,
        document.body
        )
        : null
    )

export default Modal;