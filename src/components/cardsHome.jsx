import React from "react";
import { Camera } from "lucide-react";

const CardHome = ({ id, nome, categoria, preco, quantidade, analise, img }) => {
    // passa pra float
    function passFloat(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return "0.00";
        return num.toFixed(2);
    }

    // passa pra int
    function passInt(value) {
        const num = parseInt(value);
        if (isNaN(num)) return 0;
        return num;
    }

    // exibe "-" quando valor vier nulo ou indefinido
    const safeValue = (v) => (v === null || v === undefined ? "-" : v);

    return (
        <div className="bg-white rounded-2xl shadow-md flex flex-col lg:flex-row items-center overflow-hidden hover:shadow-lg transition-all duration-200  border border-gray-200">
            {/* Área da imagem */}

            <div
                className={` ml-2 w-1/3 rounded-xl flex justify-center items-center p-5  ${img
                    ? "border border-gray-300 bg-transparent h-[200px]"
                    : "bg-blue-200 h-full"
                    }`}
            >
                {img ? (
                    <img
                        src={img}
                        className="object-contain w-full h-full rounded-lg"
                    />
                ) : (
                    <Camera size={64} className="text-blue-600" />
                )}
            </div>


            {/* Área de informações */}
            <div className="flex flex-col justify-between w-full lg:w-2/3 p-6">
                {/* Nome do produto */}
                <h3 className="text-xl font-bold text-gray-800 uppercase mb-3 break-words text-center lg:text-left">
                    {safeValue(nome)}
                </h3>

                {/* Informações gerais + IA */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                    <p className="col-span-2 lg:col-span-1">
                        <span className="font-semibold">Categoria:</span> {safeValue(categoria)}
                    </p>
                    <p className="col-span-2 lg:col-span-1">
                        <span className="font-semibold">Custo:</span> {safeValue(preco)}
                    </p>
                    <p className="col-span-2 lg:col-span-1">
                        <span className="font-semibold">Quantidade:</span> {safeValue(quantidade)}
                    </p>

                    {analise && (
                        <>
                            <p className="col-span-2 lg:col-span-1"><span className="font-semibold">Média diária:</span> {passInt(analise.diary_average)}</p>
                            <p className="col-span-2 lg:col-span-1"><span className="font-semibold">Demanda (lead time):</span> {passFloat(analise.demanda_leadtime)}</p>
                            <p className="col-span-2 lg:col-span-1"><span className="font-semibold">Estoque de segurança:</span> {passInt(analise.safety_stock)} unid</p>
                            <p className="col-span-2 lg:col-span-1"><span className="font-semibold">Estoque ideal:</span> {passInt(analise.estoque_ideal)}</p>
                            <p className="col-span-2 lg:col-span-1" ><span className="font-semibold">Pedir:</span> {passInt(analise.pedir)}</p>
                        </>
                    )}
                </div>

                <a href={`/verItem/${id}`} className="mt-5">
                    <button
                        className="border border-blue-500 text-blue-500 w-full bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    >
                        Ver Mais detalhes
                    </button>
                </a>
            </div>
        </div>
    );
};
export default CardHome;
