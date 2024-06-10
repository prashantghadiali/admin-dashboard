import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { ColorModeContext, useMode } from "./theme";
import { isLogin } from "./utils/auth";

function App() {
  const handleLogin = isLogin();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    if (!handleLogin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className={isLoginPage ? '' : 'content'}>
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
              <Route path="/login" element={<Login handleLogin={handleLogin} />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
              <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
              <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
              <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;



// import { useState } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { CssBaseline, ThemeProvider } from "@mui/material";
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
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar/calendar";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import { ColorModeContext, useMode } from "./theme";
// import { isLogin } from "./utils/auth";

// function App() {
//   const handleLogin = isLogin();
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const location = useLocation();

//   const ProtectedRoute = ({ children }) => {
//     if (!handleLogin) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />

//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/" element={<Login handleLogin={handleLogin} />} />
//               <Route
//                 path="/login"
//                 element={<Login handleLogin={handleLogin} />}
//               />

//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/team"
//                 element={
//                   <ProtectedRoute>
//                     <Team />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/contacts"
//                 element={
//                   <ProtectedRoute>
//                     <Contacts />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/invoices"
//                 element={
//                   <ProtectedRoute>
//                     <Invoices />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/form"
//                 element={
//                   <ProtectedRoute>
//                     <Form />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/bar"
//                 element={
//                   <ProtectedRoute>
//                     <Bar />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/pie"
//                 element={
//                   <ProtectedRoute>
//                     <Pie />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/line"
//                 element={
//                   <ProtectedRoute>
//                     <Line />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/faq"
//                 element={
//                   <ProtectedRoute>
//                     <FAQ />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/calendar"
//                 element={
//                   <ProtectedRoute>
//                     <Calendar />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/geography"
//                 element={
//                   <ProtectedRoute>
//                     <Geography />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;

// import { useState } from "react";
// // import Login from "../components/Login";
// // import NotFound from '../components/404';
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import { Routes, Route, Navigate } from "react-router-dom";
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
// import Geography from "./scenes/geography";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
// import { isLogin } from "./utils/auth";

// function App() {
//   const handleLogin = isLogin();
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   const ProtectedRoute = ({ children }) => {
//     if (!handleLogin) {
//       return <Navigate to="/login" replace />;
//     }
//     return children;
//   };

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Routes>
//           <Route path="/" element={<Login handleLogin={handleLogin} />} />
//           <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               {/* <Route path="/" element={<Dashboard />} />
//               <Route path="/team" element={<Team />} />
//               <Route path="/contacts" element={<Contacts />} />
//               <Route path="/invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/bar" element={<Bar />} />
//               <Route path="/pie" element={<Pie />} />
//               <Route path="/line" element={<Line />} />
//               <Route path="/faq" element={<FAQ />} />
//               <Route path="/calendar" element={<Calendar />} />
//               <Route path="/geography" element={<Geography />} /> */}
//               {/* <Route path="/" element={<Login handleLogin={handleLogin} />} />
//               <Route
//                 path="/login"
//                 element={<Login handleLogin={handleLogin} />}
//               /> */}
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               {/* <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               /> */}
//               <Route
//                 path="/team"
//                 element={
//                   <ProtectedRoute>
//                     <Team />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/contacts"
//                 element={
//                   <ProtectedRoute>
//                     <Contacts />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/invoices"
//                 element={
//                   <ProtectedRoute>
//                     <Invoices />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/form"
//                 element={
//                   <ProtectedRoute>
//                     <Form />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/bar"
//                 element={
//                   <ProtectedRoute>
//                     <Bar />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/pie"
//                 element={
//                   <ProtectedRoute>
//                     <Pie />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/line"
//                 element={
//                   <ProtectedRoute>
//                     <Line />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/faq"
//                 element={
//                   <ProtectedRoute>
//                     <FAQ />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/calendar"
//                 element={
//                   <ProtectedRoute>
//                     <Calendar />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/geography"
//                 element={
//                   <ProtectedRoute>
//                     <Geography />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

// export default App;
