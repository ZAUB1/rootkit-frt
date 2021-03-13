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

    private showError(str: string) {
        this.DOMElem.style.margin = "5px";
        this.DOMElem.innerHTML = str;
    };

    private setComponent(comp: ComponentInstance) {
        if (!comp)
            return this.showError("Component not found");
        comp.appendTo(this.DOMElem);
    };

    public navigate(to: string = "/") {
        const route = this.routes.find(route => route.path == to);
        if (!route)
            return this.showError("Page not found");
        this.currentRoute = route;
        this.setComponent(route.componentLoad ? route.componentLoad() : route.component);
    };

    public constructor() {
        this.DOMElem = document.getElementById(this.defaultContainer) as HTMLDivElement;

        window.onload = (event: any) => {
            this.navigate(window.location.pathname);
        };
    };
};