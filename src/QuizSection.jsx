import { useState } from 'react';

function QuizSection() {
  const questions = [
    {
      question: "What is the powerhouse of the cell?",
      options: ["Ribosome", "Mitochondria", "Nucleus"],
      answer: "Mitochondria"
    },
    {
      question: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
      answer: "Carbon Dioxide"
    },
    {
      question: "What molecule carries genetic instructions in living organisms?",
      options: ["DNA", "RNA", "Protein"],
      answer: "DNA"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Brief pause to show green/red feedback before moving to the next question
    setTimeout(() => {
      setSelectedOption(null);
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
      } else {
        setShowScore(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div style={{ background: '#2d3748', padding: '1.5rem', borderRadius: '8px', marginTop: '2rem', color: '#fff', textAlign: 'left' }}>
      <h3 style={{ marginTop: 0 }}>🧬 Multi-Question Biology Quiz</h3>

      {showScore ? (
        <div>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#68d391' }}>Quiz Complete! 🎉</p>
          <p style={{ marginBottom: '1rem' }}>You scored {score} out of {questions.length}!</p>
          <button 
            onClick={restartQuiz}
            style={{ padding: '0.4rem 1rem', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: '#cbd5e0', fontSize: '0.9rem' }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '1rem' }}>
            {questions[currentIndex].question}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {questions[currentIndex].options.map((option, index) => {
              // Dynamic button coloring on answer selection
              let bgColor = '#4a5568';
              if (selectedOption !== null) {
                if (option === questions[currentIndex].answer) {
                  bgColor = '#48bb78'; // Green for correct answer
                } else if (option === selectedOption) {
                  bgColor = '#e53e3e'; // Red for wrong selection
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedOption !== null}
                  style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: bgColor, color: 'white', border: 'none', borderRadius: '4px', transition: 'background 0.2s' }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#cbd5e0' }}>
            Current Score: <strong>{score}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizSection;