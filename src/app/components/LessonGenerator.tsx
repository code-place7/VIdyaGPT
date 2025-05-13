"use client";
import { useState } from "react";
import Button from "./Button";
import GPTLoading from "./GPTLoading";

export default function LessonGenerator() {
  const [topic, setTopic] = useState("");
  const [lesson, setLesson] = useState<{
    title: string;
    sections: { heading: string; content: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateLesson = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setLesson(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      const parsedLesson =
        typeof data.lesson === "string" ? JSON.parse(data.lesson) : data.lesson;

      setLesson(parsedLesson);
    } catch (error) {
      console.error("Lesson generation failed:", error);
      setLesson({
        title: "Error",
        sections: [
          {
            heading: "Oops!",
            content: "Failed to generate lesson. Please try again.",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full bg-black text-white py-16 px-6 md:px-32"
      id="lessongenerator"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        📚 Generate a Lesson Instantly
      </h2>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
        <input
          className="flex-1 p-4 rounded-md bg-gray-800 text-white outline-none"
          placeholder="Enter a topic (e.g., Photosynthesis)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className="bg-white text-black py-3 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105 cursor-pointer duration-300"
          onClick={generateLesson}
        >
          {loading ? "Generating..." : "Generate Lesson"}
        </button>
      </div>

      {/* Show loading message */}
      {loading && <GPTLoading />}

      {lesson?.title && (
        <h2 className="text-4xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          {lesson.title}
        </h2>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {lesson?.sections?.map((section, idx) => (
          <div
            key={idx}
            className="group relative p-6 rounded-2xl bg-[#1a1a1a] shadow-lg border border-gray-800 hover:border-cyan-500 transition duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-700/10 to-violet-700/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm z-0" />

            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3 group-hover:text-violet-400 transition">
                {section.heading}
              </h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
