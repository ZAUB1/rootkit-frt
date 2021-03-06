import 'grapesjs/dist/css/grapes.min.css';
import * as grapesjs from 'grapesjs';

import Controller from "../core/controllers";

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

        editor.addComponents([
            {
            "tagName":"text",
            "components":[
            {
            "tagName":"span",
            "type":"text",
            "editable":false,
            "attributes":{
            "weight":"normal",
            "color":"black",
            "size":20,
            "font":"Arial",
            "decoration":"none",
            "capitalize":"none",
            "body":"Text..",
            "id":"iurf"
            },
            "components":[
            {
            "type":"textnode",
            "content":" Text.. "
            }
            ]
            }
            ]
            },
            {
            "tagName":"text",
            "components":[
            {
            "tagName":"span",
            "type":"text",
            "editable":false,
            "attributes":{
            "weight":"normal",
            "color":"black",
            "size":20,
            "font":"Arial",
            "decoration":"none",
            "capitalize":"none",
            "body":"Text..",
            "id":"i4pg"
            },
            "components":[
            {
            "type":"textnode",
            "content":" Text.. "
            }
            ]
            }
            ]
            }
            ])

        editor.getComponents().map((comp: any) => {
            comp.attributes.components.models[0]._this.rebuildContent(comp.view.$el[0].childNodes[0]);
            /* comp.attributes.components.models[0].on("change:attributes", (_: any) =>  {
                const _this = comp.attributes.components.models[0]._this;
                _this.updateAttributesHandler(_);
                _this.rebuildContent(_.view.el);
            }) */
            Controller.components[comp.view.$el[0].childNodes[0].id].on(`attributes::changed::${comp.view.$el[0].childNodes[0].id}`, (_: any) => {
                Controller.components[comp.view.$el[0].childNodes[0].id].updateAttributesHandler(_);
                Controller.components[comp.view.$el[0].childNodes[0].id].rebuildContent(comp.view.$el[0].childNodes[0]);
            })
            /* Controller.components[comp.view.$el[0].childNodes[0].id].rebuildContent(comp.view.$el[0].childNodes[0]);
             */
        });
    });
};