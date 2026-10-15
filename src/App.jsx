import { useState, useEffect } from 'react'
import LessonCard from './LessonCard'
import QuizSection from './QuizSection'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const [lessonTopics, setLessonTopics] = useState(() => {
    const savedLessons = localStorage.getItem('biology_lessons');
    if (savedLessons) {
      return JSON.parse(savedLessons);
    }
    return [
      {
        id: 1,
        title: "Cell Structure",
        description: "Learn about the basic building blocks of life and organelles.",
        funFact: "Mitochondria is the powerhouse of the cell!",
        category: "Cells"
      },
      {
        id: 2,
        title: "Photosynthesis",
        description: "Discover how plants convert sunlight into chemical energy.",
        funFact: "Plants actually reflect green light because they absorb red and blue light most efficiently!",
        category: "Plants"
      },
      {
        id: 3,
        title: "Genetics & DNA",
        description: "Explore the double helix and how traits are inherited.",
        funFact: "If you uncoiled all the DNA in your body, it would stretch from the Earth to the Sun and back multiple times!",
        category: "Genetics"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('biology_lessons', JSON.stringify(lessonTopics));
  }, [lessonTopics]);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newFact, setNewFact] = useState("");
  const [newCategory, setNewCategory] = useState("Cells");

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLesson = {
      id: Date.now(),
      title: newTitle,
      description: newDesc || "Custom lesson topic added by user.",
      funFact: newFact || "Science is full of amazing discoveries!",
      category: newCategory
    };

    setLessonTopics([newLesson, ...lessonTopics]);
    setNewTitle("");
    setNewDesc("");
    setNewFact("");
  };

  const handleDeleteLesson = (idToDelete) => {
    setLessonTopics(lessonTopics.filter(lesson => lesson.id !== idToDelete));
  };

  const filteredTopics = lessonTopics.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Dynamic theme styling objects
  const themeStyles = {
    appBackground: isDarkMode ? '#1a202c' : '#f7fafc',
    textColor: isDarkMode ? '#ffffff' : '#2d3748',
    subText: isDarkMode ? '#cbd5e0' : '#4a5568',
    formBackground: isDarkMode ? '#2d3748' : '#ffffff',
    cardBackground: isDarkMode ? '#ffffff' : '#ffffff',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: themeStyles.appBackground, transition: 'background-color 0.3s ease' }}>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Top Header & Theme Toggle Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ color: themeStyles.textColor, margin: 0 }}>Interactive Biology Lesson</h1>
            <p style={{ color: themeStyles.subText, margin: '0.3rem 0 0 0' }}>Explore topics, filter categories, or toggle themes!</p>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '6px', 
              border: 'none', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              backgroundColor: isDarkMode ? '#edf2f7' : '#2d3748',
              color: isDarkMode ? '#1a202c' : '#ffffff'
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Live Search Bar */}
        <input 
          type="text"
          placeholder="Search lesson topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '2px solid #3182ce', backgroundColor: '#ffffff', color: '#1a202c', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
        />

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {["All", "Cells", "Plants", "Genetics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: selectedCategory === cat ? '#3182ce' : '#4a5568',
                color: 'white'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add New Lesson Form */}
        <form onSubmit={handleAddLesson} style={{ background: themeStyles.formBackground, padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: themeStyles.textColor, marginTop: 0 }}>Add a New Lesson Topic</h3>
          <input 
            type="text"
            placeholder="Lesson Title (e.g., Ecosystems)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }}
          />
          <input 
            type="text"
            placeholder="Short Description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }}
          />
          <input 
            type="text"
            placeholder="Fun Fact"
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box' }}
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #cbd5e0', boxSizing: 'border-box', background: '#fff' }}
          >
            <option value="Cells">Cells</option>
            <option value="Plants">Plants</option>
            <option value="Genetics">Genetics</option>
          </select>
          <button 
            type="submit"
            style={{ background: '#48bb78', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Add Lesson Card
          </button>
        </form>

        {/* Lesson Cards List */}
        {filteredTopics.length > 0 ? (
          filteredTopics.map((lesson) => (
            <LessonCard 
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              funFact={lesson.funFact}
              category={lesson.category}
              onDelete={handleDeleteLesson}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: themeStyles.subText }}>No biology topics found matching your filter.</p>
        )}

        {/* Interactive Quiz Section */}
        <QuizSection />
      </main>
    </div>
  )
}

export default App