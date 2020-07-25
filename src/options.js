document.getElementById('save').addEventListener('click', save)

const $url = document.getElementById('url')
const $token = document.getElementById('token')

;(function init() {
  chrome.storage.sync.get(data => {
    const { url, token } = data
    $url.value = url    
    $token.value = token
  })
})()

function save() {
  url = $url.value
  token = $token.value
  if (!url) { alert('Field `url` required!')}
  chrome.storage.sync.set({
    url,
    token
  })
}
