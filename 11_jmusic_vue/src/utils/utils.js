function formatNumber(num){
  let n = parseInt(num)
  switch(true){
    case n<10000: 
      break
    case n<100000000:
      n = `${parseInt(n / 10000)}万`
      break
    case n >= 100000000:
      n = `${parseInt(n / 100000000)}亿`
      break
  }
  return n
}

function formatTime(time){
  let n = parseFloat(time),
    m = 0,
    s = 0;
  m = parseInt(n / 60)
  s = parseInt(n % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function formatLyric(lyricStr){
  let lyricList = lyricStr.split('\n'),
    pattern = /\[(\d{2}):(\d{2}.\d+)\]/,
    newLyricList = []
  lyricList.forEach((item, index)=>{
    let result = item.match(pattern)
    if(result !== null){
      let lineObj = {
        time: result[1] * 60 + parseFloat(result[2]),
        line: item.replace(pattern, ''),
        index        
      }
      newLyricList.push(lineObj)
    }
  })
  return newLyricList
}

export {
  formatNumber,
  formatTime,
  formatLyric,
}