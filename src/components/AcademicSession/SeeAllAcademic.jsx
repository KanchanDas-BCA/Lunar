import React from 'react'

function SeeAllAcademic({ handleSeeAllModal, data, index }) {

    return (
        <>
            <div className=' fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='relative sm:max-w-[60%]  max-h-[100vh] flex justify-center items-center p-8 mt-[64px]'>
                    {/* Card container */}
                    <div className={`w-full bg-white border rounded-lg shadow-md p-6 m-4 
                        overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent`}>
                        <button
                            className="absolute right-[16%] top-[12%] text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={handleSeeAllModal}>
                            X
                        </button>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {(`${index + 1}.   ${data?.SessionName}`)}
                        </h3>
                        <div>
                            <p className="text-gray-600 mt-2"><b>Session Name:</b> {data?.SessionName}</p>
                            <p className="text-gray-600 mt-2"><b>Start Date Ad.:</b> {data?.SessionStartDate}</p>
                            <p className="text-gray-600 mt-2"><b>Start Date Bs.:</b> {data?.SessionStartDateBs}</p>
                            <p className="text-gray-600 mt-2"><b>End Date Ad.:</b> {data?.SessionEndDate}</p>
                            <p className="text-gray-600 mt-2"><b>End Date Bs.:</b> {data?.SessionEndDateBs}</p>
                        </div>
                        <p className="text-gray-600 mt-2"><b>Is Active:</b> {data.IsActive? "Yes" : "No"}</p>
                        <p className="text-gray-600 mt-2"><b>Is Current Session:</b> {data.IsCurrentSession? "Yes" : "No"}</p>
                        {/* For only viewAll */}
                        <div>
                        </div>

                        <div className="mt-4">
                            <span
                                className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {data.IsActive ? "Active" : "Blocked"}
                            </span>
                        </div>

                        {/* For back in details page
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                onClick={handleSeeAllModal}
                                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
                                Cancel
                            </button>
                        </div> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SeeAllAcademic
