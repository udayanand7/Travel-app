import React from 'react';

export const TripSummary = ({ trip, formData, totalPrice }) => {
    return (
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 sticky top-32">
            <h3 className="text-xl font-bold mb-6">Trip Summary</h3>
            <div className="flex gap-4 mb-6 pb-6 border-b border-slate-200">
                <img src={trip.image} alt={trip.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                    <h4 className="font-bold text-slate-900">{trip.name}</h4>
                    <p className="text-slate-500 text-sm">{trip.destination}</p>
                    <p className="text-primary-600 font-bold mt-1">${trip.price} / person</p>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                    <span>Travellers</span>
                    <span className="font-semibold text-slate-900">{formData.persons} Person(s)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Base Price</span>
                    <span className="font-semibold text-slate-900">${trip.price} x {formData.persons}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Taxes & Fees</span>
                    <span className="font-semibold text-green-600">Included</span>
                </div>
            </div>

            <div className="pt-6 border-t-2 border-dashed border-slate-200 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total Price</span>
                <span className="text-3xl font-extrabold text-primary-600">${totalPrice}</span>
            </div>
        </div>
    );
};
