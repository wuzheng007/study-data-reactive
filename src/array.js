import { def } from './utils'
// vue改写的7个数组方法
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverser']
// 备份Array的原型
const arrayPrototype = Array.prototype

const arrayMethods = Object.create(arrayPrototype)

// 拦截改写的数组方法
methods.forEach(method => {
  // 缓存数组的原方法
  const originMethod = arrayPrototype[method]
  def(arrayMethods, method, function (...args) {
    // 保存数组原生方法的返回值，后面返回出去，不能丢失原生方法的功能
    const result = originMethod.apply(this, args)
    // push unshift splice 这三个方法可能会添加数组项，需要另外对新加数据做处理
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // arr.splice(开始索引，数量，...要加入的数组元素)
        inserted = args.slice(2)
    }
    const ob = this.__ob__
    if(inserted) {
      ob.observeArray(inserted)
    }
    console.log('====调用了改写的数组方法====')
    return result
  }, false)
})

export {
  arrayMethods
}