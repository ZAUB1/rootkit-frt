# Viewer
The viewer is a little module that allows you to render components quickly

## Prototype
```javascript
export default class Viewer {
    public viewerComp: ComponentInstance;

    public loadCompInside(comp: ComponentInstance);
    public createComp(compGen: Component): ComponentInstance;
    public static getInstance();
    public static onLoad(handler: Function);
};
```