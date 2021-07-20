import { randomDefaultPicture } from "../defaultPictures";
import '../styles/error.css';

export function ErrorDialog(props) {
    return (
        <div className="errorBox">
            <div className="picture">
                <img src={randomDefaultPicture()} alt={`An error occured`} />
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}