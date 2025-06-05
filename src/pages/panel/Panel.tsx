import JobFetcher from "@src/jobfetcher/jobfetcher";
import LinkedinFetcher from "@src/jobfetcher/linkedin";
import SeekFetcher from "@src/jobfetcher/seek";
import { useState, useRef, useEffect } from "react";

const keyname: string = "panelFormData";

type InputChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Panel() {
  const model = useRef<HTMLDialogElement>(null);
  const [formValues, setFormValues] = useState<PanelFormValues>({
    keywords: "",
    criteria: "",
  });
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    // save form values to chrome local storage
    chrome.storage.local.get(keyname).then((data) => {
      if (data[keyname]) {
        const parsed: PanelFormValues = data[keyname] as PanelFormValues;
        setFormValues(parsed);
      }
    });
  }, []);

  const onChange: InputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit: SubmitHandler = async (e) => {
    e.preventDefault();
    model.current?.showModal();
    // read form values from state
    chrome.storage.local.set({ [keyname]: formValues });
    abortController.current = new AbortController(); // Create a new abort controller for each jo
    await matchJobs(abortController.current.signal); // Start the matching task
    model.current?.close(); // Close the modal after the task is finished
  };

  const onCancel = (): void => {
    abortController.current?.abort(); // Abort the current matching task
    alert("Matching canceled!");
  };

  const matchJobs = async (signal: AbortSignal): Promise<void> => {
    const seek: JobFetcher = new SeekFetcher(formValues);
    const linekdin: JobFetcher = new LinkedinFetcher(formValues);
    await Promise.all([seek.run(signal), linekdin.run(signal)]);
  };

  return (
    <div className="p-4 mx-auto">
      {/* Project Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Job Filter</h1>
        <p className="text-gray-600 mt-2">
          Find the perfect job match for your skills
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={onSubmit}>
        {/* Search Keywords */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Search Keywords</legend>
          <input
            name="keywords"
            type="text"
            className="input w-full validator"
            placeholder="e.g., Software Engineer"
            value={formValues.keywords}
            onChange={onChange}
            required
            maxLength={50}
          />
          <p className="label">
            The keywords will be used to search for jobs in supported job
            boards.
          </p>
        </fieldset>

        {/* Match Criteria */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Match Criteria</legend>
          <textarea
            name="criteria"
            className="textarea w-full validator"
            placeholder="e.g., 3 years experience of React"
            value={formValues.criteria}
            onChange={onChange}
            maxLength={1000}
            rows={15}
            required
          ></textarea>
          <p className="label">
            Matching criteria for all scanned jobs. List only necessary
            conditions to maximize your job match.
          </p>
        </fieldset>

        {/* Submit Button */}
        <fieldset className="fieldset">
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Jobs
          </button>
        </fieldset>
      </form>

      {/* Modal: the task is running */}
      <dialog className="modal" ref={model}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Matching Start!</h3>
          <p className="py-4">
            It might take a while to match your skills with jobs, so please be
            patient. Don't run the search again until the task is finished.
          </p>
          <span className="loading loading-dots loading-xl"></span>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={onCancel}>
                Stop Matching
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
