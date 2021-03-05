import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "Avatar",
    body,
    {  },
    { style, category: "Container" }
    //{ class: 'gjs-fonts gjs-f-b3' },
);