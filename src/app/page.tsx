import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md space-y-8 text-black">
        <h1 className="text-2xl font-bold text-center">Taxi DApp Forms</h1>

        <div className="grid grid-cols-1 gap-4">
          {/* Link to create-passenger page */}
          <Link href="/create-passenger">
            
              Create Passenger
            
          </Link>
         
          {/* Other links can go here */}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
