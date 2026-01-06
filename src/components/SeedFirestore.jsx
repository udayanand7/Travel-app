import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { expandedTrips } from '../data/expandedTrips';

const SeedFirestore = () => {
    const [status, setStatus] = useState('');
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        setStatus('Clearing old data and seeding 21 new trips...');
        try {
            const tripsCol = collection(db, 'trips');

            // Clear existing
            const snapshot = await getDocs(tripsCol);
            for (const d of snapshot.docs) {
                await deleteDoc(doc(db, 'trips', d.id));
            }

            // Add new
            for (const trip of expandedTrips) {
                await addDoc(tripsCol, trip);
            }
            setStatus('Success! 21 trips uploaded to Firestore. You can now go to Home or Explore.');
        } catch (error) {
            console.error(error);
            setStatus('Error: ' + error.message);
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="py-32 px-6 max-w-2xl mx-auto text-center">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <h2 className="text-3xl font-black mb-6 text-slate-900">Database Setup</h2>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    This tool will populate your Firebase Firestore with 21 high-quality travel destinations, complete with itineraries and images.
                </p>

                <button
                    onClick={handleSeed}
                    disabled={isSeeding}
                    className={`btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 ${isSeeding ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSeeding ? 'Processing...' : 'Seed Firestore Now'}
                </button>

                {status && (
                    <div className="mt-8 p-4 bg-primary-50 text-primary-700 rounded-xl font-bold border border-primary-100 animate-in fade-in slide-in-from-top-2">
                        {status}
                    </div>
                )}

                <div className="mt-10 pt-10 border-t border-slate-50 flex justify-center gap-6">
                    <a href="/" className="text-sm font-bold text-slate-400 hover:text-primary-600">Go Home</a>
                    <a href="/trips" className="text-sm font-bold text-slate-400 hover:text-primary-600">Explore Trips</a>
                </div>
            </div>
        </div>
    );
};

export default SeedFirestore;
