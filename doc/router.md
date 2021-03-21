# Router
The router replaces normal page linking behavior by rendering components based on the browser address bar's url

## Route interface
```javascript
interface Route {
    name: string;
    path: string;
    component?: ComponentInstance;
    componentLoad?: Function;
};
```

## Routes declaration
Routes are being declared in ``/core/router/routes.ts``<br/>
In this section we assume that our route is named MyRoute
### File structure
```javascript
import { Route } from ".";

const routes: Array<Route> = []; // Routes are being declare here

export default routes;
```

### Declaring a simple route
```javascript
{
    name: "MyRoute",
    path: "/",
    component: // ComponentInstance
}
```

### Declaring a loading route
```javascript
{
    name: "MyRoute",
    path: "/",
    componentLoad: (): ComponentInstance => {
        // Do stuff and then return a ComponentInstance
    }
}
```