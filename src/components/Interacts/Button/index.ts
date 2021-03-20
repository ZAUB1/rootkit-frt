import body from "./body.html";
import style from "./style";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars, Traits } from "../../../core/controllers";

@Vars({
    body: "Text..."
})
@Icon("fas fa-hockey-puck")
@Category("Interacts")
@Traits([{
    type: "text",
    name: "body",
    label: "Contenu",
}])
class Button extends Component {
    constructor() {
        super("Button", body, { style });
    }
};

export default new Button;