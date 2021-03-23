import body from "./body.html";
import style from "./style";

import { Vars, Appened } from "../../../core/controllers/decorators/component";
import { Component, ComponentInstance } from "../../../core/controllers/component";

@Vars({
    body: "Test notification"
})
@Appened((comp: ComponentInstance) => {
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