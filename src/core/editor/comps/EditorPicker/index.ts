import "./style.scss";
import body from "./body.html";
import * as Nucleus from "../../../controllers/component";

class EditorPicker extends Nucleus.Component {
    constructor() {
        super("EditorPicker", body, { });
    }
};

export default new EditorPicker;