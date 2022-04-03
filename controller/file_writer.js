function createDirectory(company){
    const fs = require('fs');
    const dir = './code/'+company;
    fs.mkdir(dir, (err) => {
        if (err) {
            throw err;
        }
        console.log("Directory is created.");
    });
}

module.exports={
    "createDirectory":createDirectory,
}