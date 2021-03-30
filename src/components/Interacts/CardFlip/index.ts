import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-exchange-alt", "#37bc9b")
class CardFlip extends Component {
    constructor() {
        super("Card Flip", body, { });
    }
};

export default new CardFlip;