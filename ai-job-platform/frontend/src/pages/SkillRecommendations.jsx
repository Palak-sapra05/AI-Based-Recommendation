import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, BookOpen, Award, Target, 
  ChevronRight, PlayCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SkillCard = ({ skill }) => (
  <motion.div className="glass-card skill-recommendation-card" whileHover={{ y: -5 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ padding: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px' }}>
          <TrendingUp size={24} color="var(--primary)" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.25rem' }}>{skill.name}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>{skill.level} • {skill.demand} Demand</p>
        </div>
      </div>
      <div className="badge">{skill.priority}</div>
    </div>

    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        <span>Current Proficiency</span>
        <span>{skill.progress}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${skill.progress}%` }}></div>
      </div>
    </div>

    <div style={{ marginTop: '1.5rem' }}>
      <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Recommended Courses</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {skill.courses.map((course, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', padding: '0.5rem', background: 'var(--glass)', borderRadius: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PlayCircle size={14} /> {course}</span>
            <ChevronRight size={14} color="var(--text-dim)" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillRecommendations = () => {
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem('userProfileData'));
  } catch(e) {}

  const skills = userData && userData.learningGoals && userData.learningGoals.length > 0
    ? userData.learningGoals.map((goal, i) => ({
        name: goal,
        level: 'Beginner',
        demand: 'High',
        priority: i === 0 ? 'Top' : 'High',
        progress: 10 + (i * 5),
        courses: [`Intro to ${goal}`, `Advanced ${goal} Masterclass`]
      }))
    : [
        { name: 'TypeScript', level: 'Intermediate', demand: 'High', priority: 'High', progress: 65, courses: ['Advanced TS Patterns', 'TS with React & Node'] },
        { name: 'AWS Cloud', level: 'Beginner', demand: 'Extreme', priority: 'Top', progress: 20, courses: ['AWS Certified Solutions Architect', 'Serverless on AWS'] },
        { name: 'System Design', level: 'Intermediate', demand: 'High', priority: 'Medium', progress: 45, courses: ['Scalable Systems 101', 'Microservices Architecture'] },
      ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-view">
        <header style={{ marginBottom: '2.5rem' }}>
          <h1>Skill Enhancement Roadmap</h1>
          <p style={{ color: 'var(--text-dim)' }}>AI-generated learning paths to bridge your skill gaps.</p>
        </header>

        <div className="roadmap-overview">
          <div className="glass-card roadmap-summary">
            <div className="summary-item">
              <Target size={32} color="var(--primary)" />
              <div>
                <h3>4 Skill Gaps</h3>
                <p>Identified for Senior roles</p>
              </div>
            </div>
            <div className="summary-item">
              <Award size={32} color="var(--secondary)" />
              <div>
                <h3>2 Certificates</h3>
                <p>In progress this month</p>
              </div>
            </div>
            <div className="summary-item">
              <BookOpen size={32} color="var(--accent)" />
              <div>
                <h3>12 Lessons</h3>
                <p>To reach next level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkillRecommendations;
