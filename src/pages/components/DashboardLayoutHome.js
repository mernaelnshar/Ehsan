import { Outlet } from "react-router-dom";
import SidebarHome from "./SidebarHome";
import NavbarHome from "./NavbarHome";

const DashboardLayoutHome = () => {
    return (
        <div className="dashboard-container">
            <NavbarHome />
            <div className="dashboard-layout">
                <SidebarHome />
                <div className="content">
                    <Outlet />  {/* هنا هيتم عرض الصفحة حسب التنقل */}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayoutHome;
