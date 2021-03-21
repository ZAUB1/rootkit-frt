import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Traits, Vars } from "../../../core/controllers";

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
@Icon("fas fa-user")
class CardProfile extends Component {
    constructor() {
        super("Card Profile", body, { });
    }
};

export default new CardProfile;