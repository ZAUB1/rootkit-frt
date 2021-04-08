import body from "./body.html";

import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";

import { Vars } from "../../../core/nucleus/decorators/component";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";
import { Traits, Category, Icon } from "../../../core/editor/decorators";

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
@ModelEventHandler("test", "click", () => {
    const notif = Notification.create();
    notif.setVar("body", "You bought this");
    notif.render();
})
class CardProduct extends NucleusComponent {
    constructor() {
        super("Card Product", body, { });
    }
};

export default new CardProduct;