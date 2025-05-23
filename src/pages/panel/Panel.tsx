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

  useEffect(() => {
    const storedData: string | null = localStorage.getItem(keyname);
    if (storedData) {
      const parsed: PanelFormValues = JSON.parse(storedData) as PanelFormValues;
      setFormValues(parsed);
    }
  }, []);

  const onChange: InputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit: SubmitHandler = (e) => {
    e.preventDefault();
    model.current?.showModal();
    // Save the form values to local storage
    localStorage.setItem(keyname, JSON.stringify(formValues));
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
      <form onSubmit={handleSubmit}>
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
            required
          ></textarea>
          <p className="label">
            You should list all your skills and relevant experiences for the
            best match.
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
              <button className="btn">Stop Matching</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
