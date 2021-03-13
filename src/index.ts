import './index.scss';

// import "./components/Map";
import Text from "./components/Text";
import Simple from "./components/SimpleColumn";
import "./components/DoubleColumn";
import "./components/TripleColumn";
import Button from "./components/Button";
// import "./components/Image";
import "./components/Navbar";
import "./components/Dropdown";
import "./components/Card";

import "./core/router";
import Viewer from './core/viewer';

Viewer.onLoad((viewer: Viewer) => {
    viewer.createComp(Button);
});