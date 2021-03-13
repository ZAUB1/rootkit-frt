import './index.scss';

// import "./components/Map";
import "./components/Text";
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

import Editor from "./core/editor";
import Router from "./core/router";

(async () => {
    Router.navigate("/editor");
})();