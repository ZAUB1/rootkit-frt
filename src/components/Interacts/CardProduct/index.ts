import body from "./body.html";

import { Component, ComponentInstance } from "../../../core/controllers/component";
import { Appened, Category, Icon, Traits, Vars } from "../../../core/controllers";

import Notification from "../../Overlays/Notification";

@Vars({
    title: "Card title",
    price: 20,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis elit nunc, vitae vehicula est sodales eu."
})
@Traits([{
    type: "text",
    label: "Titre",
    name: "title",
}, {
    type: "number",
    label: "Prix",
    name: "price"
}, {
    type: "text",
    label: "Description",
    name: "desc"
}])
@Category("Interacts")
@Icon("fas fa-square")
@Appened((comp: ComponentInstance) => {
    comp.getCompByModel("test").on("click", () => {
        const notif = Notification.create();
        notif.setVar("body", "You bought this");
        notif.append();
    });
})
class CardProduct extends Component {
    constructor() {
        super("Card Product", body, { });
    }
};

export default new CardProduct;