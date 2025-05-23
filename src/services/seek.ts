import JobFetcher from "./jobfetcher";
/**
 * SeekFetcher class handles the automation of job searching on seek.com.au
 * It implements the JobFetcher interface to provide standardized job searching functionality
 */
class SeekFetcher extends JobFetcher {
  constructor() {
    super("https://www.seek.com.au");
  }
}

const seekFetcher = new SeekFetcher();

export default seekFetcher;
