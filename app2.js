const translate = require('translate-google');

var obj = new Object();
obj.brand = "fanola";
obj.category = "Car";
obj.title = "100 ml conculer";
console.log(obj);

translate(obj, {to: 'ar'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})