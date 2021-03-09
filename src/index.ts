import './index.scss';

import * as editor from "./core/editor";

(async () => {
    editor.init();
})();

// import "./components/Map";
import Text from "./components/Text";
import "./components/SimpleColumn";
import "./components/DoubleColumn";
import "./components/TripleColumn";
import "./components/Button";
// import "./components/Image";
import "./components/Navbar";
import "./components/Dropdown";
import "./components/Card";

import "./core";
import Controller from "./core/controllers";

import { parseDocument } from "./core/markup";

(async () => {
    /* const text = Text.create();
    text.setVar("body", "LOL");
    text.setVar("color", "crimson");
    text.append();

    const text2 = Text.createAndAppend(); */

    Controller.components["EditDrawer"].createAndAppend();
})();