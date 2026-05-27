export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter+6}`
  }
  element.addEventListener('click', () => setCounter(counter + 6))
  setCounter(0)
}
