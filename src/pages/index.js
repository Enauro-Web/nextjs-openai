"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("")
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      // console.log(data);
      setResult(data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="bg-zinc-950 h-screen flex justify-center items-center">
      <form action="">
        <div className="flex flex-col gap-5 justify-center items-center w-2xl max-w-3xl">
          <h1 className="text-white font-bold text-4xl">
            What do you know about .... ?
          </h1>
          <input
            type="text"
            placeholder="Set a prompt"
            onChange={(e) => setPrompt(e.target.value)}
            className="p-5 rounded-md bg-neutral-500 text-white w-full"
          />
          <button
            onClick={onSubmit}
            className="bg-green-500 p-5 text-white text-2xl rounded-md block mt-2 w-full disabled:opacity-50"
            disabled={!prompt || loading}
          >
            Generate
          </button>
          {result && (
            <p className="mt-20 text-3xl font-bold text-white">{result}</p>
          )}
          {loading && (
            <p className="mt-20 text-3xl font-bold text-white">Thinking ....</p>
          )}
        </div>
      </form>
    </div>
  );
}
