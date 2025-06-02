chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "getJDCountOnCurPage":
      sendResponse(getJDCountOnCurPage());
      break;
    case "nextPage":
      sendResponse(nextPage());
      break;
  }
});

function getJDCountOnCurPage(): number {
  return document.querySelectorAll('[data-card-type="JobCard"]').length;
}

function nextPage(): boolean {
  const nextPageButton = document.querySelector(
    'a[aria-label="Next"][aria-hidden="false"]'
  ) as HTMLAnchorElement;
  if (nextPageButton) {
    nextPageButton.click();
    return true;
  }
  return false;
}
