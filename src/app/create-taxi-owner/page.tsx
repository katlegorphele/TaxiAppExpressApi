'use client';

import { useState } from 'react';

const CreateTaxiOwner = () => {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset status
    setError('');
    setSuccess(false);
    setLoading(true);

    // Prepare the data to be sent
    const taxiOwnerData = {
      name,
      walletAddress,
      phoneNumber, // Include phone number
    };

    try {
      // Make the POST request
      const response = await fetch('http://localhost:3001/api/taxiowner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxiOwnerData),
      });

      // Handle the response
      if (response.ok) {
        setSuccess(true);
        setName('');
        setWalletAddress('');
        setPhoneNumber(''); // Clear phone number
      } else {
        const errorResponse = await response.json();
        console.log(errorResponse);
        setError(errorResponse.message || 'Failed to create taxi owner');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Create Taxi Owner</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Wallet Address:</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {loading && <p className="text-blue-500">Submitting...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Passenger created successfully!</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaxiOwner;