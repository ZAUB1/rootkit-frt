import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "TripleColumn",
    body,
    { style, category: "Container" }
);