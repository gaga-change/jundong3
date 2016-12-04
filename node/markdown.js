/**
 * Created by dong on 2016/12/4.
 */
var MarkdownIt = require('markdown-it'),
    fs = require('fs');
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');
console.log(result);


fs.readFile("../README.md",{}, function(err, data) {
    if(err) {
        console.log(err);
    }else {
        console.log(md.render(data.toString()));
    }
});