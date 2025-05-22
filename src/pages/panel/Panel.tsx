import React from "react";
import "@pages/panel/Panel.css";

export default function Panel() {
  return (
    <div className="container p-4 mx-auto">
      {/* Project Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Job Filter</h1>
        <p className="text-gray-600 mt-2">
          Find the perfect job match for your skills
        </p>
      </div>

      {/* Search Form */}
      <form>
        {/* Search Keywords */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Search Keywords</legend>
          <input
            type="text"
            className="input"
            placeholder="e.g., Software Engineer"
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
            className="textarea"
            placeholder="e.g., 3 years experience of React"
          ></textarea>
          <p className="label">
            The keywords will be used to search for jobs in supported job
            boards. You should list all your skills and relevant experiences for
            the best match.
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
    </div>
  );
}
