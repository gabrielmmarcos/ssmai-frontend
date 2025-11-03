import React, { useRef, useState } from "react";

export default function CameraDesktop({ onCapture, onClose }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streaming, setStreaming] = useState(false);

    const startCamera = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Seu navegador não suporta câmera ou só funciona via HTTPS");
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setStreaming(true);
        } catch (err) {
            console.error("Erro ao acessar a câmera:", err);
            alert("Não foi possível acessar a câmera.");
            onClose();
        }
    };


    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
            onCapture(blob);
            onClose();
        }, "image/jpeg");

        // Para liberar a câmera
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-4 rounded-lg flex flex-col items-center gap-2">
                {!streaming ? (
                    <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Abrir Câmera
                    </button>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay className="w-64 h-48 border rounded" />
                        <button onClick={takePhoto} className="bg-green-500 text-white px-4 py-2 rounded">
                            Tirar Foto
                        </button>
                    </>
                )}
                <button onClick={onClose} className="mt-2 text-red-500 underline">
                    Cancelar
                </button>
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
        </div>
    );
}
