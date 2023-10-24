function def(obj, key, value, isEnumerable) {
  Object.defineProperty(obj, key, {
    value: value,
    enumerable: isEnumerable,
    configurable: true,
    writable: true
  })
}

export {
  def
}