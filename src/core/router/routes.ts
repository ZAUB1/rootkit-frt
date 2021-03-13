import { Route } from ".";
import { ComponentInstance } from "../controllers/component";
import Editor from "../editor";

const routes: Array<Route> = [{
    name: "Viewer",
    path: "/",
}, {
    name: "Editor",
    path: "/editor",
    componentLoad: (): ComponentInstance => {
        if (!Editor.getInstance())
            new Editor();
        return Editor.getInstance().editorComp;
    }
}];

export default routes;