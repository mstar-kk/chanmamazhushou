import { EVENT_ID } from "./lib/constant";
import SpeakDetail from "./lib/speak-detail";
import * as utils from './lib/utils';

function speakDetailExport(
  request: chrome.runtime.MessageSender,
  sendRes: (response?: any) => void
) {
  const speakDetail = new SpeakDetail(document);
  const title = speakDetail.getTitle();
  const content = speakDetail.exportText();
  utils.saveAsFile(content, title + '.txt');
  sendRes("成功");
}
function speakDetailPackUp(
  request: chrome.runtime.MessageSender,
  sendRes: (response?: any) => void
) {
  const speakDetail = new SpeakDetail(document);
  speakDetail.formatTable();
  sendRes("成功");
}
function cmdEventHandle(
  message: any,
  request: chrome.runtime.MessageSender,
  sendRes: (response?: any) => void
) {
  console.log(message);
  if (message.action === EVENT_ID.SPEAK_EXPORT) {
    speakDetailExport(request, sendRes);
  } else if (message.action === EVENT_ID.SPEAK_PACK_UP) {
    speakDetailPackUp(request, sendRes);
  } else {
    console.log("未匹配");
    sendRes("失败");
  }
}

chrome.runtime.onMessage.addListener(cmdEventHandle);
