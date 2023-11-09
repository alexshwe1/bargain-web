import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { UserAuth } from '../../contexts/AuthContext';

const ResetPasswordModel = (props) => {
    const [email, setEmail] = useState("");
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [formErrors, setFormErrors] = useState("");
    const [isPasswordResetSuccessfully, setIsPasswordResetSuccessfully] = useState(false);
    const { resetPassword } = UserAuth();
    const [wasPasswordResetAttempted, setWasPasswordResetAttempted] = useState(false);

    useEffect(() => {
        // Check validation rules and update the "Save" button disabled state
        const validationResults = validateForm();
        setIsSaveDisabled(validationResults.isInvalid);
        setFormErrors(validationResults.errors);
    }, [email]);

    const validateForm = () => {
        let errors = "";
        let isInvalid = false;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            isInvalid = true;
            errors = "Email is not valid.";
        }
        return { errors, isInvalid };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetPassword(email)
            .then(() => {
                setIsPasswordResetSuccessfully(true);
                setWasPasswordResetAttempted(true);
            })
            .catch((error) => {
                setIsPasswordResetSuccessfully(false);
                setWasPasswordResetAttempted(true);
            });
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => {
                setWasPasswordResetAttempted(false);
                props.closeModal()
                setEmail("")
            }}
            className="rounded-lg overflow-hidden w-2/3 md:w-1/2 lg:w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}}
            ariaHideApp={false}
        >
            {wasPasswordResetAttempted ?
                <div className="flex flex-col items-center bg-white p-4">
                    {isPasswordResetSuccessfully ? 
                        <div className='text-black font-medium text-center'>Password reset instructions sent to {email}</div> 
                    : 
                        <div className='text-black font-medium text-center'>Failed to reset password</div> 
                    }
                    <div className='pt-2'>
                        <button 
                            onClick={() => {
                                setWasPasswordResetAttempted(false);
                                props.closeModal()
                                setEmail("")
                            }} 
                            className='flex items-center rounded-lg px-6 py-2 text-white bg-gray-400 hover:bg-gray-500 ml-2'
                        >
                            Close
                        </button>
                    </div>
                </div>
            :
                <div className="bg-white p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Enter your email
                            </label>
                            <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {formErrors && <p className="text-red-500 text-sm mt-1">{formErrors}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`mt-4 bg-gray-400 text-white rounded-lg px-4 py-2 hover:${isSaveDisabled ? 'bg-gray-400' : 'bg-gray-500'}`}
                            disabled={isSaveDisabled}
                        >
                        Reset Password
                        </button>
                    </form>
                </div>
            }
        </Modal>
    );
}

export default ResetPasswordModel;
