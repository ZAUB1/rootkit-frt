import type { Route } from ".";
import type { NucleusInstance } from "../nucleus/component";

const routes: Array<Route> = [{
    name: "Viewer",
    path: "/",
    componentLoad: async (): Promise<NucleusInstance> => {
        return (await import("../viewer")).Instance.viewerComp;
    }
}, {
    name: "Editor",
    path: "/editor",
    componentLoad: async (): Promise<NucleusInstance> => {
        return (await import("../puzzle")).Instance.editorComp;
    }
}];

export default routes;