import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from 'grapesjs';

export let editor: any;

export const init = () => {
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
};