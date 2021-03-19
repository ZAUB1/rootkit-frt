import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars } from "../../../core/controllers";

@Category("Interacts")
@Icon("fas fa-images")
class Carousel extends Component {
    constructor() {
        super("Carousel", body, { });
    }
}

export default new Carousel;