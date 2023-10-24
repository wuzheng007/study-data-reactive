let uid = 0

// 一个dep是一个可以有多个的可观察对象订阅它的指令
export default class Dep {
  constructor() {
    // 用数组存储自己的订阅者，sub是subscriber（订阅者）的缩写，sub是Watcher的实例
    this.subs = []
    this.id = uid++
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    /* 正在评估的当前目标观察者。
    这是全局唯一的，因为只有一个观察者
    可以一次求值。 */
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify() {
    // 浅拷贝
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}