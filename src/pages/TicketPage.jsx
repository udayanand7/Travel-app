import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, User, Phone, MapPin, Download, CheckCircle2 } from 'lucide-react';

const TicketPage = ({ bookingData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingData) {
            navigate('/trips');
        }
        window.scrollTo(0, 0);
    }, [bookingData, navigate]);

    if (!bookingData) return null;

    return (
        <div className="py-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
                <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle2 size={40} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h1>
                <p className="text-slate-500 text-lg">Your adventure is waiting for you. Here is your digital ticket.</p>
            </div>

            {/* Ticket UI */}
            <div className="relative group">
                {/* Glow behind ticket */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500"></div>

                <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                    {/* Top colored bar */}
                    <div className="h-4 bg-gradient-to-r from-primary-600 to-primary-800"></div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-600 text-white p-3 rounded-2xl">
                                    <Plane className="rotate-45" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">TravellerApp</h3>
                                    <span className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">Digital Boarding Pass</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Booking ID</span>
                                <span className="text-xl font-mono font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-lg border border-primary-100">{bookingData.bookingId}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                            <div className="space-y-8">
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Passenger</label>
                                    <div className="flex items-center gap-3 text-slate-900 font-bold text-xl">
                                        <User size={20} className="text-primary-600" />
                                        {bookingData.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Contact</label>
                                    <div className="flex items-center gap-3 text-slate-900 font-bold">
                                        <Phone size={18} className="text-primary-600" />
                                        {bookingData.phone}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Travellers</label>
                                    <div className="text-slate-900 font-bold text-lg">{bookingData.persons} Person(s)</div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Destination</label>
                                    <div className="flex items-center gap-3 text-slate-900 font-bold text-xl">
                                        <MapPin size={20} className="text-primary-600" />
                                        {bookingData.trip.name}
                                    </div>
                                    <span className="text-slate-500 text-sm block mt-1 ml-8">{bookingData.trip.destination}</span>
                                </div>
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Status</label>
                                    <div className="flex items-center gap-2 text-green-600 font-black">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        CONFIRMED
                                    </div>
                                </div>
                                <div>
                                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Total Paid</label>
                                    <div className="text-3xl font-black text-slate-900">${bookingData.totalPrice}</div>
                                </div>
                            </div>
                        </div>

                        {/* Perforated Line */}
                        <div className="relative h-px border-t-2 border-dashed border-slate-200 my-12 -mx-12 before:absolute before:-left-3 before:-top-3 before:w-6 before:h-6 before:rounded-full before:bg-slate-50 after:absolute after:-right-3 after:-top-3 after:w-6 after:h-6 after:rounded-full after:bg-slate-50"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex gap-2">
                                <img src={bookingData.trip.image} alt="Trip thumb" className="w-16 h-16 rounded-xl object-cover grayscale" />
                                <div className="flex flex-col justify-center">
                                    <p className="text-sm font-bold text-slate-800">Scan for more info</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Terms & conditions apply</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
                                >
                                    <Download size={18} />
                                    Download PDF
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
