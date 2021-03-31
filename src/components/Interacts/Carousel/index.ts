import body from "./body.html";

import { Component, ComponentInstance } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-images", "#99582a")
class Carousel extends Component {
    constructor() {
        super("Carousel", body, { });
    }
};

export default new Carousel;