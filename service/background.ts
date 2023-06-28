import { PANEL_EVENT_ID } from "./lib/constant";

// import * as utils from "./lib/utils";
chrome.runtime.onInstalled.addListener(async () => {});
chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.name === PANEL_EVENT_ID.SPEAK_SAVE) {
    var data = JSON.parse(message.content);

    // let speak = "";
    // for (const row of data.data) {
    //   speak += row.topic_content_str;
    // }
    try {
      const result = await new Promise((resolve: any, reject: any) => {
        chrome.storage.local.set(
          {
            // "speak-content": data.data,
            speak: "save",
          },
          () => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            resolve(data.data);
          }
        );
      });
      // await chrome.storage.local.set();
      console.log("save", result);
      sendResponse("save speak");
    } catch (error) {
      console.log(error);
    }
  }
  if (message.name === "panel_url") {
    console.log(message.content);
  }
});
