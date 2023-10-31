import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const DealsModal = ({ isOpen, closeModal, deal }) => {

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
        note: deal.note,
        startDate: deal.startDate,
        endDate: deal.endDate,
        startTime: deal.startTime,
        endTime: deal.endTime,
        dayOfWeek: deal.dayOfWeek,
      });
    }
  }, [deal]);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form (you can implement this)
  const handleSubmit = () => {
    // Implement form submission logic here
  };

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
    >
      <div className="bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
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
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
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
            className="mt-4 bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-4 py-2"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default DealsModal;
