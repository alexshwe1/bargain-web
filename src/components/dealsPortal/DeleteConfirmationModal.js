import React from 'react';
import Modal from 'react-modal';

function DeleteConfirmationModal(props) {

    const handleDelete = (e) => {
        e.preventDefault();
        
        // Send a DELETE request to mongodb HTTP endpoint
        const dealId = props.deal._id;

        fetch(`https://us-east-1.aws.data.mongodb-api.com/app/bargainapi-xhtfb/endpoint/deals?dealId=${dealId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => {
            if (response.ok) {
              console.log('Deal deleted successfully.');
              props.setDealWasUpdated(true);
            } else {
              console.error('Error deleting deal.');
            }
          })
          .catch((error) => {
            console.error('Error deleting deal:', error);
          });

      
        // Close the modal
        props.closeModal();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            className="rounded-lg overflow-hidden w-2/3 md:w-1/2 lg:w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}}
            ariaHideApp={false}
        >
            <form 
                className="bg-white px-6 py-6"
                onSubmit={handleDelete}
            >
                <div className="pb-4">
                    <p>Are you sure you want to delete this deal?</p>
                    <p>{props.deal && props.deal.note}</p>
                    <p className="font-bold">This action cannot be undone</p>
                </div>
                <div className="ml-auto">
                    <button type="submit" className='rounded-lg px-6 py-2 text-white bg-red-500 hover:bg-red-600'>
                        Yes, delete this deal
                    </button>
                    <button onClick={() => props.closeModal()} className='rounded-lg px-6 py-2 text-white bg-gray-400 hover:bg-gray-500 ml-2'>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default DeleteConfirmationModal;