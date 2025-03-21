import React, { useState } from 'react';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');

  const handleAddQuiz = () => {
    if (quizTitle.trim()) {
      const newQuiz = { id: Date.now(), title: quizTitle };
      setQuizzes([...quizzes, newQuiz]);
      setQuizTitle('');
    }
  };

  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Quiz Management</h2>
        <p className="text-center">Create, edit, and manage quizzes.</p>
        
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter quiz title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleAddQuiz} disabled={!quizTitle.trim()}>
          Add Quiz
        </button>
        
        <ul className="list-group">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
              {quiz.title}
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteQuiz(quiz.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizManagement;
