import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { TripSummary } from '../components/TripSummary';
import { User, Phone, Users, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

const BookingPage = ({ setBookingData }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        persons: 1
    });

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const docRef = doc(db, 'trips', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTrip({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching trip for booking:", error);
            } finally {
                setLoading(false);
            }
            window.scrollTo(0, 0);
        };

        fetchTrip();
    }, [id]);

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={48} /></div>;
    if (!trip) return <div className="p-20 text-center">Trip not found.</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'persons' ? parseInt(value) || 1 : value
        }));
    };

    const totalPrice = trip.price * formData.persons;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingPayload = {
            ...formData,
            tripId: trip.id,
            tripName: trip.name,
            totalPrice,
            status: 'pending_payment',
            createdAt: serverTimestamp(),
            bookingId: `TRV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };

        // Note: We'll fully persist after payment is "confirmed" 
        // but we prepare the state now.
        setBookingData({
            ...formData,
            trip,
            totalPrice,
            bookingId: bookingPayload.bookingId
        });

        navigate('/payment');
    };

    return (
        <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold mb-12 text-slate-900 text-center md:text-left">Complete Your Booking</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 order-2 lg:order-1">
                    <TripSummary trip={trip} formData={formData} totalPrice={totalPrice} />
                    <div className="mt-8 flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
                        <ShieldCheck className="text-primary-600 mt-1" size={20} />
                        <p className="text-xs text-primary-700 leading-relaxed">
                            Your booking is protected. We are now syncing your details with our secure cloud servers.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+1 234 567 890"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">Number of Travellers</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="number"
                                        name="persons"
                                        min="1"
                                        max="10"
                                        required
                                        value={formData.persons}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-800 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary-500/30"
                                >
                                    Proceed to Payment
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
