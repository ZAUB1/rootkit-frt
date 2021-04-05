import body from "./body.html";

import { Component } from "../../../core/controllers/component";

import { Vars } from "../../../core/controllers/decorators/component";
import { Traits, Category, Icon } from "../../../core/controllers/decorators/editor";
import { ModelEventHandler } from "../../../core/controllers/decorators/model";

@Vars({
    fullname: "fullname",
    position: "Architect",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis elit nunc, vitae vehicula est sodales eu."
})
@Traits([{
    type: "text",
    label: "Nom/Prénom",
    name: "fullname",
}, {
    type: "text",
    label: "Position",
    name: "position"
}, {
    type: "text",
    label: "Description",
    name: "desc"
}])
@Icon("fas fa-square")
@Category("Interacts")
class CardFlip extends Component {
    constructor() {
        super("Card Flip", body, { });
    }
};

export default new CardFlip;