import './index.scss';

import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from 'grapesjs';

import MapC from "./components/Map";
import Text from "./components/Text/";
import DoubleColumn from "./components/DoubleColumn";

(async () => {
    let editor;
    try {
        editor = grapesjs.init({
            container: '#editor-container',
            fromElement: true,
            height: '100%',
            width: 'auto',
            storageManager: false,
        });
    } catch (e) {
        console.log(e);
    }

    editor.BlockManager.add("MapC", MapC);
    editor.BlockManager.add("Text", Text);
    editor.BlockManager.add("DoubleColumn", DoubleColumn);
    console.log(Text);
})();