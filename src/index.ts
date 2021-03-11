import './index.scss';

import Editor from "./core/editor";

(async () => {
    new Editor();
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
    const text1 = Text.createAndAppend();
    const text2 = Text.createAndAppend();
})();