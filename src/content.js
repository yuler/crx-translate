
console.log('Load content.js')

let $translate = document.querySelector('translate')
if (!$translate) {
  $translate = document.createElement('translate')
}
window.document.body.append($translate)

window.document.addEventListener('mouseup', event => {
  const selection = window.getSelection().toString()
  if (selection) {
    const { x, y } = event
    $translate.style.transform = `translateX(${x}px) translateY(${y}px)`
    $translate.textContent = selection
    console.log($translate)
  }
})
