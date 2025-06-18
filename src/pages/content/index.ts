import Linkedin from "./linkedin";
import Operator from "./operator";
import Seek from "./seek";

const mapping: { [key: string]: Operator } = {
  seek: new Seek(),
  linkedin: new Linkedin(),
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.platform && mapping[message.platform]) {
    const operator = mapping[message.platform];

    const handleAsync = async () => {
      switch (message.action) {
        case "getJDCountOnCurPage":
          sendResponse(await operator.getJDCountOnCurPage());
          break;
        case "nextPage":
          sendResponse(await operator.nextPage());
          break;
        case "clickJD":
          sendResponse(await operator.clickJD(message.id));
          break;
        case "fetchJDInfo":
          sendResponse(await operator.fetchJDInfo());
          break;
      }
    };

    handleAsync();
    return true; // keep the channel until sendResponse is called
  }
});
