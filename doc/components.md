# Components
Components are the core of this framework, they act as individual instances linked to an HTMLElement that are capable of rebuilding, moving any of the elements props

## Creating a component
### Initial declaration
We in this section assume that our component is named MyComponent
```javascript
import { Component } from "&/core/controllers/component";

class MyComponent extends Component {
    constructor() {
        super("MyComponent", body, { });
    }
};
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

## Component body
Component body is optional, although an empty component should only append in very specific cases
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