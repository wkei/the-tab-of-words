export const randomArrEl = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const getNextArrEl = (currentValue, arr) => {
  const currentIdx = arr.indexOf(currentValue)
  const nextIdx = currentIdx + 1 >= arr.length ? 0 : currentIdx + 1
  return arr[nextIdx]
}
