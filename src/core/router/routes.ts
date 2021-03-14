import { Route } from ".";
import { ComponentInstance } from "../controllers/component";
import Editor from "../editor";
import Viewer from "../viewer";

const routes: Array<Route> = [{
    name: "Viewer",
    path: "/",
    componentLoad: (): ComponentInstance => {
        if (!Viewer.getInstance())
            new Viewer();
        return Viewer.getInstance().viewerComp;
    }
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