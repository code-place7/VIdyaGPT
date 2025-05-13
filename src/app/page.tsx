"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "./components/Button";
import Knowmore from "./components/Knowmore";
import LessonGenerator from "./components/LessonGenerator";

const greetings = [
  {
    text: "Sir",
    color: "text-blue-500",
  },
  {
    text: "Mam",
    color: "text-pink-500",
  },
];

export default function HomePage() {
  useGSAP(() => {
    const tl = gsap.timeline({ ease: "power2.out" });

    tl.from("h1", { opacity: 0, y: -50, duration: 1, stagger: 0.3 });

    gsap.to(".hero-3d-layout img", {
      scale: 1.1,
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div>
      <section id="hero" className="realtive overflow-hidden">
        <div className="absolute top-0 left-0 z-10 opacity-20 mb-10">
          <img src="bg.jpg" alt="topbackground" />
        </div>

        <div className="hero-layout">
          {/*Left Side  */}
          <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
            <div className="flex flex-col gap-7 ">
              <div className="hero-text">
                <h1>
                  Hello
                  <span className="slide">
                    <span className="wrapper">
                      {greetings.map((greeting) => (
                        <span
                          key={greeting.text}
                          className={`greeting block ${greeting.color}`}
                        >
                          {greeting.text}
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>

                <h1> Welcome To </h1>
                <h1 className="text-purple-500 font-bold underline ">
                  {" "}
                  VidyaGPT
                </h1>
              </div>
              <p className="text-white md:text-xl relatiev z-10 pointer-events-none">
                "AI-Powered Teaching Assistant for Every Indian Classroom."
              </p>
              <p className="text-white md:text-xl relatiev z-10 pointer-events-none">
                "Create Smarter Lessons in Seconds – With AI."
              </p>
              <Button
                classname="md:w-80 md:h-16 w-60 h-12"
                id="knowmore"
                text="know more"
              />
            </div>
          </header>
        </div>
        {/*Right side */}
        <figure>
          <div className="hero-3d-layout">
            <img src="/spacebg.jpg" alt="edubg" />
          </div>
        </figure>
      </section>

      <Knowmore />
      <LessonGenerator />
      {/* <Contact /> */}
    </div>
  );
}
