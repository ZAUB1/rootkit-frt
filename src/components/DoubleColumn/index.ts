import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "DoubleColumn",
    body,
    { class: 'gjs-fonts gjs-f-b2' },
    { style, category: "Container" }
);