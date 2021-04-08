import style from "./style";
import body from "./body.html"
import { Component } from "&/core/controllers/component";
import { Vars } from "&/core/controllers/decorators/component";
import { ModelEventHandler } from "&/core/controllers/decorators/model";

@Vars({
    traits: []
})
class EditorTraits extends Component {
    constructor() {
        super("EditorTraits", body, { style });
    }
};

export default new EditorTraits;