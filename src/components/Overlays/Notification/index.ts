import body from "./body.html";
import style from "./style";

import { Component, ComponentInstance } from "../../../core/controllers/component";
import { Category, Icon, Vars, Traits, Appened } from "../../../core/controllers";

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