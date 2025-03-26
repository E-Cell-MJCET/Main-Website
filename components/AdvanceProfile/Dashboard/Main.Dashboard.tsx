import React,{ReactNode} from 'react'
import { 
 Users, Calendar, 
  BarChart2, Settings, BookOpen,  
} from 'lucide-react';

import { supabase } from '@/utils/supabase';

interface DashboardCardProps {
  title: string;
  value?: string;
  description: string;
  icon: ReactNode;
  dummy:Boolean
}

// Dashboard card component
const { count, error } = await supabase
        .from('Team') // Replace with your table name
        .select('*', { count: 'exact', head: true });

if (error) {
console.error('Error fetching row count:', error);
} else {
console.log('Number of rows:', count);
}
function DashboardCard({ title, value, description, icon,dummy=true }:DashboardCardProps) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
          <div className="rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold">{value}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          {dummy ? "Dummy Card": ""}
        </div>
      </div>
    );
    }

function Main_Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard 
              title="Upcoming Events" 
              value="2" 
              description="Events scheduled this month" 
              icon={<Calendar className="size-8" />} 
              dummy={false}
            />
      <DashboardCard 
              title="Team Members" 
              value={`${count!}`}
              description="Active members" 
              icon={<Users className="size-8" />} 
              dummy={false}
            />
      <DashboardCard 
              title="Resources" 
              value="8" 
              description="Available resources" 
              icon={<BookOpen className="size-8" />} 
              dummy={true}
            />
      <DashboardCard 
              title="Analytics" 
              value="↑15%" 
              description="Growth this quarter" 
              icon={<BarChart2 className="size-8" />} 
              dummy={true}
            />
      <DashboardCard 
              title="Settings" 
              value="2" 
              description="Pending configurations" 
              icon={<Settings className="size-8" />} 
              dummy={false}
            />
    </div>
  )
}

export default Main_Dashboard
