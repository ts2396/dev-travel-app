import {handleSubmit} from "../client/js/formHandler"

const regeneratorRuntime = require("regenerator-runtime");
test ("It should return true", async() => {
    expect(handleSubmit).toBeDefined();
});
test ("It should be a function", async() => {
    expect(typeof handleSubmit).toBe("function");
});