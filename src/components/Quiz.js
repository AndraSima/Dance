import React, { useState } from "react";
import axios from "axios";

const questions = [
  { question: "Câtă energie ai în mod normal?", options: ["Scăzută", "Moderată", "Ridicată"] },
  { question: "Ce muzică preferi?", options: ["Clasică", "Pop", "Hip-hop", "Latino"] },
  { question: "Îți plac mișcările lente sau rapide?", options: ["Lente", "Mixte", "Rapide"] },
  { question: "Cât de des faci exerciții fizice?", options: ["Niciodată", "O dată pe săptămână", "De 2-3 ori pe săptămână", "În fiecare zi"] },
  { question: "Preferi să dansezi singur sau în grup?", options: ["Singur", "În grup", "Nu am o preferință"] },
];

function Quiz({ onResult }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [step, setStep] = useState(0);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
    if (step < questions.length - 1) setStep(step + 1);
    else submitAnswers(newAnswers);
  };

  const submitAnswers = async (answers) => {
    const prompt = `Pe baza acestor răspunsuri: ${answers.join(", ")}, ce stil de dans li s-ar potrivi (ex: hip-hop, tango, salsa etc)? Răspunde DOAR cu un stil pentru toate variantele de raspuns alese, nu pentru fiecare raspuns in parte.
    In functie de toate raspunsurile oferite, tu propune un singur stil de dans, ca o concluzie, care se poate potrivi cu alegerea utilizatorului.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
        }
      );
      const style = response.data.choices[0].message.content.trim();
      onResult(style);
    } catch (err) {
  console.error("Eroare la OpenAI API:", err.response ? err.response.data : err.message);
  alert("Eroare la OpenAI API:", err.response ? err.response.data : err.message);
    }

  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 ml-6 md:ml-20">
      <h2 className="text-2xl font-semibold mb-4">{questions[step].question}</h2>
      <div className="space-y-2">
        {questions[step].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="w-full px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium rounded-lg transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
