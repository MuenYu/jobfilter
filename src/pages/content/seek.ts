chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "getJDCountOnCurPage":
      sendResponse(getJDCountOnCurPage());
      break;
    case "nextPage":
      sendResponse(nextPage());
      break;
    case "clickJD":
      clickJD(message.id);
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

function clickJD(id: number) {
  const jobCard = document.querySelector(`#jobcard-${id}`) as HTMLElement;
  if (jobCard) {
    jobCard.click();
  }
  throw new Error("Job card not found");
}
