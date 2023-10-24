import observe from './observe'
import Watcher from './watcher'
let obj = {
  name: '张三',
  job: {
    salary: '15K',
    friend: ['李四', '王五']
  },
}




observe(obj)
new Watcher(obj, 'name',(val) => {
  console.log('★★★★★★', val)
})

obj.name = '李四'
setTimeout(() => {
  obj.name = '王五'
},3000)


function changeName(obj){
  obj.name = '李四'
  return obj
}

