import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Vars } from "../../../core/nucleus/decorators/component";
import { Category, Icon, Traits } from "../../../core/puzzle/decorators";

@Vars({
    fullname: "Lara Win",
    position: "CEO - Founder",
    graduate: "Harvard University 2009" 
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
    label: "Diplômes",
    name: "graduate"
}])

@Category("Interacts")
@Icon("fas fa-square")
class CardProfile extends NucleusComponent {
    constructor() {
        super("Card Profile", body, { });
    }
};

export default new CardProfile;