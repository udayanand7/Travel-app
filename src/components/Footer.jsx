import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 px-6 md:px-12 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-white text-xl font-bold mb-6">TravellerApp</h3>
                    <p className="text-sm leading-relaxed mb-6">
                        Discover unforgettable journeys with our curated selection of global adventures. We provide the best travel experiences tailored for you.
                    </p>
                    <div className="flex gap-4">
                        <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
                        <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
                        <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="/trips" className="hover:text-white transition-colors">Explore Trips</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Special Offers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Travel Blog</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Contact Info</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <MapPin size={18} className="text-primary-500" />
                            <span>123 Travel Lane, Adventure City</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-primary-500" />
                            <span>+1 (234) 567-890</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-primary-500" />
                            <span>hello@travellerapp.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} TravellerApp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
