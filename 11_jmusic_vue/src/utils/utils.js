function formatNumber(num){
  let n = parseInt(num)
  if(n < 100000){
    return n
  }else if(n >= 100000){
    return `${parseInt(n / 100000)}万`
  }
}

function formatTime(time){
  let n = parseFloat(time),
    m = 0,
    s = 0;
  m = parseInt(n / 60)
  s = parseInt(n % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export {
  formatNumber,
  formatTime,
}