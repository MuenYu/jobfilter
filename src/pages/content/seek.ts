import { slowDelay } from "@src/util";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "fillSearchForm":
      fillSearchForm(message.keywords);
      break;
  }
});

// fill the search form on seek.com.au
async function fillSearchForm(keywords: string): Promise<void> {
  const submitButton = document.querySelector("#searchButton") as HTMLButtonElement;

  // Keywords setting
  const searchInput = document.querySelector("#keywords-input") as HTMLInputElement;
  searchInput.value = keywords;
  searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  await slowDelay();
  const inputMenuOption = document.querySelector(`[aria-label="${keywords.toLowerCase()}"]`) as HTMLLIElement;
  if (inputMenuOption) inputMenuOption.click();
  else submitButton.click();
  
  await slowDelay();
  
  // listing time setting
  const todayItem = document.querySelector("[aria-label='Today']") as HTMLLIElement;
  if (todayItem) todayItem.click();
  
  await slowDelay();
  submitButton.click();
}
