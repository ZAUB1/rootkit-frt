import './index.scss';

import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from 'grapesjs';

import Text from "./components/Text/";

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

    editor.BlockManager.add("Text", Text);
    console.log(Text);
})();