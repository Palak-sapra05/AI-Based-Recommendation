import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Bell, Search, Star, Clock, Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const data = [
  { name: 'Mon', applications: 4 },
  { name: 'Tue', applications: 3 },
  { name: 'Wed', applications: 7 },
  { name: 'Thu', applications: 5 },
  { name: 'Fri', applications: 9 },
  { name: 'Sat', applications: 2 },
  { name: 'Sun', applications: 3 },
];

const COLORS = ['#38bdf8', '#818cf8', '#22d3ee', '#334155'];

const UserDashboard = () => {
  const userName = localStorage.getItem('userName') || 'Alex';
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem('userProfileData'));
  } catch(e) {}
  
  const skillData = userData && userData.skills && userData.skills.length > 0 
    ? userData.skills.map(s => ({
        name: s.name,
        value: s.level === 'Beginner' ? 40 : s.level === 'Intermediate' ? 70 : 90
      }))
    : [
        { name: 'React', value: 85 },
        { name: 'Node.js', value: 70 },
        { name: 'Python', value: 60 },
        { name: 'AWS', value: 45 },
      ];
      
  const targetRole = userData && userData.interests && userData.interests.length > 0 
    ? userData.interests[0] 
    : 'Senior Product Designer';
    
  const targetCompany = userData && userData.targetCompany ? userData.targetCompany : 'Stripe';
  const targetSalary = userData && userData.targetSalary ? userData.targetSalary : '$150k - $200k';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="main-view">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>Welcome back, {userName}! 👋</h1>
            <p style={{ color: 'var(--text-dim)' }}>Here's what's happening with your career today.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={18} color="var(--text-dim)" />
              <input type="text" placeholder="Search..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
            </div>
            <button className="glass-card" style={{ padding: '0.5rem' }}><Bell size={20} /></button>
            <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '50%' }}></div>
          </div>
        </header>

        <div className="widget-grid">
          <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>Profile Completion</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>Complete your profile to get better matches.</p>
              </div>
              <div className="progress-circle-container">
                <svg width="100" height="100">
                  <circle cx="50" cy="50" r="40" stroke="var(--glass)" strokeWidth="8" fill="transparent" />
                  <circle cx="50" cy="50" r="40" stroke="var(--primary)" strokeWidth="8" fill="transparent" 
                    strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                </svg>
                <span className="progress-text">75%</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3>Weekly Applications</h3>
            <div style={{ height: '150px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="applications" stroke="var(--primary)" fillOpacity={1} fill="url(#colorApp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3>Skill Proficiency</h3>
            <div style={{ height: '150px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData}>
                  <Bar dataKey="value" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <section className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3>AI Recommended Jobs</h3>
              <Link to="/jobs" style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>View all</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="job-item" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--glass)', borderRadius: '8px' }}></div>
                    <div>
                      <strong>{targetRole}</strong>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>{targetCompany} • Remote • {targetSalary}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="skill-tag">98% Match</span>
                    <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card">
            <h3>Recent Activities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px' }}><Clock size={18} color="var(--primary)" /></div>
                <div>
                  <p style={{ fontSize: '0.875rem' }}>Applied to <strong>Google</strong></p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2 hours ago</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '8px' }}><Bookmark size={18} color="var(--secondary)" /></div>
                <div>
                  <p style={{ fontSize: '0.875rem' }}>Saved <strong>Full Stack Developer</strong> at Meta</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Yesterday</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '8px' }}><Star size={18} color="var(--accent)" /></div>
                <div>
                  <p style={{ fontSize: '0.875rem' }}>Resume score updated to <strong>85</strong></p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
