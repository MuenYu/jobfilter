import JobFetcher from "./jobfetcher";
/**
 * Linkedin class handles the automation of job searching on linkedin.com
 * It implements the JobFetcher interface to provide standardized job searching functionality
 */
export default class LinkedinFetcher extends JobFetcher {
  constructor(formData: PanelFormValues) {
    super(formData);
    this.platform = "linkedin";
  }

  urlBuilder(): string {
    return `https://www.linkedin.com/jobs/search/?f_TPR=r86400&geoId=101452733&keywords=${this.formData.keywords.toLowerCase()}`;
  }
}
