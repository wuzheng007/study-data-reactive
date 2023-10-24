import Dep from './dep.js'
let uid = 0

/* 这个监视器解析表达式，收集依赖项，
并在表达式值改变时触发回调。
这用于$watch() api和指令 */
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  update() {
    this.run()
  }
  // 得到getter，并重新收集依赖项
  get() {
    Dep.target = this
    const target = this.target
    let value
    try {
      value = this.getter(target)
    } finally {
      Dep.target = null
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb) {
    const value = this.get()
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}


function parsePath(str) {
  const segments = str.split('.')
  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if(!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}