import Operator from "./operator";
import Seek from "./seek";

const mapping: { [key: string]: Operator } = {
  seek: new Seek(),
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.platform && mapping[message.platform]) {
    const operator = mapping[message.platform];
    switch (message.action) {
      case "getJDCountOnCurPage":
        sendResponse(operator.getJDCountOnCurPage());
        break;
      case "nextPage":
        sendResponse(operator.nextPage());
        break;
      case "clickJD":
        operator.clickJD(message.id);
        break;
      case "fetchJDInfo":
        sendResponse(operator.fetchJDInfo());
        break;
    }
  }
});
