# Components
Components are the core of this framework, they act as individual instances linked to an HTMLElement that are capable of rebuilding, moving any of the elements props
> We in this section assume that our component is named MyComponent

## File structure
Every component has to follow this specific file structure
```javascript
-- components/
    -- (Containers | Interacts)/
        -- MyComponent/
            -- index.ts // Component declaration
            -- index.html // Optional: component body
```

## Creating a component
> Component declaration goes to MyComponent/index.ts
### Initial declaration
```javascript
import { Component } from "&/core/controllers/component";

class MyComponent extends Component {
    constructor() {
        super("MyComponent", "", { });
    }
};

export default new MyComponent;
```

> The file must then must be added to component loader (components/index.ts)
```javascript
import "./(Containers|Interacts)/MyComponent";
```

### Adding a variable
Let's say we want to add the clickCount variable
```javascript
import { Component } from "&/core/controllers/component";
import { Vars } from "&/core/controllers";

@Vars({
    clickCount: 0 // Initial state is set to 0, so the var is a number
})
class MyComponent extends Component {
    ...
};
```

## Component body
Component body is optional, although an empty component should only render in very specific cases
### Linking
```javascript
import { Component } from "&/core/controllers/component";

// Import body from folder
import body from "./body.html";

class MyComponent extends Component {
    constructor() {
        super("MyComponent", body); // Passing body here
    }
};
```
### Syntax
I used standard html syntax with a few additions.
- Any variable is accessible with { varName }
```html
<span style="
    text-align: center;
    height: 100%;
    /* Usable anywhere as the entire file is parsed */
    font-weight: { weight };
    font-family: { font };
    font-size: { size }px;
    color: { color };
    text-decoration: { decoration };
    text-transform: { capitalize };
">
    { body }
</span>
```

- ``editor`` flags the component as to be ignored by the editor
```html
<nav editor>
    Every sub element will also be ignored
</nav>
```

- ``editor-container`` flags the component as a container, meaning it can hold others<br/>
Note that its content should stay empty as its meant to be filled by the user
```html
<div
    editor-container
></div>
```

- ``editor-container`` flags the component as a container, meaning it can hold others<br/>
Note that its content should stay empty as its meant to be filled by the user
```html
<div
    editor-container
></div>
```

- ``draggable`` is also being interpreted by the editor

### Subcomponents
You can invoke an already loaded component into one and set its vars<br/>
In this example spawning a Text subcomponent, and using the { body } var of the current component to init the sub<br/>
> Components can be daisy chained thanks to this algorithm
```html
<div>
    <Text body="{ body }"/>
</div>
```

## Event handlers
### Events list
```
@appened
@click
```
### Handling
There are multiple ways of handling component events<br/>
In this section we assume to listen to the click event
#### Decorators
```javascript
import { Component } from "&/core/controllers/component";
import { Click } from "&/core/controllers";

@Click((componentInstance: ComponentInstance, ...): void => {
    // Code goes here
})
class MyComponent extends Component {
    ...
};
```
#### EventEmitter
```javascript
const text = Text.create(); // ComponentInstance
text.on("click", (...) => {
    // Code goes here
});
```

## Use with viewer (or any other file)
### Example
```javascript
import Viewer from "&/core/viewer";

// Import Component
import Text from "&/components/Interacts/Text";

Viewer.onLoad((viewer: Viewer) => {
    const text = Text.create(); // returns ComponentInstance
    viewer.loadCompInside(text);
});
```
### ComponentInstance
As of 21/03/2021
```javascript
class ComponentInstance {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string;

    public DOMElem: HTMLDivElement;
    public originContainer: HTMLElement = Router.getElem();
    public childrens: any[] = [];

    public appened: boolean = false;

    public rebuild();
    public render();
    public renderTo(comp: ComponentInstance): void;
    public renderTo(container: HTMLElement): void;
    public renderTo(elem: ComponentInstance | HTMLElement): void;
    public moveTo(container: HTMLElement);
    public remove();
    public getVar(key: string);
    public setVar(key: string, value: any);
    public getChilds(key: string = "*");
    public getFirstChild(key: string);
    public constructor(label: string, content: string, element: any, { style, vars = [], id }: any);
};
```

## Use with editor
### Set component category
> ⚠️  Setting the component a category adds it to the list of the editor.

Let's say here we want to create a container
```javascript
import { Component } from "&/core/controllers/component";
import { Category } from "&/core/controllers";

@Category("Containers")
class MyComponent extends Component {
    ...
};
```

### Set component icon
```javascript
import { Component } from "&/core/controllers/component";
import { Icon } from "&/core/controllers";

@Icon("fas fa-pen") // Font awesome here
class MyComponent extends Component {
    ...
};
```

### Set component trait
> 🅰️  A trait is necessarily linked to a var as it is a var modifier

In this example we are gonna create a color trait for the textColor variable
For more details on traits see: [Trait interface](http://localhost:3000/#/traits?id=trait-interface)
```javascript
import { Component } from "&/core/controllers/component";
import { Vars, Traits } from "&/core/controllers";

@Vars({
    textColor: "black" // textColor is initialized with a string
})
@Traits({
    type: "color", // Type of trait
    name: "textColor", // The variable we are affecting
    label: "Text color" // The label display in the traits menu
})
class MyComponent extends Component {
    ...
};
```