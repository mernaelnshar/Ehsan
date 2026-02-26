import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <Navbar />

            <main className="dashboard-layout">
                <Sidebar />

                <section className="content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;
