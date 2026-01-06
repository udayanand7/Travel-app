import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CreditCard, AlertCircle, Lock, Loader2 } from 'lucide-react';

const PaymentPage = ({ bookingData }) => {
    const navigate = useNavigate();
    const [enteredAmount, setEnteredAmount] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!bookingData) {
            navigate('/trips');
        }
        window.scrollTo(0, 0);
    }, [bookingData, navigate]);

    if (!bookingData) return null;

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');

        if (parseFloat(enteredAmount) === bookingData.totalPrice) {
            setIsProcessing(true);
            try {
                // PERSIST TO FIREBASE HERE
                await addDoc(collection(db, 'bookings'), {
                    ...bookingData,
                    trip: {
                        id: bookingData.trip.id,
                        name: bookingData.trip.name,
                        destination: bookingData.trip.destination,
                        price: bookingData.trip.price
                    },
                    status: 'confirmed',
                    paymentAmount: parseFloat(enteredAmount),
                    paidAt: serverTimestamp()
                });

                setTimeout(() => {
                    setIsProcessing(false);
                    navigate('/ticket');
                }, 1500);
            } catch (err) {
                console.error("Firebase save error:", err);
                setError("Database error. Please try again.");
                setIsProcessing(false);
            }
        } else {
            setError(`Please enter the exact total amount: $${bookingData.totalPrice}`);
        }
    };

    return (
        <div className="py-20 px-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Secure Payment</h1>
                <p className="text-slate-500">Confirmed bookings are now securely stored in our cloud database.</p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 flex flex-col relative overflow-hidden">
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                        <Loader2 className="w-16 h-16 text-primary-600 animate-spin mb-6" />
                        <p className="text-xl font-bold text-slate-800">Finalizing Booking...</p>
                        <p className="text-slate-500 text-sm">Saving to cloud database.</p>
                    </div>
                )}

                <div className="bg-slate-50 p-6 rounded-2xl mb-10 flex justify-between items-center border border-slate-100">
                    <div>
                        <span className="text-slate-400 text-sm block">Total Amount Due</span>
                        <span className="text-3xl font-bold text-slate-900">${bookingData.totalPrice}</span>
                    </div>
                    <div className="bg-primary-100 text-primary-600 p-3 rounded-xl">
                        <CreditCard size={24} />
                    </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-4">Enter Amount to Pay ($)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            required
                            value={enteredAmount}
                            onChange={(e) => setEnteredAmount(e.target.value)}
                            className={`w-full p-5 bg-slate-50 border rounded-2xl text-2xl font-bold focus:outline-none transition-all ${error ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 focus:ring-4 focus:ring-primary-50 focus:border-primary-500'
                                }`}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-rose-600 mt-4 animate-bounce">
                                <AlertCircle size={18} />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}
                        <p className="mt-4 text-sm text-slate-400 italic">
                            * Enter <strong>{bookingData.totalPrice}</strong> to save this booking to Firebase.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3"
                    >
                        Confirm & Pay
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-4 text-slate-400">
                    <div className="grayscale opacity-50 flex items-center gap-1">
                        <Lock size={12} />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Firebase Secured</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
