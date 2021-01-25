const path = require("path");
const apidoc = require("apidoc");
const createDoc = apidoc.createDoc;

const doc = createDoc({
    src: path.resolve(__dirname, "src"),
    dest: path.resolve(__dirname, "doc"),
});

if (typeof doc !== "boolean") {
    // Documentation was generated!
    console.log(doc.data); // `api_data.json` file content
    console.log(doc.project); // `api_project.json` file content
}
