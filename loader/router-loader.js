const path = require("path");
const getAllDirbyFilename = require("./queryPages");

const ROUTER_DIR = "pages";

module.exports = function (source) {
  this.cacheable && this.cacheable(false);
  this.addContextDependency(path.resolve(process.cwd(), `src/${ROUTER_DIR}`));
  var callback = this.async();
  this.value = source;

  let content = source;

  if (source.indexOf("__ROUTE__") > -1) {
    const allPages = getAllDirbyFilename.call(this, ROUTER_DIR);
    let header = "";
    let routers = "";
    allPages.forEach((p, i) => {
      header += `import RouteCom_${i} from "./${p}";\n`;
      routers += `<Route path="${p.replace(
        ROUTER_DIR,
        ""
      )}" element={<RouteCom_${i} />} />\n`;
    });
    content = header + content.replace("__ROUTE__", routers);
  }

  if (source.indexOf("__REDUCER__") > -1) {
    const allPages = getAllDirbyFilename.call(this, ROUTER_DIR);
    let header = 'import app from "zStore/configureStore";\n';
    let model = "";
    allPages.forEach((p, i) => {
      header += `import reducer_${i} from "./${p}/reducer";\n`;
      model += `app.model(reducer_${i})\n`;
    });
    // model += `app.replace();\n`;
    content = header + content.replace("// __REDUCER__", model);
  }

  callback(null, content);
};
