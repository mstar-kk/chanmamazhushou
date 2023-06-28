export async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    lastFocusedWindow: true,
  });
  return tab;
}
export async function alter(message: string) {
  document.defaultView.alert(message);
}

/**
 * 检查当前标签页是否是话术详情
 * @param {Tab} tab 当前标签页
 */
export function checkSpeakPage(tab: chrome.tabs.Tab): boolean {
  const CHECK_SPEAK_PAGE_REGEXP = /.*chanmama.com\/speakDetail\/.*/;
  return CHECK_SPEAK_PAGE_REGEXP.test(tab.url);
}

export function handleRes(res: any) {
  if (res === "成功") {
    return;
  }
  alter(res);
}

export function saveAsFile(content:string, filename: string) {
  // 创建a标签
  var eleLink = document.createElement('a')
  // 设置a标签 download 属性，以及文件名
  eleLink.download = filename
  // a标签不显示
  eleLink.style.display = 'none'
  // 获取字符内容，转为blob地址
  var blob = new Blob([content])
  // blob地址转为URL
  eleLink.href = URL.createObjectURL(blob)
  // a标签添加到body
  document.body.appendChild(eleLink)
  // 触发a标签点击事件，触发下载
  eleLink.click()
  // a标签从body移除
  document.body.removeChild(eleLink)
}
