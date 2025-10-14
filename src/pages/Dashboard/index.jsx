import Navbar from "../../components/navbar";
import Dashboard from "../../components/dashboard";

function Dashboards() {

    return (
        <>
            <div className="flex w-full">
                {/* Navbar lateral fixa */}
                <Navbar />

                {/* Container principal */}
                <div className="flex flex-col flex-1 py-28 px-10 lg:py-10 min-h-screen bg-gray-50 overflow-x-hidden ml-0 lg:ml-52">
                    {/* Título */}
                    <h1 className="text-2xl lg:text-5xl text-center lg:text-left font-bold text-gray-800 mb-8">
                        Dashboard
                    </h1>
                    <Dashboard />
                </div>
            </div>
        </>
    );
}

export default Dashboards;