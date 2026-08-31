"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, BrainCircuit, CheckCircle2, AlertCircle, Check } from "lucide-react";

interface QuizSectionProps {
  initialStream: string;
  onAssessmentCompleted?: () => void;
}

export default function QuizSection({ initialStream, onAssessmentCompleted }: QuizSectionProps) {
  const [currentStream, setCurrentStream] = useState<string>(initialStream || "Ayurveda");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      setQuizLoading(true);
      try {
        const res = await fetch(`/api/skills/quiz?stream=${currentStream}`);
        if (res.ok) {
          const data = await res.json();
          setQuizQuestions(data.questions || []);
          setUserAnswers({});
          setQuizSubmitted(false);
          setQuizResult(null);
        }
      } catch (err) {
        console.error("Quiz load error:", err);
      } finally {
        setQuizLoading(false);
      }
    }
    loadQuiz();
  }, [currentStream]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    setQuizLoading(true);
    try {
      const answersPayload = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));

      const res = await fetch("/api/skills/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: currentStream,
          answers: answersPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuizResult(data);
        setQuizSubmitted(true);
        if (onAssessmentCompleted) onAssessmentCompleted();
      }
    } catch (err) {
      console.error("Submit quiz error:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-ayush-dark">
            {currentStream} Clinical & Analytical Competency Test
          </h2>
          <p className="text-xs text-gray-500">
            Standardized questions evaluating diagnostic accuracy, pharmacopoeial norms, and clinical judgment.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-600">Stream:</span>
          <select
            value={currentStream}
            onChange={(e) => setCurrentStream(e.target.value)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
          >
            <option value="Ayurveda">Ayurveda</option>
            <option value="Yoga">Yoga & Naturopathy</option>
            <option value="Unani">Unani</option>
            <option value="Siddha">Siddha</option>
            <option value="Homeopathy">Homeopathy</option>
          </select>
        </div>
      </div>

      {quizLoading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-ayush-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-gray-500">Loading {currentStream} question bank...</p>
        </div>
      ) : quizSubmitted && quizResult ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-ayush-green/10 via-emerald-50 to-ayush-orange/10 border border-ayush-green/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-ayush-green uppercase tracking-widest">
                  Assessment Completed
                </span>
                <h3 className="text-2xl font-black text-ayush-dark">
                  Your Score: {quizResult.score} / {quizResult.totalQuestions} ({quizResult.percentage}%)
                </h3>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  quizResult.percentage >= 80 ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                  quizResult.percentage >= 60 ? "bg-amber-100 text-amber-800 border-amber-300" :
                  "bg-rose-100 text-rose-800 border-rose-300"
                }`}>
                  {quizResult.percentage >= 80 ? "Gold Badge Earned" : quizResult.percentage >= 60 ? "Silver Badge Earned" : "Bronze Level"}
                </span>
                <p className="text-[10px] text-gray-500 mt-1">Added to your Digital Portfolio</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Identified Core Strengths</h4>
              </div>
              <ul className="space-y-2">
                {quizResult.gapAnalysis?.strengths?.map((str: string, idx: number) => (
                  <li key={idx} className="text-xs text-emerald-950 flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center space-x-2 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Clinical & Knowledge Gaps</h4>
              </div>
              <ul className="space-y-2">
                {quizResult.gapAnalysis?.gaps?.length > 0 ? (
                  quizResult.gapAnalysis.gaps.map((gap: string, idx: number) => (
                    <li key={idx} className="text-xs text-amber-950 flex items-start space-x-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{gap}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-emerald-800">No major blindspots! Excellent performance.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-ayush-orange" />
              <span>AI Recommendations for Career Acceleration</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizResult.gapAnalysis?.recommendations?.map((rec: string, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-ayush-sand border border-ayush-green/20 text-xs text-gray-800">
                  {rec}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setUserAnswers({});
                setQuizResult(null);
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {quizQuestions.length > 0 ? (
            <>
              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-ayush-sand/50 border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-ayush-green-light text-ayush-green">
                        Question {qIdx + 1} of {quizQuestions.length} • {q.category}
                      </span>
                      {userAnswers[q.id] !== undefined && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Answered</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-ayush-dark">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt: string, optIdx: number) => {
                        const isSelected = userAnswers[q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3 rounded-xl text-left text-xs font-medium transition-all border ${
                              isSelected
                                ? "border-ayush-green bg-ayush-green text-white font-bold shadow-sm"
                                : "border-gray-200 bg-white hover:bg-gray-50 text-gray-800"
                            }`}
                          >
                            <span className="mr-2 opacity-75 font-mono">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Answered {Object.keys(userAnswers).length} of {quizQuestions.length} questions
                </p>
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length === 0 || quizLoading}
                  className="px-6 py-2.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & Generate AI Gap Report</span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-500 py-8 text-center">No questions found for this stream.</p>
          )}
        </div>
      )}
    </div>
  );
}
