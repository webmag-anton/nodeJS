// класс EventEmitter получаем из встроееного модуля events
const EventEmitter = require('events')

// теперь можно создавать объекты от данного класса и с помощью них диспатчить различные события
const emitter = new EventEmitter()

// добавляем прослушку события someEvent с помощью метода on('eventName', cb)
emitter.on('someEvent', data => {
	console.log('ON: someEvent', data)  
})

// запускаем (диспатчим) событие someEvent; вторым параметром идут любые данные, которые могут обработаться в слушателе
// диспатчить можно только после установки прослушки (обработчика)
emitter.emit('someEvent', {a: 1})  // ON: someEvent { a: 1 }
setTimeout( () => {
	emitter.emit('someEvent', {b: 2})
}, 500)



// можно наследоваться от EventEmitter
class Dispatcher extends EventEmitter {
	subscribe(eventName, cb) {
		console.log('[subscribing...]')
		this.on(eventName, cb)
	}	

	dispatch(eventName, data) {
		console.log('[dispatching...]')
		this.emit(eventName, data)
	}	
}

const dis = new Dispatcher()

dis.subscribe('myevent', data => {
	console.log('ON: myevent', data)
})
dis.dispatch('myevent',  {1: 'name'})