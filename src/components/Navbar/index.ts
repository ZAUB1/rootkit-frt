import content from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "Navbar", // Name
    content, // Contenu html
    { class: "gjs-fonts", content: "A" }, // Attributs grapesjs (icones drawer)
    { style, category: "Requirements" } // Attributs de notre framwork (style, traits, ...)
);