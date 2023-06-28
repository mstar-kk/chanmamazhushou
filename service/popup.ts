import { EVENT_ID } from "./lib/constant";
import * as utils from "./lib/utils";

let exportSpeakBtn = document.getElementById("exportSpeakBtn");
let packUpSpeakBtn = document.getElementById("packUpSpeakBtn");
if (!exportSpeakBtn) {
  throw Error("插件错误");
}
packUpSpeakBtn.addEventListener("click", async () => {
  const tab = await utils.getCurrentTab();
  const isSpeakTab = utils.checkSpeakPage(tab);

  if (!isSpeakTab) {
    utils.alter("请切换到话术详情页");
    return;
  }
  chrome.tabs.sendMessage(
    tab.id,
    { action: EVENT_ID.SPEAK_PACK_UP },
    utils.handleRes
  );
});
exportSpeakBtn.addEventListener("click", async () => {
  const tab = await utils.getCurrentTab();
  const isSpeakTab = utils.checkSpeakPage(tab);

  if (!isSpeakTab) {
    utils.alter("请切换到话术详情页");
    return;
  }
  chrome.tabs.sendMessage(
    tab.id,
    { action: EVENT_ID.SPEAK_EXPORT },
    utils.handleRes
  );
});
