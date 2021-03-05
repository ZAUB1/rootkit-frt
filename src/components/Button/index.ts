import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "ButtonC",
    body,
    {  },
    {
        style,
        traits: [
            "name"
        ]
    }
);