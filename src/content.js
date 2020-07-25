
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
    $translate.style.display = 'inline-block'
    $translate.textContent = `'${selection}' 翻译中`
    chrome.runtime.sendMessage({ selection }, function(response) {
      $translate.textContent = response.result
    })
  } else {
    $translate.style.display = 'none'
  }
})
