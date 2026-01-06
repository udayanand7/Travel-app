import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import TripCard from './TripCard';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedTrips = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const q = query(collection(db, 'trips'), limit(3));
                const querySnapshot = await getDocs(q);
                const tripsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFeatured(tripsArray);
            } catch (error) {
                console.error("Error fetching featured trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={32} />
            </div>
        );
    }

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-1 w-12 bg-primary-600 rounded-full"></div>
                        <span className="text-primary-600 font-bold text-sm uppercase tracking-widest">Handpicked for you</span>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900">Featured Destinations</h2>
                </div>
                <Link
                    to="/trips"
                    className="flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all group"
                >
                    View All Trips
                    <ArrowUpRight size={20} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.length > 0 ? (
                    featured.map(trip => (
                        <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 mb-4">No trips found in database.</p>
                        <Link to="/seed" className="btn-primary inline-block">Seed Database</Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedTrips;
