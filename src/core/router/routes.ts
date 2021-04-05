import type { Route } from ".";
import type { ComponentInstance } from "../controllers/component";

const routes: Array<Route> = [{
    name: "Viewer",
    path: "/",
    componentLoad: async (): Promise<ComponentInstance> => {
        return (await import("../viewer")).Instance.viewerComp;
    }
}, {
    name: "Editor",
    path: "/editor",
    componentLoad: async (): Promise<ComponentInstance> => {
        return (await import("../editor")).Instance.editorComp;
    }
}];

export default routes;