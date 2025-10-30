import React from "react";

export default function ConfirmModal({ open, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
                <h2 className="text-lg font-semibold text-blue-600 mb-2">
                    Confirmar exclusão
                </h2>
                <p className="text-gray-700 mb-4">
                    Tem certeza que deseja remover este produto?
                </p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                        Remover
                    </button>
                </div>
            </div>
        </div>
    );
}
