import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars } from "../../../core/controllers";

@Category("Interacts")
@Icon("fas fa-square")
class CardFlip extends Component {
    constructor() {
        super("Card Flip", body, { });
    }
};

export default new CardFlip;