"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">VidyaGPT</h2>
          <p className="mt-1 text-sm text-gray-500">
            Empowering India's teachers with AI.
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs mt-6 text-gray-600 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} VidyaGPT. Made with 🇮🇳 for India's
        educators.
      </div>
    </footer>
  );
};

export default Footer;
