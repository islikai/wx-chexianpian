const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 
 * @param {*} 请求方法 
 */
const fetch = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

module.exports = {
  formatTime,
  fetch,
}
