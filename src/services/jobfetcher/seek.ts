import AI from "../ai/ai";
import JobFetcher from "./jobfetcher";
/**
 * SeekFetcher class handles the automation of job searching on seek.com.au
 * It implements the JobFetcher interface to provide standardized job searching functionality
 */
export default class SeekFetcher extends JobFetcher {
  constructor(agent:AI, formData: PanelFormValues) {
    super(agent, formData);
  }

  urlBuilder(): string {
    return `https://www.seek.com.au/${this.formData.keywords
      .toLowerCase()
      .replaceAll(" ", "-")}-jobs?daterange=1`;
  }
}
