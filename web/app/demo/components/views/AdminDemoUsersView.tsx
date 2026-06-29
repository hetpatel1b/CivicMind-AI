'use client';

import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { Search, UserX, ShieldAlert, Star, Filter, ShieldCheck, Mail, Activity, Target, ChevronRight, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

interface AdminDemoUsersViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoUsersView({ onNavigate }: AdminDemoUsersViewProps) {
  const { users } = useDemo();
  
  const [localUsers, setLocalUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleToggleSuspend = (userId: string, isSuspended: boolean) => {
    setLocalUsers(localUsers.map(u => 
      u.id === userId ? { ...u, role: isSuspended ? 'citizen' : 'suspended' } : u
    ));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, role: isSuspended ? 'citizen' : 'suspended' });
    }
  };

  const filteredUsers = localUsers.filter(u => 
    (u.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10 flex gap-8">
        
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-500 ${selectedUser ? 'xl:w-2/3' : 'w-full'}`}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-8">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
              <div>
                <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">User Directory</motion.h1>
                <motion.p variants={fadeUp} className="text-gray-400 font-medium">Enterprise management of all network participants.</motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <div className="flex items-center bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search citizens & admins..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-none text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-0 w-[240px]"
                  />
                </div>
                <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Role Filters
                </button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
                    <th className="px-6 py-4 font-black">Participant</th>
                    <th className="px-6 py-4 font-black">Role & Status</th>
                    <th className="px-6 py-4 font-black">Trust Score</th>
                    <th className="px-6 py-4 font-black">Joined</th>
                    <th className="px-6 py-4 font-black text-right">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.map((user, idx) => {
                    const isSuspended = user.role === 'suspended';
                    const isAdmin = user.role === 'admin' || user.role === 'super_admin';
                    const isSelected = selectedUser?.id === user.id;

                    return (
                      <motion.tr 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                        key={user.id} 
                        onClick={() => setSelectedUser(user)}
                        className={`transition-colors cursor-pointer group ${isSelected ? 'bg-indigo-500/10' : 'hover:bg-white/5'}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border overflow-hidden
                                ${isAdmin ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 border-white/10'}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="User" />
                              </div>
                              {isAdmin && <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg border border-[#0a0f1c]"><ShieldCheck className="w-2.5 h-2.5" /></div>}
                            </div>
                            <div>
                              <div className="font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{user.full_name || 'Anonymous User'}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user.email || 'No email provided'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                            ${isAdmin ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : ''}
                            ${isSuspended ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : ''}
                            ${!isAdmin && !isSuspended ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : ''}
                          `}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full h-1.5 bg-white/10 rounded-full max-w-[80px] overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" style={{ width: `${Math.min(100, ((user.reputation_score || 0) / 2000) * 100)}%` }} />
                            </div>
                            <span className="text-xs font-bold text-amber-400">{user.reputation_score || 0}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-400">
                          {formatDistanceToNow(new Date(user.created_at))} ago
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronRight className={`w-5 h-5 ml-auto transition-colors ${isSelected ? 'text-indigo-400' : 'text-gray-600 group-hover:text-white'}`} />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sliding Profile Drawer */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
              className="hidden xl:block w-1/3 shrink-0"
            >
              <div className="bg-[#0a0f1c]/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 shadow-2xl p-8 sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.id}`} alt="User" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white leading-tight">{selectedUser.full_name || 'Anonymous User'}</h3>
                      <div className="text-xs font-bold text-gray-500">{selectedUser.email || 'No email provided'}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Activity className="w-4 h-4 text-indigo-400 mb-2" />
                    <div className="text-2xl font-black text-white">{(selectedUser.full_name?.length || 0) * 3 + 12}</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-indigo-300">Total Reports</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Target className="w-4 h-4 text-emerald-400 mb-2" />
                    <div className="text-2xl font-black text-white">{Math.min(99, (selectedUser.email?.length || 0) * 2 + 60)}%</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-300">Accuracy Rate</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Contribution History</h4>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">Verified Pothole on Main St.</div>
                          <div className="text-xs text-gray-500">{i * 2} days ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedUser.role !== 'admin' && selectedUser.role !== 'super_admin' && (
                  <div className="pt-6 border-t border-white/10">
                    <button 
                      onClick={() => handleToggleSuspend(selectedUser.id, selectedUser.role === 'suspended')}
                      className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 border
                        ${selectedUser.role === 'suspended' ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30'}
                      `}
                    >
                      {selectedUser.role === 'suspended' ? (
                        <><ShieldCheck className="w-4 h-4" /> Reactivate Account</>
                      ) : (
                        <><UserX className="w-4 h-4" /> Suspend Account</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
