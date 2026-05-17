import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, MapPin, DollarSign, Briefcase, 
  Bookmark, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const JobCard = ({ job }) => (
  <motion.div 
    className="glass-card job-recommendation-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '1.25rem' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--glass)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img 
            src={`https://logo.clearbit.com/${job.company.toLowerCase().replace(' ', '')}.com`} 
            alt={job.company} 
            style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=2a2f4c&color=fff&size=60&rounded=true&font-size=0.4`;
            }} 
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.25rem' }}>{job.title}</h3>
          <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>{job.company}</p>
        </div>
      </div>
      <button className="icon-btn"><Bookmark size={20} /></button>
    </div>

    <div className="job-meta">
      <div className="meta-item"><MapPin size={16} /> {job.location}</div>
      <div className="meta-item"><DollarSign size={16} /> {job.salary}</div>
      <div className="meta-item"><Briefcase size={16} /> {job.experience}</div>
    </div>

    <div className="job-skills">
      {job.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
    </div>

    <div className="job-footer">
      <div className="match-score">
        <div className="score-ring">
          <svg width="36" height="36">
            <circle cx="18" cy="18" r="16" stroke="var(--glass)" strokeWidth="3" fill="transparent" />
            <circle cx="18" cy="18" r="16" stroke="var(--primary)" strokeWidth="3" fill="transparent" strokeDasharray="100" strokeDashoffset={100 - job.match} />
          </svg>
          <span>{job.match}%</span>
        </div>
        <span>Match Score</span>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn-secondary" style={{ padding: '0.6rem' }}><Share2 size={18} /></button>
        <button className="btn-primary">Apply Now</button>
      </div>
    </div>
  </motion.div>
);

const generateJobsFromProfile = (profile) => {
  // Default jobs if no profile or skills are available
  const defaultJobs = [
    { title: 'Frontend Developer', company: 'Vercel', location: 'San Francisco, CA', salary: '$140k - $180k', experience: '3+ yrs', match: 95, skills: ['React', 'Next.js', 'Tailwind'] },
    { title: 'Full Stack Engineer', company: 'Airbnb', location: 'Remote', salary: '$160k - $220k', experience: '5+ yrs', match: 88, skills: ['Node.js', 'TypeScript', 'PostgreSQL'] },
    { title: 'Backend Engineer', company: 'Scale AI', location: 'New York, NY', salary: '$180k - $250k', experience: '4+ yrs', match: 92, skills: ['Python', 'Docker', 'Kubernetes'] },
    { title: 'UI/UX Designer', company: 'Figma', location: 'San Francisco, CA', salary: '$130k - $170k', experience: '2+ yrs', match: 85, skills: ['Figma', 'Prototyping', 'Design Systems'] },
  ];

  if (!profile || (!profile.skills?.length && !profile.interests?.length)) {
    return defaultJobs;
  }

  const jobs = [];
  const skills = profile.skills?.map(s => s.name) || ['JavaScript', 'React'];
  const roles = profile.interests?.length > 0 ? profile.interests : ['Software Engineer'];
  const companies = ['Google', 'Meta', 'Stripe', 'Netflix', 'Amazon', 'Vercel', 'OpenAI', 'Microsoft', 'Apple', 'Spotify'];

  // Create a job for each role the user is interested in
  roles.forEach((role, idx) => {
    jobs.push({
      title: role,
      company: profile.targetCompany && idx === 0 ? profile.targetCompany : companies[Math.floor(Math.random() * companies.length)],
      location: profile.workType === 'Remote' ? 'Remote' : (profile.workType === 'Hybrid' ? 'Hybrid - NY' : 'San Francisco, CA'),
      salary: profile.targetSalary || '$120k - $180k',
      experience: profile.status === 'Fresher' ? '0-1 yrs' : (profile.status === 'Student' ? 'Internship' : '3+ yrs'),
      match: Math.floor(Math.random() * 10) + 90, // High match score for their direct interests! 90-99
      skills: skills.slice(0, 4) // Show up to 4 of their actual skills
    });
  });

  // Fill up to at least 4 jobs
  while (jobs.length < 4) {
    const extraCompany = companies[Math.floor(Math.random() * companies.length)];
    // Make sure company is unique for the visual variety
    if (!jobs.find(j => j.company === extraCompany)) {
      jobs.push({
        title: roles[Math.floor(Math.random() * roles.length)],
        company: extraCompany,
        location: 'Remote',
        salary: '$100k - $150k',
        experience: '1-3 yrs',
        match: Math.floor(Math.random() * 15) + 75,
        skills: skills.slice(0, 3)
      });
    }
  }

  return jobs;
};

const JobRecommendations = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Read real-time user data from onboarding
  const [userProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userProfileData')) || {};
    } catch {
      return {};
    }
  });
  
  const [jobs] = useState(() => generateJobsFromProfile(userProfile));

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-view">
        <header style={{ marginBottom: '2.5rem' }}>
          <h1>AI-Recommended Jobs</h1>
          <p style={{ color: 'var(--text-dim)' }}>We've found {jobs.length} roles that match your profile perfectly.</p>
        </header>

        <div className="search-filter-bar">
          <div className="glass-card search-box">
            <Search size={20} color="var(--text-dim)" />
            <input type="text" placeholder="Search by title, company, or skills..." />
          </div>
          <div className="filter-group">
            {['All', 'Remote', 'Full-time', 'Contract'].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="glass-card advanced-filter"><Filter size={20} /> Filters</button>
        </div>

        <div className="jobs-list-grid">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobRecommendations;
