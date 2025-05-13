import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic } = body;

  if (!topic) {
    return NextResponse.json({ error: "No topic provided" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are VidyaGPT — a fun but detailed AI teacher who gives rich, student-friendly lessons. Always return JSON structured like this:

{
  "title": "Lesson Title",
  "sections": [
    {
      "heading": "Section Title",
      "content": "Give long, structured, clear and helpful content here. Use paragraphs and examples if needed."
    },
    ...
    {
      "heading": "🧠 Quiz Time!",
      "content": "1. Question?\n a) Option\n b) Option\n\n2. Another?"
    }
  ]
}

Use a fun, crisp, and easy tone. The final section should be a multi-question quiz with clear formatting.
Return valid JSON only.
        `,
        },
        {
          role: "user",
          content: `Create an engaging student-friendly lesson on: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const lessonContent = completion.choices[0].message.content;

    if (!lessonContent) {
      return NextResponse.json(
        { error: "Empty response from OpenAI" },
        { status: 500 }
      );
    }

    try {
      const lesson = JSON.parse(lessonContent);
      return NextResponse.json({ lesson });
    } catch (err) {
      console.error("Failed to parse JSON from OpenAI:", lessonContent);
      return NextResponse.json(
        { error: "Invalid response format from OpenAI" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating lesson:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
