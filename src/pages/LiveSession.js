import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS

const LiveSession = () => {
  const questions = [
    "What is React used for?",
    "Explain the virtual DOM.",
    "What are React hooks?",
    "What is the difference between state and props?",
    "What is JSX?",
    "How does useEffect work?",
    "What is the significance of keys in React lists?",
  ];

  const students = ["Alice", "Bob", "Charlie", "David", "Emma"];

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  const generateRandomQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  };

  const selectRandomStudent = () => {
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    setSelectedStudent(randomStudent);
  };

  const startSession = () => {
    setSessionActive(true);
    setCurrentQuestion("");
    setSelectedStudent("");
  };

  const endSession = () => {
    setSessionActive(false);
    setCurrentQuestion("");
    setSelectedStudent("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-50">
        <h1 className="text-center mb-3">Live Q&A Session</h1>
        <p className="text-muted text-center">Generate random questions and select students to answer.</p>

        {sessionActive ? (
          <>
            <div className="mb-3">
              <h5 className="fw-bold">Question:</h5>
              <p className="text-primary fs-5">{currentQuestion || "No question selected"}</p>
            </div>

            <div className="mb-3">
              <h5 className="fw-bold">Selected Student:</h5>
              <p className="text-success fs-5">{selectedStudent || "No student selected"}</p>
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={generateRandomQuestion}>
                Generate Question
              </button>
              <button className="btn btn-success" onClick={selectRandomStudent}>
                Select Student
              </button>
            </div>

            <button className="btn btn-danger mt-3 w-100" onClick={endSession}>
              End Session
            </button>
          </>
        ) : (
          <button className="btn btn-lg btn-dark w-100" onClick={startSession}>
            Start Live Session
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveSession;
