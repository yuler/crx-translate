const appid = '20200725000526249'
const salt = '1435660288'
const secret = 'xWO_ItiWsA_jtnGPJwu4'

chrome.runtime.onMessage.addListener(function (message, sender, reply) {
  console.log(message)
  const { selection, add } = message
  if (selection) {
    const sign = md5(appid + selection + salt + secret)
    // refs: https://api.fanyi.baidu.com/doc/21
    fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?q=${selection}&from=auto&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`)
      .then(response => response.json())
      .then(data => {
        const result = data.trans_result[0].dst
        reply({ result })
      })
      .catch(err => {
        reply({ result: JSON.stringify(err) })
      })
    return true
  } else if (add) {
    chrome.storage.sync.get(data => {
      const { url, token } = data
      if (!url) {
        reply({ result: '请在 Options 设置`URL`地址 ' })
        return
      }
      fetch(`${url}?word=${add}`)
        .then(() => {
          reply({ result: '添加成功' })
        })
        .catch(err => {
          reply({ result: JSON.stringify(err) })
        })
    })
  }
  return true
})
