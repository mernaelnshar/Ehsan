import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-layout">
                <Sidebar />
                <div className="content">
                    <Outlet />  {/* هنا هيتم عرض الصفحة حسب التنقل */}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
