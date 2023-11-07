import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const DealsModal = ({ barId, isNewDeal, setDealWasUpdated, isOpen, closeModal, deal }) => {

    // State to store whether the "Save" button should be disabled
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    // State to store error messages for each input field
    const [formErrors, setFormErrors] = useState({
        note: '',
        endDate: '',
        endTime: '',
    });

    const [formData, setFormData] = useState({
        note: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        dayOfWeek: "",
    });

    // Update state with deal data when the deal prop changes
    useEffect(() => {
        if (deal) {
            setFormData({
                note: removeEmojis(deal.note),
                startDate: formatDateForInput(deal.startDate),
                endDate: formatDateForInput(deal.endDate),
                startTime: formatTimeForInput(deal.startTime),
                endTime: formatTimeForInput(deal.endTime),
                dayOfWeek: deal.dayOfWeek,
            });
        }
    }, [deal]);

    useEffect(() => {
        // Check validation rules and update the "Save" button disabled state
        const validationResults = validateForm();
        setIsSaveDisabled(validationResults.isInvalid);
        setFormErrors(validationResults.errors);
    }, [formData]);

    const validateForm = () => {
        const errors = {
            note: '',
            endDate: '',
            endTime: '',
        };

        // Validate that endDate is at least one week after startDate
        const startDateObj = new Date(formData.startDate);
        const endDateObj = new Date(formData.endDate);
        // Clone the startDate to avoid modifying the original date
        const oneWeekLater = new Date(startDateObj);
        oneWeekLater.setDate(startDateObj.getDate() + 7);
        const isEndDateValid = endDateObj >= oneWeekLater;

        if (!isEndDateValid) {
            errors.endDate = 'End date must be at least one week after the start date.';
        }

    
        // Validate that endTime is after startTime
        const startTimeObj = new Date(`1970-01-01T${formData.startTime}`);
        const endTimeObj = new Date(`1970-01-01T${formData.endTime}`);
        const isEndTimeValid = endTimeObj > startTimeObj;

        if (!isEndTimeValid) {
            errors.endTime = 'End time must be after the start time.';
        }
    
        // Validate that note is less than 25 characters
        const isNoteValid = formData.note.length <= 25;

        if (!isNoteValid) {
            errors.note = 'Title must be 25 characters or less.';
        }

        // Validate that note is at least 5 characters
        const isNoteLongEnough = formData.note.length >= 5;

        if (!isNoteLongEnough) {
            errors.note = 'Title must be at least 5 characters.';
        }

        // Validate that note does not contain emojis
        const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}\u{203C}\u{2049}\u{2122}\u{203C}\u{2049}\u{2139}\u{2328}\u{231A}\u{231B}\u{23E9}\u{23EA}\u{23EB}\u{23EC}\u{23F0}\u{23F3}\u{2614}\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}\u{26AB}\u{26BD}\u{26BE}\u{26C4}\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2705}\u{270A}\u{270B}\u{2728}\u{274C}\u{274E}\u{2753}\u{2757}\u{2795}\u{2796}\u{2797}\u{27B0}\u{27BF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{203C}\u{2049}\u{2122}\u{203C}\u{2049}\u{2139}\u{2328}\u{231A}\u{231B}\u{23E9}\u{23EA}\u{23EB}\u{23EC}\u{23F0}\u{23F3}\u{2614}\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}\u{26AB}\u{26BD}\u{26BE}\u{26C4}\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2705}\u{270A}\u{270B}\u{2728}\u{274C}\u{274E}\u{2753}\u{2757}\u{2795}\u{2796}\u{2797}\u{27B0}\u{27BF}\u{2B50}-\u{2B50}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}\u{1F004}-\u{1F0CF}\u{1F170}-\u{1F251}]/gu;

        const containsEmoji = emojiRegex.test(formData.note);

        if (containsEmoji) {
            errors.note = 'Title cannot contain emojis. Emojis are automatically added.';
        }

        // Validate that startDate and endDate are within two years of each other
        const twoYearsLater = new Date(startDateObj);
        twoYearsLater.setFullYear(startDateObj.getFullYear() + 2);
        const isDateRangeValid = endDateObj <= twoYearsLater;

        if (!isDateRangeValid) {
            errors.endDate = 'Start and end dates must be within two years of each other.';
        }
    
        const isInvalid = !(isEndDateValid && isEndTimeValid && isNoteValid && isNoteLongEnough && isDateRangeValid && !containsEmoji);

        return { errors, isInvalid };
      };

    // Function to remove emojis from the beginning and end of the string using regex
    const removeEmojis = (text) => {
        const regex = /^\p{Emoji}+\s*(.*?)\s*\p{Emoji}+$/u; // Unicode property escapes for emojis
        const match = text.match(regex);

        if (match) {
        return match[1]; // Return the content between the emojis
        } else {
        return text; // Return the original text if the regex doesn't match
        }
    };

    // Function to format the date for the input field using regex
    const formatDateForInput = (dateString) => {
        const regex = /^(\d{4})-(\d{1,2})-(\d{1,2}).*$/;
        const match = dateString.match(regex);

        if (match) {
            const year = match[1];
            const month = match[2].padStart(2, '0');
            const day = match[3].padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            return ''; // Return an empty string if the regex doesn't match
        }
    };

    // Function to format the time for the input field using regex
    const formatTimeForInput = (timeString) => {
        const regex = /T(\d{1,2}:\d{2}):\d{2}-\d{2}:\d{2}$/;
        const match = timeString.match(regex);

        if (match) {
            return match[1];
        } else {
            return ''; // Return an empty string if the regex doesn't match
        }
    };

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call a function to add emojis to the note
        const noteWithEmojis = addEmojis(formData.note);
      
        // Format startDate and endDate to be strings in the format "YYYY-MM-DDT00:00:00Z"
        const formattedStartDate = formatDateTimeString(formData.startDate, '00:00:00Z');
        const formattedEndDate = formatDateTimeString(formData.endDate, '00:00:00Z');
      
        // Format startTime and endTime to be strings in 24-hour time format "2000-01-01THH:MM:SS-06:00"
        const formattedStartTime = formatDateTimeString('2000-01-01', formData.startTime, ':00-06:00');
        const formattedEndTime = formatDateTimeString('2000-01-01', formData.endTime, ':00-06:00');

        if (isNewDeal) {
            // Send a POST request to mongodb HTTP endpoint
            const data = {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                dayOfWeek: formData.dayOfWeek,
                note: noteWithEmojis,
                barId: barId,
            };
            fetch('https://us-east-1.aws.data.mongodb-api.com/app/bargainapi-xhtfb/endpoint/deals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.ok) {
                    console.log('Deal created successfully.');
                    setDealWasUpdated(true);
                } else {
                    console.error('Error creating deal.');
                }
            })
            .catch((error) => {
                console.error('Error creating deal:', error);
            });
        } else {
            // Send a PUT request to mongodb HTTP endpoint
            const data = {
                dealId: deal._id,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                dayOfWeek: formData.dayOfWeek,
                note: noteWithEmojis,
            };
            fetch('https://us-east-1.aws.data.mongodb-api.com/app/bargainapi-xhtfb/endpoint/deal', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                if (response.ok) {
                    console.log('Deal updated successfully.');
                    setDealWasUpdated(true)
                } else {
                    console.error('Error updating deal.');
                }
            })
            .catch((error) => {
                console.error('Error updating deal:', error);
            });
        }
      
        // Close the modal
        closeModal();
    };
      
    // Function to add emojis to the note
    function addEmojis(note) {
        // Define a mapping of keywords to emojis
        const emojiMap = {
          bomb: '💣',
          wing: '🍗',
          tap: '🚰',
          tower: '🗼',
          chicken: '🐔',
          burger: '🍔',
          'hot dog': '🌭',
          brat: '🌭',
          taco: '🌮',
          burrito: '🌯',
          pizza: '🍕',
          fries: '🍟',
          apps: '🍟',
          bacon: '🥓',
          popcorn: '🍿',
          cookie: '🍪',
          donut: '🍩',
          dessert: '🍩',
          'ice cream': '🍦',
          strawberry: '🍓',
          cherry: '🍒',
          off: '❗️',
          rail: '🚂',
          beer: '🍺',
          pitcher: '🍻',
          wine: '🍷',
          cocktail: '🍹',
          mimosa: '🥂',
          bottle: '🍾',
          beatbox: '🧃',
          'green tea': '🍵',
          ice: '🧊',
          snorkel: '🤿',
          spotted: '🐄',
          cow: '🐄',
          pink: '💅',
          cheese: '🧀',
          apple: '🍏',
          mystery: '❓',
          mule: '🐂',
          top: '🔝',
          lemon: '🍋',
          cup: '🥤',
          kup: '🥤',
          fire: '🔥',
          'white claw': '🌊',
          blood: '🩸',
          berry: '🫐',
          happy: '😄',
        };
      
        // Iterate through the keywords and check if they exist in the note
        for (const keyword in emojiMap) {
          if (note.toLowerCase().includes(keyword)) {
            return `${emojiMap[keyword]} ${note} ${emojiMap[keyword]}`;
          }
        }
      
        // If no keywords are found, return the default surrounded by emojis
        return `🌟 ${note} 🌟`;
      }
      
    // Function to format date and time strings
    function formatDateTimeString(date, time, offset = '') {
        // Implement your logic to format date and time strings
        // You may need to parse the input strings and format them as required
        // For example, you can return a formatted string like this:
        return `${date}T${time}${offset}`;
    }

    // Options for the "Day of the Week" dropdown
    const daysOfWeekOptions = [
        { value: 1, label: 'Sunday' },
        { value: 2, label: 'Monday' },
        { value: 3, label: 'Tuesday' },
        { value: 4, label: 'Wednesday' },
        { value: 5, label: 'Thursday' },
        { value: 6, label: 'Friday' },
        { value: 7, label: 'Saturday' },
    ];

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="rounded-lg overflow-hidden w-2/3 md:w-1/2 lg:w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}}
        ariaHideApp={false}
        >
            <div className="bg-white p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                        Title (Emojis are automatically added)
                        </label>
                        <input
                        type="text"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {formErrors.note && <p className="text-red-500 text-sm mt-1">{formErrors.note}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                        </label>
                        <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                        </label>
                        <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {formErrors.endDate && <p className="text-red-500 text-sm mt-1">{formErrors.endDate}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                        Start Time
                        </label>
                        <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                        End Time (11:59 PM maps to CLOSE in the app)
                        </label>
                        <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {formErrors.endTime && <p className="text-red-500 text-sm">{formErrors.endTime}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700">
                        Day of the Week
                        </label>
                        <select
                        id="dayOfWeek"
                        name="dayOfWeek"
                        value={formData.dayOfWeek}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                        {daysOfWeekOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`mt-4 bg-gray-400 text-white rounded-lg px-4 py-2 hover:${isSaveDisabled ? 'bg-gray-400' : 'bg-gray-500'}`}
                        disabled={isSaveDisabled}
                    >
                    Save
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default DealsModal;
