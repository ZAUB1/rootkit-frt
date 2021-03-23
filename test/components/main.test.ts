import Text from "../../src/components/Interacts/Text";
import { Component } from "../../src/core/controllers/component";
import { ComponentInstance } from "../../src/core/controllers/instance";

describe("Components: main", () => {
    it("Should create comp", () => {
        const comp = Text.create();
        expect(comp).toBeDefined();
        expect(comp.content).toBeDefined();
    });
});