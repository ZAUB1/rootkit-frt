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
            storageManager: false
        });
    } catch (e) {
        console.log(e);
    }

    editor.SelectorManager.getAll().each((selector: any) => selector.set('private', 1));
    editor.on('selector:add', (selector: any) => selector.set('private', 1));
    editor.on('load', () => {
        const blockBtn = editor.Panels.getButton('views', 'open-blocks');
        blockBtn.set('active', 1);
    });
};