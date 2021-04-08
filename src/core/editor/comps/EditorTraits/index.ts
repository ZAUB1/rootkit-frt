import "./style.scss";
import body from "./body.html"
import { Component } from "&/core/controllers/component";
import { Vars } from "&/core/controllers/decorators/component";

@Vars({
    traits: []
})
class EditorTraits extends Component {
    constructor() {
        super("EditorTraits", body, {  });
    }
};

export default new EditorTraits;