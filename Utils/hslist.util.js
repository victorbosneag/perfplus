/*
import config from "../Config/datavalues.config.js";
class Highschools {
    constructor(filename){
        this.linereader = import("line-reader");
        this.hslist = [];
        this.linereader.eachLine("../"+filename, (line) => {
            this.hslist.push(line);
        })
    }
    lisths(){
        return this.hslist;
    }
    validate(hsname){
        return this.hslist.includes(hsname);
    }
    
}
highschoolList = new Highschools(config.highschoolFile);

export default highschoolList;

*/