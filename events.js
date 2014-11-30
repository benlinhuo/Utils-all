/*
 自定义事件管理：events  Manage
*/

function eventsMge() {
	this.events = {};
}

/*
  事件绑定
  @param eventsName string 可以是以空格隔开的多个事件名
  @param callback function 对应事件需要执行的函数
*/
eventsMge.prototype.on = function(eventsName, callback) {
	var events = eventsName.split(' ');
	for (var i = 0; i < events.length; i++) {
		var name = events[i];
		this.events[name] = this.events[name] || [];
		this.events[name].push(callback);
	}
}

/*
  解除绑定的回调函数
  @param eventName 事件名称
  @param callback 对应的事件执行回调函数
*/
eventsMge.prototype.off = function(eventName, callback) {
	//当eventName和callback都为空时，直接清除所有事件(使用方法：off())
	if (!(eventName || callback)) {
		this.events = {};
	}
	var list = this.events[eventName];
	if (list) {
		if (callback) {
			for (var i = list.length - 1; i > -1; i--) {
				if (callback === list[i]) {
					list.splice(i, 1);//删除数组的该元素
				}
			}
		} else {
			//如果没有指定callback，则删除该eventName绑定的所有函数
			delete this.events[eventName];
		}
	}
}

/*
  事件触发
  @param eventName 事件名称
  @param args 执行callback传入的参数
*/
eventsMge.prototype.emit = function(eventName, args) {
	var list = this.events[eventName];
	// Copy callback lists to prevent modification
	list = list.slice();
	for (var i = 0; i < list.length; i++) {
		list[i](args);
	}
}

/*
  只执行一次行为的绑定方法，事件执行后立即解除绑定
  @param eventName  事件名称 
  @param callback 回调函数
*/
eventsMge.prototype.once = function(eventName, callback) {
	var self = this;
	this.on(eventName, function() {
		callback.apply(this, arguments);
		self.off(eventName, arguments.callee);
	});
}