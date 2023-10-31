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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const [userData, setUserData] = useState(null);
  const [deals, setDeals] = useState([]); // State to store filtered deals

  const currentUserId = user ? user.uid : null;

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
    console.log("fetchUserData useEffect called")

    if (userData) {
      console.log("userdata found")
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
  }, [userData]);

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4 text-white'>
      <div className="flex items-start pb-2">
        <h1 className="font-sans font-apple-system text-5xl">My Deals</h1>
        <button onClick={handleLogout} className='rounded-lg px-6 py-2 text-white bg-gray-400 hover:bg-gray-500 ml-auto'>
          Logout
        </button>
      </div>

      <ul className="space-y-2">
        {deals.map((deal) => (
          <li key={deal.id}>
            <DealCard deal={deal} onCardClick={(selectedDeal) => setSelectedDeal(selectedDeal)} />
          </li>
        ))}
      </ul>

      <DealsModal isOpen={!!selectedDeal} closeModal={() => setSelectedDeal(null)} deal={selectedDeal} />
    </div>
  );
};

export default DealsList;