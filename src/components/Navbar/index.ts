import content from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "Navbar", // Name
    content, // Contenu html
    {  }, // Attributs grapesjs (icones drawer)
    { style } // Attributs de notre framwork (style, traits, ...)
);