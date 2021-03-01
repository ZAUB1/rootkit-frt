import './index.scss';

import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from 'grapesjs';

(async () => {
    try {
        const editor = grapesjs.init({
            container: '#editor-container',
            fromElement: true,
            height: '100%',
            width: 'auto',
            storageManager: false,
        });
    } catch (e) {
        console.log(e);
    }
})();