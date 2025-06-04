import Operator from "./operator";

export default class Seek extends Operator {
  fetchJDInfo(): JDInfo {
    const title = document.querySelector(
      'h1[data-automation="job-detail-title"] a'
    ) as HTMLAnchorElement;
    const company = document.querySelector(
      'span[data-automation="advertiser-name"]'
    ) as HTMLSpanElement;
    const location = document.querySelector(
      'span[data-automation="job-detail-location"]'
    ) as HTMLSpanElement;
    const detail = document.querySelector(
      'div[data-automation="jobAdDetails"]'
    ) as HTMLDivElement;

    if (!title || !company || !location || !detail) {
      alert("Job detail not found");
      throw new Error("Job detail not found");
    }

    const jdInfo: JDInfo = {
      title: title.innerText || "",
      company: company.innerText || "",
      location: location.innerText || "",
      detail: detail.innerText || "",
      url: title.href || "",
    };
    return jdInfo;
  }

  getJDCountOnCurPage(): number {
    return document.querySelectorAll('[data-card-type="JobCard"]').length;
  }

  nextPage(): boolean {
    const nextPageButton = document.querySelector(
      'a[aria-label="Next"][aria-hidden="false"]'
    ) as HTMLAnchorElement;
    if (nextPageButton) {
      nextPageButton.click();
      return true;
    }
    return false;
  }

  clickJD(id: number) {
    const jobCard = document.querySelector(`#jobcard-${id}`) as HTMLElement;
    if (jobCard) {
      jobCard.click();
    }
    throw new Error("Job card not found");
  }
}
