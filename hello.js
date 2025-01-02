const fs = require('node:fs');
const content = "Hello, Node.js!";
const exist = fs.existsSync('example.txt');

if (exist) {

    fs.appendFile('example.txt', " Learning backend development.", (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("append success");
            fs.readFile('example.txt', 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    return;
                }
                console.log(data + " is content in file.");
            });
        }
    });
} else {
    fs.writeFile('example.txt', content, err => {
        if(err) {
            console.error(err);
        } else {
            console.log("File with content: " + content + " was written.");
            fs.readFile('example.txt', 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    return;
                }
                console.log(data + " is content in file.");
            });
        }
    });        
}
