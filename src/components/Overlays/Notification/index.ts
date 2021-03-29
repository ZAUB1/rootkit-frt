import body from "./body.html";
import style from "./style";

import { Vars, Rendered } from "../../../core/controllers/decorators/component";
import { Component, ComponentInstance } from "../../../core/controllers/component";

@Vars({
    body: "Test notification"
})
@Rendered((comp: ComponentInstance) => {
    setTimeout(() => {
        comp.remove();
    }, 3000);
})
class Notification extends Component {
    constructor() {
        super("Notification", body, { style });
    }
};

export default new Notification;