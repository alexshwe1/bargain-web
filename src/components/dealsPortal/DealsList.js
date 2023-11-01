import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import DealCard from './DealCard';
import DealsModal from './DealsModal';

const DealsList = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);

  const [userData, setUserData] = useState(null);
  const [deals, setDeals] = useState([]); // State to store filtered deals
  const [dealWasUpdated, setDealWasUpdated] = useState(false);

  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(0); // Initialize with an "All" option
  const [searchTerm, setSearchTerm] = useState("");

  const currentUserId = user ? user.uid : null;

  const defaultDeal = {
    note: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    dayOfWeek: "1",
  };

  const handleNewDeal = () => {
    setSelectedDeal(null); // Close any open deal modal
    setIsNewDealModalOpen(true); // Open the "New Deal" modal
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signIn');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if(currentUserId) {
      // Define the collection reference
      const usersCollectionRef = collection(db, 'users');
      // Define the query to find the user document with the currentUserId
      const userQuery = query(usersCollectionRef, where('id', '==', currentUserId));

      // Retrieve the document
      getDocs(userQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Document with the matching UUID found
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              setUserData(data)
            });
          } else {
            console.log(`No documents found with the specified id: ${currentUserId}.`);
          }
        })
        .catch((error) => {
          console.error('Error retrieving document:', error);
        });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (userData) {
      // Fetch deals from the provided endpoint and filter by userData.barId
      fetch('https://us-east-1.aws.data.mongodb-api.com/app/bargainapi-xhtfb/endpoint/deals')
        .then((response) => response.json())
        .then((data) => {
          const filteredDeals = data.filter((deal) => {
            return deal.barId === userData.barId
          });
          setDeals(filteredDeals);
        })
        .catch((error) => {
          console.log('Error fetching deals:', error);
        });
    }
    setDealWasUpdated(false);
  }, [userData, dealWasUpdated]);

  const filterDeals = (dealsList) => {
    let filteredDeals = dealsList;
    if (selectedDayOfWeek !== 0) {
      filteredDeals = filteredDeals.filter((deal) => {
        return deal.dayOfWeek === selectedDayOfWeek;
      });
    }
  
    if (searchTerm) {
      filteredDeals = filteredDeals.filter((deal) => {
        return deal.note.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  
    return filteredDeals;
  };

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4 text-white'>

      <div className="flex items-start pb-2">
        <h1 className="font-sans font-apple-system text-5xl">My Deals</h1>
        <div className="ml-auto">
          <button onClick={handleNewDeal} className='rounded-lg px-6 py-2 text-white bg-green-400 hover:bg-green-500'>
            New Deal
          </button>
          <button onClick={handleLogout} className='rounded-lg px-6 py-2 text-white bg-gray-400 hover:bg-gray-500 ml-2'>
            Logout
          </button>
        </div>
      </div>

      <div className="flex space-x-2">
        <label htmlFor="dayOfWeekFilter">Day of the week:</label>
        <select
          id="dayOfWeekFilter"
          value={selectedDayOfWeek}
          onChange={(e) => setSelectedDayOfWeek(parseInt(e.target.value))}
          className='text-black rounded-md px-2'
        >
          <option value="0">All</option>
          <option value="1">Sunday</option>
          <option value="2">Monday</option>
          <option value="3">Tuesday</option>
          <option value="4">Wednesday</option>
          <option value="5">Thursday</option>
          <option value="6">Friday</option>
          <option value="7">Saturday</option>
        </select>
      </div>
      <div className='flex space-x-2 py-4'>
        <label htmlFor="searchDeals">Search by name:</label>
        <input
          type="text"
          id="searchDeals"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='text-black rounded-md'
        />
      </div>

      <ul className="space-y-2">
        {filterDeals(deals).map((deal) => (
          <li key={deal._id}>
            <DealCard
              deal={deal}
              onCardClick={(selectedDeal) => {
                setSelectedDeal(selectedDeal)
              }} 
            />
          </li>
        ))}
      </ul>

      <DealsModal 
        isOpen={!!selectedDeal || isNewDealModalOpen} 
        closeModal={() => {
          setSelectedDeal(null);
          setIsNewDealModalOpen(false);
        }}
        isNewDeal={isNewDealModalOpen}
        deal={selectedDeal || defaultDeal} // Pass a default empty deal object
        setDealWasUpdated={setDealWasUpdated}
        barId={userData?.barId}
      />
    </div>
  );
};

export default DealsList;