import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "DoubleColumn",
    body,
    { style, category: "Container" }
);