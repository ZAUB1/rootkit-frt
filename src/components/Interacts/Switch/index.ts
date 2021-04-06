import body from "./body.html";
import { Component } from "&/core/controllers/component";
import { Category } from "&/core/controllers/decorators/editor";

@Category("Interacts")
class Switch extends Component {
    constructor() {
        super("Switch", body, {  });
    }
};

export default new Switch;