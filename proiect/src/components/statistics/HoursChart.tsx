import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { dataService } from '../../services/dataService';

export function HoursChart() {
  const [monthlyData, setMonthlyData] = useState<{ month: string; hours: number }[]>([]);

  useEffect(() => {
    const hours = dataService.getVolunteerHours();
    const monthNames = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
    
    const grouped: Record<string, number> = {};
    hours.forEach(h => {
      const date = new Date(h.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      grouped[key] = (grouped[key] || 0) + h.hours;
    });

    const data = Object.entries(grouped)
      .map(([key, hours]) => {
        const [, month] = key.split('-');
        return { month: monthNames[parseInt(month)], hours };
      })
      .slice(-6);

    setMonthlyData(data);
  }, []);

  const maxHours = Math.max(...monthlyData.map(d => d.hours), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ore Voluntariat pe Luna</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-48">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-primary rounded-t transition-all"
                style={{ height: `${(d.hours / maxHours) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-xs text-muted-foreground">{d.month}</span>
              <span className="text-xs font-medium">{d.hours}h</span>
            </div>
          ))}
        </div>
        {monthlyData.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nu exista date disponibile.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
