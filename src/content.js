
console.log('Load content.js')

let $translate = document.querySelector('translate')
let $add = document.querySelector('translate a')
if (!$translate) {
  $translate = document.createElement('translate')
  $text = document.createElement('p')
  $add = document.createElement('a')
  $add.textContent = '+'
  $translate.append($text)
  $translate.append($add)
}
window.document.body.append($translate)

let word
window.document.addEventListener('mouseup', event => {
  const selection = window.getSelection().toString()
  if (selection) {
    word = selection
    const { x, y } = event
    $translate.style.transform = `translateX(${x}px) translateY(${y}px)`
    $translate.style.display = 'inline-block'
    $text.textContent = `'${selection}' 翻译中`
    chrome.runtime.sendMessage({ selection }, function(response) {
      $text.textContent = response.result
    })
  } else {
    $translate.style.display = 'none'
  }
})

$add.addEventListener('click', event => {
  chrome.runtime.sendMessage({ add: word }, function(response) {
    alert(response.result)
  })
})
