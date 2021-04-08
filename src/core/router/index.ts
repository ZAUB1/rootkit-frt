import routes from "./routes";
import type { NucleusInstance } from "../nucleus/component";

export interface Route {
    name: string;
    path: string;
    component?: NucleusInstance;
    componentLoad?: Function;
};

export default new class Router {
    // Holds current route
    private currentRoute: Route;
    // Holds all the routes
    private routes: Array<Route> = routes;
    // Hold the router element
    private DOMElem: HTMLDivElement;
    // Default router element name
    private defaultContainer: string = "router-container";

    private replaceHistoryState() {
        window.history.replaceState('Object', 'Title', this.currentRoute.path);
    };

    public getElem() {
        return this.DOMElem;
    };

    // Display error message
    private showError(str: string) {
        this.DOMElem.style.margin = "5px";
        this.DOMElem.innerHTML = str;
    };

    // Hard set component in viewer
    private setComponent(comp: NucleusInstance) {
        if (!comp)
            return this.showError("NucleusComponent not found");
        comp.renderTo(this.DOMElem);
    };

    // Navigate to route
    public async navigate(to: string = "/") {
        const route = this.routes.find(route => route.path == to);
        if (!route)
            return this.showError("Page not found");
        this.currentRoute = route;
        window.document.title = `Puzzle - ${route.name}`;
        this.setComponent(route.componentLoad ? await route.componentLoad() : route.component);
    };

    public constructor() {
        this.DOMElem = document.getElementById(this.defaultContainer) as HTMLDivElement;

        // Handle user navbar address (bypass normal browser fetching)
        window.onload = (event: any) => {
            this.navigate(window.location.pathname);
        };
    };
};