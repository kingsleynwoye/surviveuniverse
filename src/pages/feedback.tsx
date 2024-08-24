import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = () => {
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
        {submitted ? (
          <p className="bg-green-100 text-green-700 p-4 rounded">
            Thank you for your feedback!
          </p>
        ) : (
          <>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts"
              className="w-full p-3 mb-4 border rounded"
            />
            <button
              onClick={submitFeedback}
              className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </>
        )}
        <Link href="/">
          <Link href="/" className="block mt-8 text-green-600 hover:underline">
            Back to Home
          </Link>
        </Link>
      </main>
      <Footer />
    </>
  );
}
