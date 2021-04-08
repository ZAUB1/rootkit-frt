import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";

import { Vars } from "../../../core/nucleus/decorators/component";
import { Traits, Category, Icon } from "../../../core/editor/decorators";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";

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
class CardFlip extends NucleusComponent {
    constructor() {
        super("Card Flip", body, { });
    }
};

export default new CardFlip;