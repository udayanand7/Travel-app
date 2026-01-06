import React from 'react';
import Hero from '../components/Hero';
import FeaturedTrips from '../components/FeaturedTrips';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

const Home = () => {
    return (
        <div className="animate-in fade-in duration-700">
            <Hero />
            <FeaturedTrips />

            {/* Why Choose Us Section */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Travel With Us?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">We provide a seamless booking experience and curate the most exclusive travel packages.</p>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Secure Bookings</h3>
                        <p className="text-slate-500 text-sm">Your data and payments are protected with industry-leading security standards.</p>
                    </div>

                    <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-accent-100 text-accent-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Confirmation</h3>
                        <p className="text-slate-500 text-sm">Get your digital ticket immediately after payment. No waiting, no hassle.</p>
                    </div>

                    <div className="text-center p-8 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="bg-rose-100 text-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-6">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Expert Curated</h3>
                        <p className="text-slate-500 text-sm">Every trip is hand-picked by our travel experts to ensure quality and value.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
