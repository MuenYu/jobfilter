chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => {
    console.error(error);
  });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openTab" && message.url && message.window) {
    chrome.tabs.create({
      url: message.url,
      active: false,
      windowId: message.window,
    })
  }
})