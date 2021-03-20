import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars } from "../../../core/controllers";

@Category("Interacts")
@Icon("fas fa-square")
class CardProduct extends Component {
    constructor() {
        super("Card Product", body, { });
    }
};

export default new CardProduct;