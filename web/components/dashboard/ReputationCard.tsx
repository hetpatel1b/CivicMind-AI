import React from 'react';
import { Award, Zap } from 'lucide-react';
import { Card } from '@/design-system/components/Card';
import { Badge } from '@/design-system/components/Badge';

interface ReputationCardProps {
  totalPoints: number;
  level: string;
}

export default function ReputationCard({ totalPoints, level }: ReputationCardProps) {
  return (
    <Card className="p-6 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-500" />
          My Reputation
        </h3>
        <Badge variant="default" className="uppercase tracking-wider">
          {level}
        </Badge>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {totalPoints.toLocaleString()}
        </span>
        <span className="text-gray-500 dark:text-gray-400 font-medium pb-1">
          Points
        </span>
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 flex items-start gap-3">
        <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Earn more points by reporting new issues and verifying community reports!
        </p>
      </div>
    </Card>
  );
}
