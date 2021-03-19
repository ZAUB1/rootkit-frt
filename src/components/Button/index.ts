import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";
import { Category, Icon, Vars } from "../../core/controllers";

@Vars({
    body: "Text..."
})
@Icon("fas fa-hockey-puck")
@Category("Interacts")
class Button extends Component {
    constructor() {
        super("Button", body, { style });
    }
}

export default new Button;