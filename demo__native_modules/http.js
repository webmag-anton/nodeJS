// встроеный модуль http позволяет создавать различные сервера
const http = require('http')
const fs = require('fs')
const path = require('path')

// метод createServer создает сервер, но его особенность в том что он вызывается и сразу завершается; 
// callback метода createServer принимает 2 параметра: 1й - объект request, служит для того чтобы мы получали 
// 																			информацию по запросу, который отправляет клиент на сервер; 
// 																			2й - объект response, отвечает за ответ сервера
const server = http.createServer( (req, res) => {
	console.log(req.url)  // url страницы, на которую переходим; в браузере не видно, только в консоле!

	// // в зависимости от того на какую страницу идет запрос, мы может отвечать пользователю следующими данными
	// if (req.url === '/') { //  если запрос на базовую (корневую) страницу ( http://localhost:3000 )
	// 	// то берем содержимое из public/index.html и, если не было ошибки при чтении, выводим его на запрашиваемую страницу
	// 	fs.readFile(path.join(__dirname, '../public', 'index.html'), (err, data) => {
	// 		if (err) {
	// 			throw err
	// 		}
	// 		// мы можем указывать напрямую статус ответа и, например, какие то хедеры; метод writeHead(statuscode, headers)
	// 		res.writeHead(200, {
	// 			'Content-Type': 'text/html',  // можно указать 'text/plain' - простой текст без парсинга тегов
	// 		})
	// 		// метод end вызавается для того, чтобы завершить ответ с сервера (отдать данные на запрос); обязателен к вызову
	// 		res.end(data)  // выводим контент из public/index.html на запрашиваемую страницу ( http://localhost:3000 )
	// 	})
	// } 
	// else if (req.url === '/contact') {
	// 	fs.readFile(path.join(__dirname, '../public', 'contact.html'), (err, data) => {
	// 		if (err) {
	// 			throw err
	// 		}
	// 		res.writeHead(200, {
	// 			'Content-Type': 'text/html',
	// 		})
	// 		res.end(data)
	// 	})
	// }

							// можно сделать этот код более универсальным

	// страницу запроса будем отслеживать автоматически с помощью req.url (показывает страницу запроса (перехода) без расширения для html)
	let filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url)

	// проверяем расширение
	const ext = path.extname(filePath)

	// что бы открыть css нужно указывать contentType ( Resource interpreted as Stylesheet but transferred with MIME type text/html )
	let contentType = 'text/html'
	switch (ext) {
		case '.css':
			contentType = 'text/css'
			break
		case '.js':
			contentType = 'text/javascript'
			break
		default:
			contentType = 'text/html'
	}

	if (!ext) { // если нет расширения
		filePath += '.html'
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(path.join(__dirname, '../public', 'error.html'), (err, data) => {
				if (err) {
					res.writeHead(500) // серверная ошибка
					res.end('Error')
				}

				res.writeHead(200, {
					'Content-Type': 'text/html'
				})
				res.end(data) // возвращаем страницу ошибки 404
			})
		}
		else {
			res.writeHead(200, {
				'Content-Type': contentType
			})
			res.end(content)
		}
	})

})

// чтобы сервер работал долго (в режиме runtime) нужно createServer зачейнить методом listen([port, hostname, backlog, callback]);
// если есть системная переменная PORT, тогда берем ее, иначе по умолчанию 3000 ( лучше делать так чем статически указывать порт )
const PORT = process.env.PORT || 3000 
server.listen(PORT, () => {
	console.log(`server has been started on port ${PORT}...`)  // можно в браузере открыть   http://localhost:3000
})

// Чтобы перезапускался сервер при изменениях в файлах (страница обновляться от этого не будет) нужен пакет nodemon; что бы 
// атоматизировать процесс можно в package.json в поле scripts добавить команду  "dev": "nodemon demo__native_modules/http.js"