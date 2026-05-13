import React from 'react';
import { Table } from 'react-bootstrap';

const TimetableGrid = ({ timetable, days, timeSlots }) => {
  // Helper to find session for specific day and slot
  const getSession = (day, slot) => {
    return timetable.find(t => t.day === day && t.timeSlot === slot);
  };

  // Helper to color code based on subject
  const getBgColor = (subjectName) => {
    if (!subjectName) return 'bg-secondary border-secondary text-muted';
    const colors = ['info', 'warning', 'success', 'primary', 'danger', 'secondary'];
    const hash = subjectName.length;
    return `bg-${colors[hash % colors.length]} bg-opacity-25 border-${colors[hash % colors.length]}`;
  };

  return (
    <div className="glass-card p-4 overflow-auto mt-4">
      <Table responsive hover className="table-dark mb-0 align-middle">
        <thead>
          <tr>
            <th style={{ width: '150px' }}>Time / Day</th>
            {days.map(day => (
              <th key={day} className="text-center">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td className="fw-bold text-muted" style={{ whiteSpace: 'nowrap' }}>{slot}</td>
              {days.map(day => {
                const session = getSession(day, slot);
                return (
                  <td key={`${day}-${slot}`} style={{ minWidth: '150px', padding: '0.5rem' }}>
                    {session ? (
                      <div className={`p-2 rounded border h-100 ${getBgColor(session.subject?.name)}`}>
                        <div className="fw-bold text-light">{session.subject?.name || session.subject?.code || 'Subject'}</div>
                        <small className="text-muted d-block mt-1">
                          {session.faculty?.name || 'Faculty'} | {session.room?.name || 'Room'}
                        </small>
                      </div>
                    ) : (
                      <div className="text-muted d-flex align-items-center justify-content-center h-100" style={{ minHeight: '60px' }}>-</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TimetableGrid;
