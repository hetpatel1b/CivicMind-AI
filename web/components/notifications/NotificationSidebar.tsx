import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Award, 
  MessageSquare, 
  ArrowRight,
  PlusCircle,
  List,
  LayoutDashboard,
  Trophy,
  Medal,
  Settings,
  HelpCircle,
  Bell
} from 'lucide-react';
import { Card } from '@/design-system/components/Card';
import { buttonVariants } from '@/design-system/components/Button';

export default function NotificationSidebar() {
  const primaryAction = {
    label: 'Report New Issue',
    href: '/report',
    icon: PlusCircle,
    color: 'bg-blue-600 hover:bg-blue-700 text-white'
  };

  const navLinks = [
    { label: 'Community Feed', href: '/feed', icon: List },
    { label: 'Interactive Map', href: '/map', icon: MapPin },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { label: 'Reputation Hub', href: '/reputation', icon: Medal },
  ];

  const settingLinks = [
    { label: 'Notification Settings', href: '/settings', icon: Bell },
    { label: 'Profile Settings', href: '/settings/profile', icon: Settings },
    { label: 'Help Center', href: '/help', icon: HelpCircle },
  ];

  const recommendations = [
    {
      id: 'nearby',
      title: 'Support Nearby Issues',
      description: 'There are 3 unresolved infrastructure issues reported in your area.',
      icon: MapPin,
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      href: '/map'
    },
    {
      id: 'badge',
      title: 'Suggested Badge',
      description: 'You only need 2 more verified reports to unlock Active Citizen.',
      icon: Award,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      href: '/reputation'
    },
    {
      id: 'trending',
      title: 'Trending Discussion',
      description: 'Join the conversation about the new park development proposal.',
      icon: MessageSquare,
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      href: '/feed'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Quick Actions Card */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="space-y-6">
          <div>
            <Link 
              href={primaryAction.href}
              className={buttonVariants('primary', 'md', 'w-full flex items-center justify-center gap-2')}
            >
              <primaryAction.icon className="w-4 h-4" />
              {primaryAction.label}
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Navigation</h4>
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 group"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <link.icon className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800 w-full" />

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Preferences</h4>
            <div className="grid grid-cols-1 gap-2">
              {settingLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300 group"
                >
                  <link.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 p-6 border-indigo-100 dark:border-indigo-900/30">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <Link key={rec.id} href={rec.href} className="block group">
              <div className="flex items-start gap-3 p-3 rounded-xl border border-white/60 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm hover:border-white dark:hover:border-gray-700 transition-all backdrop-blur-sm">
                <div className={`p-2 rounded-lg ${rec.bg} shrink-0`}>
                  <rec.icon className={`w-4 h-4 ${rec.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                    {rec.description}
                  </p>
                </div>
                <div className="shrink-0 mt-1">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>

    </div>
  );
}
