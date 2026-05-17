import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Save, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'user@example.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-view">
        <header style={{ marginBottom: '2.5rem' }}>
          <h1>Account Settings</h1>
          <p style={{ color: 'var(--text-dim)' }}>Manage your profile information and preferences.</p>
        </header>

        <div style={{ maxWidth: '800px' }}>
          <form onSubmit={handleSave} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{name}</h2>
                <p style={{ color: 'var(--text-dim)' }}>{email}</p>
              </div>
            </div>

            <div className="settings-section">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Personal Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Security & Privacy</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--glass)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Shield size={20} color="var(--primary)" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Two-Factor Authentication</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <button className="btn-secondary" type="button">Enable</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--glass)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Bell size={20} color="var(--secondary)" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Email Notifications</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Receive updates about new job recommendations.</p>
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Career Profile</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--glass)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <RefreshCw size={20} color="var(--accent)" />
                  <div>
                    <p style={{ fontWeight: 600 }}>Update Onboarding Details</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Change your skills, experience, and target roles to get better recommendations.</p>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  type="button" 
                  onClick={() => navigate('/onboarding')}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
