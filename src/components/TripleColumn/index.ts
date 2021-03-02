import body from "./body.html";
import colStyle from "../SimpleColumn/style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "TripleColumn",
    body,
    { class: 'gjs-fonts gjs-f-b3' },
    colStyle
);