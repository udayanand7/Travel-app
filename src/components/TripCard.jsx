import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

const TripCard = ({ trip }) => {
    return (
        <div className="card group">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={trip.image}
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary-700 shadow-sm">
                    ${trip.price} / person
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-slate-900/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border border-white/10">
                        {trip.duration}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex items-center gap-1.5 text-primary-600 mb-2">
                    <MapPin size={14} />
                    <span className="text-xs font-semibold uppercase tracking-wider">{trip.destination}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {trip.name}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {trip.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-bold text-slate-700">4.9</span>
                    </div>

                    <Link
                        to={`/trip/${trip.id}`}
                        className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        Details
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
