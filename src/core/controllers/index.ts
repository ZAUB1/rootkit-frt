import { Component, ComponentInstance } from "./component";

class Controller {
    public components: { [id: string]: Component } = {};
    public componentsInstances: { [id: string]: ComponentInstance } = {};
};

export default new Controller;