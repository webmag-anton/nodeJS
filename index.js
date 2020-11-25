// По умолчанию в nodeJS каждый модуль (т.е. отдельный js файл) оборачивает в такую функцию:

// (function(exports, require, module, __dirname, __filename) {     поэтому в модуле доступны все переменные, передаваемые в эту функцию

// функция require встроена в nodeJS, с ее помощью мы подключаем пакет (.js можно не писать)
const chalk = require('chalk')	// если не указан путь, то nodeJS понимает что модуль из node_modules (т.е. не свой - дополнительный модуль)
const text = require('./data')   // что бы подключить свой файл (модуль) нужно ставить ./

console.log( chalk.red(text) )

// __dirname описывает путь до текущей папки
console.log(__dirname)  	// D:\Anton\WORK\Java Script\nodeJS
// __filename описывает путь до текущего файла
console.log(__filename) 	// D:\Anton\WORK\Java Script\nodeJS\index.js


// })