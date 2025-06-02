import { slowDelay } from "@src/util";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "getJDCountOnCurPage":
      sendResponse(getJDCountOnCurPage());
      break;
  }
});

function getJDCountOnCurPage(): number  {
  return document.querySelectorAll('[data-card-type="JobCard"]').length;
}