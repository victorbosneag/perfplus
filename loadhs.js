import Readlines from 'n-readlines';
import fs from 'fs';
import db from "./Models/index.js";
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const Highschool = db.highschools;

//terminal args
const args = process.argv.slice(2);
if (args.length > 1){
    throw new Error("!!! Usage: node loadhs.js INPUT_FILE");
}


if(!fs.existsSync(args[0])){
    throw new Error("!!! Specified file doesn't exist");
}

const readlines = new Readlines(args[0]);

let line;
while ((line = readlines.next())) {
    let hsconcat = line.toString('ascii');
    Highschool.create({
        name: hsconcat,
        city: "TEST"
    }).then(() => {
        console.log("!!! Success !!!" + hsconcat);
    }).catch(err => {
        console.log(err);
    })
    console.log(hsconcat);
}
