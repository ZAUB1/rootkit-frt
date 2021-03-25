import Controller from "../controllers";
import { ComponentInstance } from "../controllers/instance";

const isLineAComp = (line: string) => {
    const knownComps = Object.keys(Controller.components).map(comp => comp.replace(" ", ""));
    for (const compName of knownComps) {
        if (line.includes(`<${compName}`))
            return compName;
    }
    return false;
}

export const parseHTML = (context: ComponentInstance, content: string) => {
    let result = "";
    const pendings = [];
    const lines = content.split("\n");
    for (let line of lines) {
        line = line.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            const _var = context.getVar(sub);
            if (_var)
                return _var;
            return save;
        });

        if (line.includes("<") && !line.includes("</")) {
            console.log("beg:", line.split("<")[1].split(">")[0].trim())
        }
        if (line.includes("</")) {
            console.log("end:", line.split("</")[1].split(">")[0].trim())
        }
    };
    //console.log(result)
};