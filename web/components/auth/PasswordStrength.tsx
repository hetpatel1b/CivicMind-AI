import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const reqs = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /[0-9]/.test(password) },
    { label: 'Contains a special character', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const metCount = reqs.filter(r => r.met).length;
  
  let strengthLabel = 'Very Weak';
  let strengthColor = 'bg-gray-200 dark:bg-gray-700';
  
  if (metCount === 5) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-emerald-500';
  } else if (metCount >= 3) {
    strengthLabel = 'Good';
    strengthColor = 'bg-blue-500';
  } else if (metCount >= 1) {
    strengthLabel = 'Weak';
    strengthColor = 'bg-amber-500';
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Password Strength
        </span>
        <span className={`text-xs font-bold ${
          metCount === 5 ? 'text-emerald-600 dark:text-emerald-400' :
          metCount >= 3 ? 'text-blue-600 dark:text-blue-400' :
          metCount >= 1 ? 'text-amber-600 dark:text-amber-400' :
          'text-gray-500 dark:text-gray-400'
        }`}>
          {password ? strengthLabel : ''}
        </span>
      </div>

      <div className="flex gap-1 mb-4 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${(metCount / 5) * 100}%` }} />
      </div>

      <ul className="space-y-2">
        {reqs.map((req, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            )}
            <span className={req.met ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
