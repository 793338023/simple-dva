const fs = require("fs");
const path = require("path");

const PAGE_SIGN = "me.json";

/**
 * 查询所有页面
 * @param {String} dir  查询目录
 * @returns {Array} 所有满足条件的文件路径
 */
function getAllDirbyFilename(dir) {
  let dirPath = path.resolve(process.cwd(), `src/${dir}`);
  let files = fs.readdirSync(dirPath); // 该文件夹下的所有文件名称 (文件夹 + 文件)
  let resultArr = [];

  files.forEach((file) => {
    let filePath = dir + "/" + file; // 当前文件 | 文件夹的路径

    // 满足查询条件文件
    if (file === PAGE_SIGN) {
      return resultArr.push(dir);
    }

    // 继续深搜文件夹
    if (fs.statSync(`src/${filePath}`).isDirectory()) {
      resultArr.push(...getAllDirbyFilename.call(this, filePath));
    }
  });

  return resultArr;
}

module.exports = getAllDirbyFilename;
