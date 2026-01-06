import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import TripCard from '../components/TripCard';
import { Loader2 } from 'lucide-react';

const TripsListing = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'trips'));
                const tripsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTrips(tripsArray);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Discover Your Next Adventure</h1>
                <p className="text-slate-500 max-w-2xl">Browse our collection of {trips.length} hand-picked trips from across the globe. Now powered by Firebase.</p>

                <div className="flex flex-wrap gap-4 mt-10">
                    {['All Trips', 'Mountains', 'Beaches', 'Culture', 'Safari', 'City'].map((tag, i) => (
                        <button
                            key={i}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-400 hover:text-primary-600'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {trips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </div>
    );
};

export default TripsListing;
