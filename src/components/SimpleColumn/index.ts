import body from "./body.html";
import colStyle from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "SimpleColumn",
    body,
    { class: 'gjs-fonts gjs-f-b1' },
    colStyle
);