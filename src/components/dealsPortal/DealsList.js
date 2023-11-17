import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import DealCard from './DealCard';
import DealsModal from './DealsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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

  const [deleteDealModal, setDeleteDealModal] = useState(null);

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
        .then(async (response) => {
          const jsonString = await response.json();
          return JSON.parse(jsonString);
        })
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

  const filterDealsAndSort = (dealsList) => {
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

    // Sort deals first by deal.dayOfWeek and then by deal.startTime
    filteredDeals.sort((deal1, deal2) => {
      if (deal1.dayOfWeek !== deal2.dayOfWeek) {
        return deal1.dayOfWeek - deal2.dayOfWeek;
      } else {
        // If dayOfWeek is the same, sort by startTime
        return deal1.startTime.localeCompare(deal2.startTime);
      }
    });

    return filteredDeals;
  };

  return (
    <div className='max-w-[600px] mx-auto my-10 p-4 text-white'>

      <div className='pb-2'>
        <div className="text-black mx-auto bg-gray-300 rounded-xl px-4 py-6">
          <div className="flex items-top">
            <div className="font-sans font-apple-system text-5xl">{userData?.bar}</div>
            <div className="ml-auto text-lg">
              <button onClick={handleNewDeal} className='rounded-lg px-4 py-2 text-white bg-green-400 hover:bg-green-500'>
                New Deal
              </button>
              <button onClick={handleLogout} className='rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500 ml-2'>
                Logout
              </button>
            </div>
          </div>

          <div className="flex items-start py-6">
            <div className="font-sans font-apple-system text-lg">
              Welcome to The Bargain Deals Portal! Here, you can explore and manage all of the active deals for {userData?.bar} as well as create new deals. Deals are formatted as reccuring meaning that the start and end dates denote a time frame for each deal to repeat weekly specified by the day of the week as well as start and end times. If you have any questions, please reach out to us at bargainsipandsave@gmail.com.
            </div>
          </div>

          <div className="flex space-x-2 text-lg">
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
          <div className='flex space-x-2 pt-4 text-lg'>
            <label htmlFor="searchDeals">Search by name:</label>
            <input
              type="text"
              id="searchDeals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='text-black rounded-md'
            />
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {filterDealsAndSort(deals).map((deal) => (
          <li key={deal._id}>
            <DealCard
              deal={deal}
              onCardClick={(selectedDeal) => {
                setSelectedDeal(selectedDeal)
              }} 
              onClickDelete={(selectedDeal) => {
                setDeleteDealModal(selectedDeal)
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

      <DeleteConfirmationModal
        isOpen={!!deleteDealModal}
        closeModal={() => {
          setDeleteDealModal(null);
        }}
        deal={deleteDealModal}
        setDealWasUpdated={setDealWasUpdated}
      />
    </div>
  );
};

export default DealsList;