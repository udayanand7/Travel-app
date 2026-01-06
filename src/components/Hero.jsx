import React from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-105 hover:scale-100"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in zoom-in duration-700">
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-primary-600/30 backdrop-blur-md rounded-full border border-white/20">
                    Explore the world with us
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Discover <span className="text-primary-400">Unforgettable</span> Journeys
                </h1>
                <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-light">
                    Your portal to the world's most breathtaking destinations. Book your next adventure in minutes.
                </p>

                {/* Search Input UI */}
                <div className="bg-white/95 backdrop-blur-lg p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-white/20">
                    <div className="flex items-center gap-3 flex-1 px-4 w-full">
                        <MapPin className="text-primary-600" size={24} />
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="w-full py-3 bg-transparent border-none focus:outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <button className="w-full md:w-auto px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary-600/40 flex items-center justify-center gap-2">
                        <Search size={20} />
                        Search
                    </button>
                </div>

                {/* Floating Badges */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
                    {['10k+ Trips', 'Premium Hotels', '24/7 Support'].map((text, i) => (
                        <div key={i} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
