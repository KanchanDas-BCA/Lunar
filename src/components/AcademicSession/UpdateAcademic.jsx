import React, { useState } from 'react';
import { showToast } from '../../utils/ReactToast';
import CLoader from '../../utils/CLoader';

function UpdateAcademic({ handleEditModal, data, updateHandle, isBeingProcessed }) {
    const [formData, setFormData] = useState(data);
    const formFields = [
        { name: "SessionName", label: "Session Name", type: "text", colSpan: 1, required: true },
        { name: "SessionStartDateBs", label: "Session Start", type: "text", colSpan: 1, required: true },
        { name: "SessionEndDateBs", label: "Session End", type: "text", colSpan: 2, required: true },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        // Filter only required fields
        const requiredFields = formFields.filter(field => field.required);

        // Find the first missing required field
        const missingField = requiredFields.find(
            field => !formData[field.name]?.trim() // Check if the value is empty or missing
        );

        if (missingField) {
            showToast(`"${missingField.label}" is required!`, 'error');
            return;
        }
        //update if correct
        updateHandle(formData);
    }
    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center '>
                <div className='flex mx-auto w-full justify-center mt-[64px] max-h-[100%]'>
                    <div className='w-full border sm:max-w-xl bg-white m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
                        <div className='flex justify-end'>
                            <button
                                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                                onClick={handleEditModal}
                            >
                                X
                            </button>
                        </div>
                        <div className="mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Update Academic Session
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formFields.map((field) => (
                                    <div key={field.name} className={`md:col-span-${field.colSpan}`}>
                                        <label htmlFor={field.name} className="block text-lg font-medium text-gray-800 mb-1">
                                            {field.label}
                                            {field?.required && <span className="text-red-600"> *</span>}
                                        </label>
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                            required
                                        />
                                    </div>
                                ))}

                                {/* Switch Session */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                                    {isBeingProcessed ? (<CLoader />) : (

                                        <button
                                        type="submit"
                                
                                        className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800
                                        focus:outline-none focus:ring-2 focus:ring-offset-2
                                        focus:ring-blue-500 transition-all duration-300">
                                            Switch
                                        </button>
                                    )}
                                </div>

                   {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">

                                    {isBeingProcessed ? (<CLoader />) : (

                                        
                                        <button
                                            type="submit" 
                                            onClick={submitUpdate}
                                            className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateAcademic;
