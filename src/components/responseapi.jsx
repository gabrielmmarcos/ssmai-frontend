import React from "react";

export default function ResponseAPI({ open, onClose, message, title }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
                <h2 className="text-lg font-semibold text-blue-600 mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
