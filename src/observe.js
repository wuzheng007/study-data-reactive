import { def } from './utils.js'
import Dep from './dep.js'
import { arrayMethods } from './array.js'
class Observer {
  constructor(value) {
    this.dep = new Dep()
    // 给实例添加__ob__属性，值为实例对象滋生（观察者），且不可遍历
    def(value, '__ob__', this, false)
    this.value = value
    if(Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods )
      this.observeArray(value)
    }else {
      this.walk()
    }
  }
  // 遍历所有属性并将它们转换为getter/setter。此方法只应在值类型为Object时调用。
  walk() {
    for (let key in this.value) {
      defineReactive(this.value, key)
    }
  }
  // 观察数组项的列表
  observeArray(value) {
    value.forEach(item => {
      observe(item)
    })
  }
}
// 在对象上定义一个响应属性
function defineReactive(data, key, value = data[key]) {
  const dep = new Dep()
  const childOb = observe(value)
  Object.defineProperty(data, key, {
    enumerable: true, // 可遍历
    configurable: true, // 可配置，比如可以删除
    get() {
      if(Dep.target) {
        dep.depend()
        if(childOb) {
          childOb.dep.depend()
        }
      }
      console.log('==data==',data)
      return value
    },
    set(newVal) {
      if (newVal === value) return
      value = newVal
      observe(newVal)
      // 发布订阅模式，通知dep
      dep.notify()
    }
  })
}
/* 尝试为一个值创建一个观察者实例，
如果观察成功，则返回新的观察器;
或者是现有的观察者，如果值已经有一个的话 */
export default function observe(data) {
  // data不存在或data不是对象
  if (!data || typeof data !== 'object') {
    return
  }
  let ob
  // 指定的对象自身有指定的属性返回true，继承的或不存在返回false
  if (Object.hasOwn(data, '__ob__')) {
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}