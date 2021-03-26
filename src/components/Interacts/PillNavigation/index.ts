import body from "./body.html";



import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-square")
class PillNavigation extends Component {
    constructor() {
        super("Pill Navigation", body, { });
    }
};

export default new PillNavigation;
