'use client';

import React from 'react';
import { ClipboardList, Users, Zap, Search, Plus, Calendar, Target, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoAssignmentsView() {
  const departments = [
    { name: 'Transport & Roads', load: 85, active: 12, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { name: 'Sanitation', load: 92, active: 8, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Water & Power', load: 45, active: 4, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  const tasks = [
    { id: 'T-892', title: 'Fix Pothole on 5th Ave', assignee: 'Team Alpha', dept: 'Transport', priority: 'High', status: 'In Progress' },
    { id: 'T-893', title: 'Clear Fallen Tree', assignee: 'Team Bravo', dept: 'Parks', priority: 'Critical', status: 'Pending' },
    { id: 'T-894', title: 'Repair Streetlight', assignee: 'Unassigned', dept: 'Power', priority: 'Medium', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">Resource Allocation</motion.h1>
              <motion.p variants={fadeUp} className="text-gray-400 font-medium">Manage department workload and engineering team assignments.</motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex gap-4 items-center">
              <div className="flex items-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search tasks..." className="bg-transparent border-none text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-0 w-[150px]" />
              </div>
              <button className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" /> New Assignment
              </button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Department Workload Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl">
              <h2 className="text-lg font-black text-white tracking-tight mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" /> Capacity
              </h2>
              <div className="space-y-6">
                {departments.map(dept => (
                  <div key={dept.name}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <div className="text-sm font-bold text-white">{dept.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{dept.active} Active Teams</div>
                      </div>
                      <div className={`text-xs font-black ${dept.load > 90 ? 'text-rose-400' : 'text-emerald-400'}`}>{dept.load}%</div>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${dept.load > 90 ? 'bg-rose-500' : dept.color.replace('text-', 'bg-')}`} style={{ width: `${dept.load}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-900/20 backdrop-blur-3xl rounded-[2.5rem] border border-indigo-500/20 ring-1 ring-indigo-500/10 p-6 shadow-2xl">
              <h2 className="text-sm font-black text-indigo-300 tracking-tight flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4" /> AI Recommendation
              </h2>
              <p className="text-xs text-indigo-100/80 mb-4">Sanitation department is currently over capacity (92%). Re-allocate 2 teams from Water & Power to maintain SLAs.</p>
              <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase tracking-widest text-[10px] rounded-lg transition-colors">
                Apply Rebalance
              </button>
            </div>
          </div>

          {/* Kanban Board Mock */}
          <div className="lg:col-span-3 bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-2xl flex overflow-x-auto gap-6 snap-x">
            
            {['Unassigned', 'In Progress', 'Completed'].map(col => (
              <div key={col} className="min-w-[300px] flex-1 shrink-0 snap-center flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-black uppercase tracking-widest text-gray-400">{col}</div>
                  <div className="w-6 h-6 rounded-full bg-white/5 text-gray-400 text-[10px] font-bold flex items-center justify-center border border-white/10">
                    {col === 'Unassigned' ? 2 : col === 'In Progress' ? 4 : 12}
                  </div>
                </div>

                <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 p-3 space-y-3 min-h-[400px]">
                  {tasks.filter(t => (col === 'Unassigned' && t.assignee === 'Unassigned') || (col === 'In Progress' && t.assignee !== 'Unassigned') || (col === 'Completed' && false)).map(task => (
                    <div key={task.id} className="bg-[#050505] p-4 rounded-xl border border-white/10 cursor-move hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">{task.id}</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${task.priority === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{task.priority}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-3 line-clamp-2">{task.title}</h4>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-gray-500" />
                          <span className={`text-[10px] font-bold ${task.assignee === 'Unassigned' ? 'text-rose-400' : 'text-gray-300'}`}>{task.assignee}</span>
                        </div>
                        <MoveRight className="w-4 h-4 text-white/0 group-hover:text-white/30 transition-colors" />
                      </div>
                    </div>
                  ))}
                  
                  {col === 'Completed' && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Calendar className="w-8 h-8 text-white/10 mb-2" />
                      <div className="text-xs font-bold text-gray-500">12 tasks completed today.</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
