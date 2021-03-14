import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "SimpleColumn",
    body,
    { style, category: "Container" }
);