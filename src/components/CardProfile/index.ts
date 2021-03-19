import body from "./body.html";

import { Component } from "../../core/controllers/component";
import { Category, Icon } from "../../core/controllers";

@Category("Interacts")
@Icon("fas fa-user")
class CardProfile extends Component {
    constructor() {
        super("Card Profile", body, { });
    }
}

export default new CardProfile;