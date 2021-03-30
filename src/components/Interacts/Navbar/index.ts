import body from "./body.html";
// import style from "./style";


import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-compass")
class Navbar extends Component {
    constructor() {
        super("Navbar", body, { });
    }
};

export default new Navbar;

