document.getElementById('save').addEventListener('click', save)

function save() {
  const url = document.getElementById('url').value
  const token = document.getElementById('token').value
  if (!url) { alert('Field `url` required!')}
  chrome.storage.sync.set({
    url,
    token
  })
}
