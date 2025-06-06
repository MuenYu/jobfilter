import React from "react";

type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Options() {
  const onSubmit: SubmitHandler = () => {};

  return (
    <div className="max-w-xl w-full p-4">
      <h1 className="text-4xl font-bold text-primary">Job Filter Settings</h1>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Platform Setting</legend>
          <div className="flex gap-5">
            <label className="label">
              <input
                name="platform"
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              Seek
            </label>
            <label className="label">
              <input
                name="platform"
                type="checkbox"
                defaultChecked
                className="checkbox"
              />
              Linkedin
            </label>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ollama Setting</legend>
          <input
            name="ollamaUrl"
            type="text"
            className="input w-full validator"
            placeholder="http://localhost:11434"
            // value={formValues.keywords}
            // onChange={onChange}
            required
            maxLength={50}
          />
        </fieldset>

        <fieldset className="fieldset">
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M16 3v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3" />
              <rect x="8" y="15" width="8" height="4" rx="1" />
            </svg>
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
}
