export default (field, type, res) => {
    if(typeof field != type){
        res.status(400);
        res.send({
            name: "typeField",
            fieldName: field
        })
    }
}