import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-square")
class Searchbar extends Component {
    constructor() {
        super("Searchbar", body, { });
    }
};

export default new Searchbar;
