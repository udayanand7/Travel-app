import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plane, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass sticky top-0 z-50 py-4 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-600 p-2 rounded-lg text-white transition-transform group-hover:rotate-12">
                        <Plane size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                        Traveller<span className="text-slate-900">App</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Home</Link>
                    <Link to="/trips" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Explore</Link>
                    <button className="btn-primary py-2 px-5 text-sm">Special Deals</button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-primary-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600">Home</Link>
                    <Link to="/trips" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600">Explore</Link>
                    <button className="btn-primary w-full">Special Deals</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
