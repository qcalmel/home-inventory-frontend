import {Link} from "react-router-dom";
import ("../styles/PathNavigation.css")

const PathNavigation = ({parentLocations, currentLocation}) => {
    return(
        <div className="path-navigation">
        <Link to="/home/">
            <span>Accueil</span>
        </Link>
    {
        parentLocations.map((location) => (
            <Link to={"/locations/" + location.id} key={"parent" + location.id}>
                <span> {">"}{location.name}</span>
            </Link>
        ))
    }
            {currentLocation.id &&
                <span>{">"}{currentLocation.name}</span>
            }
        </div>
    )

}

export default PathNavigation