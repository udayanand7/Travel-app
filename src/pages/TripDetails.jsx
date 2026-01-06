import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Clock, MapPin, CheckCircle2, Navigation, ArrowLeft, Users, Calendar, Loader2 } from 'lucide-react';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const docRef = doc(db, 'trips', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTrip({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching trip:", error);
            } finally {
                setLoading(false);
            }
            window.scrollTo(0, 0);
        };

        fetchTrip();
    }, [id]);

    if (loading) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (!trip) {
        return <div className="p-20 text-center">Trip not found.</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20">
            {/* Top Banner */}
            <div className="relative h-[50vh] md:h-[65vh] w-full">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12 max-w-7xl mx-auto">
                    <Link to="/trips" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Trips</span>
                    </Link>
                    <div className="flex items-center gap-2 text-primary-400 mb-2 font-bold uppercase tracking-widest text-sm">
                        <MapPin size={18} />
                        {trip.destination}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">{trip.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">About this trip</h2>
                        <p className="text-slate-600 leading-relaxed text-lg mb-8">{trip.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-100 mb-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-sm">Duration</span>
                                <div className="flex items-center gap-2 text-slate-800 font-bold">
                                    <Clock size={18} className="text-primary-600" />
                                    {trip.duration}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-sm">Tour Type</span>
                                <div className="flex items-center gap-2 text-slate-800 font-bold">
                                    <Navigation size={18} className="text-primary-600" />
                                    Guided Tour
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-sm">Group Size</span>
                                <div className="flex items-center gap-2 text-slate-800 font-bold">
                                    <Users size={18} className="text-primary-600" />
                                    12 People
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 text-sm">Best Season</span>
                                <div className="flex items-center gap-2 text-slate-800 font-bold">
                                    <Calendar size={18} className="text-primary-600" />
                                    All Year
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h3 className="text-2xl font-bold mb-6">Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trip.highlights?.map((highlight, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <CheckCircle2 className="text-primary-600 flex-shrink-0" size={24} />
                                    <span className="font-medium text-slate-700">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold mb-8">Itinerary</h3>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {trip.itinerary?.map((item, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-primary-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-500">
                                        <span className="text-sm font-bold">{item.day}</span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
                                        <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
                        <div className="mb-8">
                            <span className="text-slate-400 text-sm block mb-1">Price per person</span>
                            <div className="text-4xl font-bold text-slate-900">${trip.price}</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm py-3 border-b border-slate-50">
                                <span className="text-slate-500">Deposit</span>
                                <span className="text-slate-900 font-semibold">20% Downpayment</span>
                            </div>
                            <div className="flex justify-between text-sm py-3 border-b border-slate-50">
                                <span className="text-slate-500">Cancellation</span>
                                <span className="text-slate-900 font-semibold">Free 72h before</span>
                            </div>
                        </div>

                        <Link
                            to={`/book/${trip.id}`}
                            className="btn-primary w-full py-4 text-center block text-lg"
                        >
                            Book This Trip
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
