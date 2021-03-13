import './index.scss';
import "./components";

import Text from "./components/Text";

import "./core/router";
import Viewer from './core/viewer';

Viewer.onLoad((viewer: Viewer) => {
    viewer.createComp(Text);
});