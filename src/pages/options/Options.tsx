import React, { useEffect, useState } from "react";

const keyname: string = "settings";

type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
type SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Options() {
  const [settings, setSettings] = useState<Settings>({
    ollamaUrl: "http://localhost:11434",
    ollamaModel: "qwen3:14b",
  });

  useEffect(() => {
    chrome.storage.local.get(keyname, (data) => {
      if (data[keyname]) {
        setSettings(data[keyname]);
      }
    });
  }, []);

  const onSubmit: SubmitHandler = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ [keyname]: settings });
    alert("Settings saved");
  };

  const onChange: InputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="max-w-xl w-full p-4">
      <h1 className="text-4xl font-bold text-primary">Job Filter Settings</h1>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ollama API endpoint</legend>
          <input
            name="ollamaUrl"
            type="text"
            className="input w-full validator"
            placeholder="http://localhost:11434"
            value={settings.ollamaUrl}
            onChange={onChange}
            required
            maxLength={50}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ollama model</legend>
          <input
            name="ollamaModel"
            type="text"
            className="input w-full validator"
            placeholder="qwen3:14b"
            value={settings.ollamaModel}
            onChange={onChange}
            required
            maxLength={50}
          />
        </fieldset>

        <fieldset className="fieldset">
          <button className="btn btn-primary">Save</button>
        </fieldset>
      </form>
    </div>
  );
}
