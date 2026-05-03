import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { dataService } from '../../services/dataService';
import { Trophy } from 'lucide-react';

interface VolunteerRank {
  name: string;
  hours: number;
  rank: number;
}

export function TopVolunteers() {
  const [topVolunteers, setTopVolunteers] = useState<VolunteerRank[]>([]);

  useEffect(() => {
    const volunteers = dataService.getVolunteers();
    const hours = dataService.getVolunteerHours();

    const volunteerHours: Record<string, number> = {};
    hours.forEach(h => {
      if (h.status === 'approved') {
        volunteerHours[h.volunteerId] = (volunteerHours[h.volunteerId] || 0) + h.hours;
      }
    });

    const ranked = volunteers
      .map(v => ({
        name: v.name,
        hours: volunteerHours[v.id] || 0,
        rank: 0,
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 5)
      .map((v, i) => ({ ...v, rank: i + 1 }));

    setTopVolunteers(ranked);
  }, []);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Voluntari
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topVolunteers.map((v) => (
            <div key={v.rank} className="flex items-center gap-4">
              <span className={`text-2xl font-bold ${getMedalColor(v.rank)}`}>
                #{v.rank}
              </span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{v.name}</p>
                <p className="text-sm text-muted-foreground">{v.hours} ore</p>
              </div>
              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(v.hours / (topVolunteers[0]?.hours || 1)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {topVolunteers.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nu exista date disponibile.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
