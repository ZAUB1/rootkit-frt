import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Icon, Traits } from "../../../core/controllers/decorators/editor";

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
class CardProfile extends Component {
    constructor() {
        super("Card Profile", body, { });
    }
};

export default new CardProfile;