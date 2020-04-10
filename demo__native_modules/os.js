// встроеный модуль os ( operation system ) позволяет получать инфу об ОС
const os = require('os')

console.log('операционная система: ', os.platform())  // операционная система:  win32
console.log('архитектура процессора: ', os.arch())    // архитектура процессора:  x64
console.log('свободная память: ', os.freemem())       // свободная память:  3880718336
console.log('всего памяти: ', os.totalmem())          // всего памяти:  8454438912
console.log('домашняя директория: ', os.homedir())    // домашняя директория:  C:\Users\Anton 
console.log('система включена: ', os.uptime())        // система включена:  953407 