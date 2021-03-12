import routes from "./routes";
import { ComponentInstance } from "../controllers/component";

export interface Route {
    name: string;
    path: string;
    component?: ComponentInstance;
    componentLoad?: Function;
};

export default new class Router {
    private currentRoute: Route;
    private routes: Array<Route> = routes;
    private DOMElem: HTMLDivElement;
    private defaultContainer: string = "router-container";

    private replaceHistoryState() {
        window.history.replaceState('Object', 'Title', this.currentRoute.path);
    };

    public getElem() {
        return this.DOMElem;
    };

    private setComponent(comp: ComponentInstance) {
        comp.appendTo(this.DOMElem);
    };

    public navigate(to: string = "/") {
        const route = this.routes.find(route => route.path == to);
        if (!route)
            return;
        this.currentRoute = route;
        this.setComponent(route.componentLoad ? route.componentLoad() : route.component);
        // this.replaceHistoryState();
    };

    public constructor() {
        this.DOMElem = document.getElementById(this.defaultContainer) as HTMLDivElement;

        /* window.addEventListener('popstate', function (event) {
            console.log("changed")
        }); */
    };
};