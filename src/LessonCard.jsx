import { useState } from 'react';

function LessonCard({ id, title, description, funFact, category, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      border: '1px solid #cbd5e0', 
      borderRadius: '8px', 
      padding: '1rem', 
      margin: '1rem 0', 
      background: '#f7fafc',
      textAlign: 'left',
      position: 'relative'
    }}>
      {/* Category Badge */}
      {category && (
        <span style={{ 
          display: 'inline-block', 
          backgroundColor: '#3182ce', 
          color: 'white', 
          fontSize: '0.75rem', 
          padding: '0.2rem 0.6rem', 
          borderRadius: '12px', 
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          {category}
        </span>
      )}

      <h3 style={{ marginTop: 0, color: '#2d3748' }}>{title}</h3>
      <p style={{ color: '#4a5568' }}>{description}</p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {isOpen ? 'Hide Details' : 'Learn More'}
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Delete Card
        </button>
      </div>

      {isOpen && (
        <p style={{ marginTop: '0.8rem', fontStyle: 'italic', color: '#2c5282' }}>
          💡 {funFact}
        </p>
      )}
    </div>
  );
}

export default LessonCard;