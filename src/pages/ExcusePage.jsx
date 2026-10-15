import React, { useState } from "react";
import brainImage from "../assets/brain.png";
import { motion } from "framer-motion";
import { Button } from "../components/button2";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const ExcusePage = () => {
  const [situation, setSituation] = useState("");
  const [who, setWho] = useState("");
  const [urgency, setUrgency] = useState("low");
  const [excuse, setExcuse] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateExcuse = async () => {
    if (!situation.trim() || !who.trim()) {
      alert("Please fill in both fields to generate a cosmic excuse!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.excuse, {
        whatHappened: situation,
        who,
        urgency,
      });

      const generated = response.data.excuse;
      setExcuse(generated);
      setHasGenerated(true);
      setCopied(false);
    } catch (err) {
      console.error("Error generating excuse:", err);
      alert("Failed to generate excuse. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(excuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-4 text-center tracking-tight"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Excuses So Wild, They Warp Reality!
      </motion.h1>

      <motion.img
        src={brainImage}
        alt="Brain"
        className="w-28 h-28 md:w-32 md:h-32 mb-6 drop-shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      <motion.div
        className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 w-full max-w-xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              What's the situation?
            </label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., I missed a class/test/presentation..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Who needs to hear the excuse?
            </label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="e.g., Professor, Manager, Parent..."
              value={who}
              onChange={(e) => setWho(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              How urgent is this?
            </label>
            <select
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="low">Low (Chill Vibes)</option>
              <option value="medium">Medium (Mild Panic)</option>
              <option value="high">High (Time-Sensitive Disaster)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-center">
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  generateExcuse();
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
              >
                {loading ? "Generating..." : "Generate Excuse"}
              </Button>
            </motion.div>
          </div>
        </form>

        {hasGenerated && (
          <motion.div
            className="mt-6 bg-gray-800 border border-purple-700 rounded-lg p-4 shadow-inner text-sm whitespace-pre-line relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {excuse}

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCopy}
                className="text-xs px-4 py-1 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
