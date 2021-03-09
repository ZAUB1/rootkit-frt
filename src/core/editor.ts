import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from "./grapesjs";

import Controller from "../core/controllers";

export let editor: any;

export const init = () => {
    /* try {
        editor = grapesjs.init({
            container: '#editor-container',
            //fromElement: true,
            height: '100%',
            width: 'auto',
            storageManager: {
                type: 'local',
                //autoload: true,
            }
        });

        // editor.StorageManager.add('local', {
        //     load(key: string, cb: any) {
        //         console.log("called", key)
        //         cb({
        //             "gjs-components":"[{\"droppable\":\".column-cell\",\"resizable\":{\"tl\":0,\"tc\":1,\"tr\":0,\"cl\":0,\"cr\":0,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":1,\"currentUnit\":1,\"step\":0.4},\"classes\":[{\"name\":\"column-row\",\"private\":1}],\"custom-name\":\"Row\",\"components\":[{\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":1,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.4},\"classes\":[{\"name\":\"column-cell\",\"private\":1}]},{\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":1,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.4},\"classes\":[{\"name\":\"column-cell\",\"private\":1}],\"components\":[{\"tagName\":\"span\",\"type\":\"text\",\"editable\":false,\"attributes\":{\"id\":\"izaa\"},\"components\":[{\"type\":\"textnode\",\"content\":\"\\n    { body }\\n\"}]}]},{\"resizable\":{\"tl\":0,\"tc\":0,\"tr\":0,\"cl\":1,\"cr\":1,\"bl\":0,\"br\":0,\"minDim\":1,\"bc\":0,\"currentUnit\":1,\"step\":0.4},\"classes\":[{\"name\":\"column-cell\",\"private\":1}]}]}]",
        //             "gjs-styles":"[{\"selectors\":[{\"name\":\"column-row\",\"private\":1}],\"style\":{\"display\":\"flex\",\"justify-content\":\"center\",\"align-items\":\"stretch\",\"flex-wrap\":\"nowrap\",\"padding-top\":\"10px\",\"padding-right\":\"10px\",\"padding-bottom\":\"10px\",\"padding-left\":\"10px\"}},{\"selectors\":[{\"name\":\"column-cell\",\"private\":1}],\"style\":{\"min-width\":\"100px\",\"min-height\":\"75px\",\"display\":\"flex\",\"align-items\":\"center\",\"justify-content\":\"center\"}},{\"selectors\":[{\"name\":\"columnRow\",\"private\":1}],\"style\":{\"flex-wrap\":\"wrap\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[{\"name\":\"gjsCell\",\"private\":1}],\"style\":{\"width\":\"100%\",\"display\":\"block\"},\"mediaText\":\"(max-width: 768px)\",\"atRuleType\":\"media\"},{\"selectors\":[{\"name\":\"izaa\",\"type\":2,\"private\":1}],\"style\":{\"text-align\":\"center\",\"height\":\"100%\",\"font-weight\":\"{ weight }\",\"font-family\":\"{ font }\",\"font-size\":\"{ size }px\",\"color\":\"{ color }\",\"text-decoration\":\"{ decoration }\",\"text-transform\":\"{ capitalize }\"}}]"
        //         })
        //     },
          
        //     store(raw: any) {
        //         console.log(JSON.stringify(raw), raw["gjs-components"], Controller.components);
        //     },
        // });

        editor.load();
    } catch (e) {
        console.log(e);
    }

    editor.SelectorManager.getAll().each((selector: any) => selector.set('private', 1));
    editor.on('selector:add', (selector: any) => selector.set('private', 1));
    editor.on('load', () => {
        const blockBtn = editor.Panels.getButton('views', 'open-blocks');
        blockBtn.set('active', 1);
    }); */

    
};