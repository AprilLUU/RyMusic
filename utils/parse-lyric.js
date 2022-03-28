
const timePattern = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split('\n')
  const lyricInfo = []
  for (const lineString of lyricStrings) {
    const timeResult = timePattern.exec(lineString)
    if (!timeResult) continue
    
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond
    const text = lineString.replace(timePattern, '')
    const lyricObj = {time, text}
    lyricInfo.push(lyricObj)
  }

  return lyricInfo
}