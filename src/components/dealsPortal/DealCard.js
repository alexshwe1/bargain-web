import React from 'react';

function DealCard({ deal, onCardClick }) {

    const getDayOfWeekString = (dayNumber) => {
        switch (dayNumber) {
            case 1:
                return 'Sunday';
            case 2:
                return 'Monday';
            case 3:
                return 'Tuesday';
            case 4:
                return 'Wednesday';
            case 5:
                return 'Thursday';
            case 6:
                return 'Friday';
            case 7:
                return 'Saturday';
            default:
                return 'Invalid Day Number';
        }
    }

    function formatDateMMDD(dateString) {
        const regex = /^(\d{4})-(\d{1,2})-(\d{1,2}).*$/;
        const match = dateString.match(regex);
      
        if (match) {
          const year = match[1];
          const month = String(match[2]).padStart(2, '0');
          const day = String(match[3]).padStart(2, '0');
          return `${month}/${day}/${year}`;
        } else {
          return 'Invalid Date';
        }
      }

    function formatTime12Hour(dateString) {
        const date = new Date(dateString);
      
        // Get hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Ensure 12-hour format
      
        // Format as HH:MM am/pm
        const formattedTime = `${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
      
        return formattedTime;
    }

    return (
        <div className="mx-auto bg-gray-300 hover:bg-gray-400 rounded-xl p-4" onClick={() => onCardClick(deal)}>
            <h3 className="text-xl font-semibold mb-2 text-black">{deal.note}</h3>
            <p className="mb-2 text-black">{formatTime12Hour(deal.startTime)} to {formatTime12Hour(deal.endTime)} every {getDayOfWeekString(deal.dayOfWeek)}</p>
            <p className="mb-2 text-black">Starts on {formatDateMMDD(deal.startDate)}</p>
            <p className="mb-2 text-black">Ends on {formatDateMMDD(deal.endDate)}</p>
        </div>
    );
}

export default DealCard;