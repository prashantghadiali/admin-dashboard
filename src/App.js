import React, { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  NavLink
} from "react-router-dom";
import { CssBaseline, ThemeProvider, Breadcrumbs, Link } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import OurClients from "./scenes/ourclients";
import Job from "./scenes/job";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { ColorModeContext, useMode } from "./theme";
import { isLogin } from "./utils/auth";
import Alert from "./components/Alert";

const generateBreadcrumbItems = (pathname) => {
  const pathnames = pathname.split("/").filter((x) => x);
  return pathnames.map((value, index) => {
    const url = `/${pathnames.slice(0, index + 1).join("/")}`;
    return (
      <Link key={url} component={NavLink} to={url}>
        {value}
      </Link>
    );
  });
};

function App({ children, pageName = "" }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Check if user is logged in
  const handleLogin = isLogin();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  // If user is not logged in and not on the login page, redirect to login
  if (!handleLogin && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {pageName !== "refresh" && <Alert />}

      {isLoginPage && (
        <Login />
      )}

      {!isLoginPage && (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                
                <Breadcrumbs aria-label="breadcrumb" style={{ margin: '16px 20px 0' }}>
                  <Link component={NavLink} to="/dashboard">
                    Home
                  </Link>
                  {generateBreadcrumbItems(location.pathname)}
                </Breadcrumbs>

                <Routes>
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
                  <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                  <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
                  <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                  <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
                  <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
                  <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
                  <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
                  <Route path="/job" element={<ProtectedRoute><Job /></ProtectedRoute>} />
                  <Route path="/ourClients" element={<ProtectedRoute><OurClients /></ProtectedRoute>} />
                  <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
                  <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

export default App;



// import React, { useState } from "react";
// import {
//   Routes,
//   Route,
//   useLocation,
//   NavLink,
//   Navigate,
// } from "react-router-dom";
// import { CssBaseline, ThemeProvider, Breadcrumbs, Link } from "@mui/material";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import OurClients from "./scenes/ourclients";
// import Job from "./scenes/job";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar/calendar";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import { ColorModeContext, useMode } from "./theme";
// import { isLogin } from "./utils/auth";
// import Alert from "./components/Alert";

// const generateBreadcrumbItems = (pathname) => {
//   const pathnames = pathname.split("/").filter((x) => x);
//   return pathnames.map((value, index) => {
//     const url = `/${pathnames.slice(0, index + 1).join("/")}`;
//     return (
//       <Link key={url} component={NavLink} to={url}>
//         {value}
//       </Link>
//     );
//   });
// };

// function App({ children, pageName = "" }) {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const location = useLocation();

//   // Check if user is logged in
//   const handleLogin = isLogin();
//   const isLoginPage = location.pathname === "/login" || location.pathname === "/";

//   // If user is not logged in and not on the login page, redirect to login
//   if (!handleLogin && !isLoginPage) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <>
//       {pageName !== "refresh" && <Alert />}

//       {pageName === "login" && (
//         <div>{children}</div>
//       )}
//       {pageName === "404" && (
//         <div>{children}</div>
//       )}
//       {!["login", "404"].includes(pageName) && (
//         <ColorModeContext.Provider value={colorMode}>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />

//             <div className="app">
//               {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
//               <main className={isLoginPage ? "" : "content"}>
//                 {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
                
//                 {!isLoginPage && (
//                   <Breadcrumbs aria-label="breadcrumb" style={{ margin: '16px 20px 0' }}>
//                     <Link component={NavLink} to="/dashboard">
//                       Home
//                     </Link>
//                     {generateBreadcrumbItems(location.pathname)}
//                   </Breadcrumbs>
//                 )}

//                 <Routes>
//                   <Route
//                     path="/"
//                     element={<Login handleLogin={handleLogin} />}
//                   />
//                   <Route
//                     path="/login"
//                     element={<Login handleLogin={handleLogin} />}
//                   />
//                   <Route
//                     path="/dashboard"
//                     element={
//                       <ProtectedRoute>
//                         <Dashboard />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/team"
//                     element={
//                       <ProtectedRoute>
//                         <Team />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/contacts"
//                     element={
//                       <ProtectedRoute>
//                         <Contacts />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/invoices"
//                     element={
//                       <ProtectedRoute>
//                         <Invoices />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/form"
//                     element={
//                       <ProtectedRoute>
//                         <Form />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/bar"
//                     element={
//                       <ProtectedRoute>
//                         <Bar />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/pie"
//                     element={
//                       <ProtectedRoute>
//                         <Pie />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/line"
//                     element={
//                       <ProtectedRoute>
//                         <Line />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/faq"
//                     element={
//                       <ProtectedRoute>
//                         <FAQ />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/job"
//                     element={
//                       <ProtectedRoute>
//                         <Job />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/ourClients"
//                     element={
//                       <ProtectedRoute>
//                         <OurClients />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/calendar"
//                     element={
//                       <ProtectedRoute>
//                         <Calendar />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route
//                     path="/geography"
//                     element={
//                       <ProtectedRoute>
//                         <Geography />
//                       </ProtectedRoute>
//                     }
//                   />
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//               </main>
//             </div>
//           </ThemeProvider>
//         </ColorModeContext.Provider>
//       )}
//     </>
//   );
// }

// export default App;