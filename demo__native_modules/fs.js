// встроеный модуль fs ( file system ) позволяет удобно работать с файлами
const fs = require('fs')
const path = require('path')


// 1)
// асинхронный метод; лучше использовать его, т.к. он не блокирует поток ( есть аналогичный синхронный метод mkdirSync(path[, options]) )
// fs.mkdir(path[, options], callback)  -  первый параметр в callback - ошибка; если ошибки нет то вместо err будет null
fs.mkdir(path.join(__dirname, 'test_fs'), err => {
	if (err) {
		// если папка уже существует, то мы не можем ее создать - будет ошибка
		throw err
	}
	// если нет ошибки, то
	console.log('папка создана')
})



const filePath = path.join(__dirname, 'test_fs', 'text.txt')

// 2)
// fs.writeFile(file, data[, options], callback) -  что то пишет внутри файла, может перетирать существующий файл
fs.writeFile(filePath, 'Hello NodeJS', err => {
	if (err) {
		throw err
	}
	console.log('файл создан и что то написано в него')
})

// 3)
// fs.appendFile(file, data[, options], callback) -  что то добавляет в файл, может перетирать существующий файл
fs.appendFile(filePath, '\nhello again', err => {
	if (err) {
		throw err
	}
	console.log('длбавлена надпись в конец файла')
})

// 4)
fs.readFile(filePath, 'utf-8', (err, content) => {  // прочитывает данные
	if (err) {
		throw err
	}
	// // данные приходят в виде буффера, его нужно привести к строке;
	// const data = Buffer.from(content)
	// console.log('content: ', data.toString())

	// или есть другой способ - указать 2 параметр кодировки
	console.log('content: ', content)
})