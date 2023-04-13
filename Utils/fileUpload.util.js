import fs from "fs";

class FileManager {
  constructor(folderPath) {
    this.folderPath = folderPath;
  }
  async init(contest) {
    if (!fs.existsSync(this.folderPath.concat("/", contest))) {
      fs.mkdirSync(this.folderPath.concat("/", contest));
      return this.folderPath.concat("/", contest);
    } else {
      throw new Error("Contest already exists");
    }
  }
  async delete(type, contest) {
    if (!fs.existsSync(this.folderPath.concat("/", contest))) {
      throw new Error("Contest not init");
    }
    try {
      fs.unlink(this.folderPath.concat("/", contest, "/", type));
    } catch (err) {
      throw new Error("Couldn't delete file");
    }
  }
}

export default FileManager