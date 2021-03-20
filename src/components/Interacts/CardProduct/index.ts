import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Traits, Vars } from "../../../core/controllers";

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
class CardProduct extends Component {
    constructor() {
        super("Card Product", body, { });
    }
};

export default new CardProduct;