import style from "./style";
import body from "./body.html"
import { NucleusComponent } from "&/core/nucleus/component";
import { Vars } from "&/core/nucleus/decorators/component";
import { ModelEventHandler } from "&/core/nucleus/decorators/model";

@Vars({
    traits: []
})
class EditorTraits extends NucleusComponent {
    constructor() {
        super("EditorTraits", body, { style });
    }
};

export default new EditorTraits;