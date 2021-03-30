import body from "./body.html";



import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-clone", "#4361ee")
class Modal extends Component {
    constructor() {
        super("Modal", body, { });
    }
};

export default new Modal;
