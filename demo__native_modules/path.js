// встроеный модуль patn позволяет удобно работать с путями
const path = require('path')


console.log('название файла: ', path.basename(__filename))     // название файла:  path.js  
console.log('имя директории: ', path.dirname(__filename))      // имя директории:  D:\Anton\WORK\Java Script\nodeJS\demo__native_modules  
console.log('расширение файла: ', path.extname(__filename))    // расширение файла:  .js  
console.log('parse: ', path.parse(__filename))     // parse: {                                                                                                                                                                            
                                                   //    root: 'D:\\',                                                                                                                                                                      
                                                   //    dir: 'D:\\Anton\\WORK\\Java Script\\nodeJS\\demo__native_modules',                                                                                                                 
                                                   //    base: 'path.js',                                                                                                                                                                   
                                                   //    ext: '.js',                                                                                                                                                                        
                                                   //    name: 'path'                                                                                                                                                                       
                                                   // }     
                                               
// path.join () объединяет все заданные сегменты пути
console.log(path.join(__dirname, 'server', 'index.html'))  // D:\Anton\WORK\Java Script\nodeJS\demo__native_modules\server\index.html 

