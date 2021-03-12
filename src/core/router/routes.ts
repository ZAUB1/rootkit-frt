import { Route } from ".";
import { ComponentInstance } from "../controllers/component";
import Editor from "../editor";

const routes: Array<Route> = [{
    name: "Editor",
    path: "/editor",
    componentLoad: () => Editor.getInstance().editorComp,
}];

export default routes;