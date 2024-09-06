import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails, Guide, Startup, Mentor, Investor } from "./components/index";
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Bot from './pages/bot';
import Login from "./components/Login/login";
import { Home ,Status,ForgotPassword,Courses} from './pages';
import { useAuth } from './services/AuthContext';
import { useEffect, useState } from "react";
import axiosHeader from "./axiosHeader";
import AddClerk from "./components/government/AddClerk";
import ViewStartups from "./components/government/ViewStartups";
import EntityDetails from "./components/Registration/EntityDetails";
import AddressDetails from "./components/Registration/AddressDetails";
import { ProgressBar } from "./components/Home/index";
import Registration from "./pages/Registration";
import InvestorRegistration from "./pages/InvestorRegistration";
import MentorRegistration from "./pages/MentorRegistration";
import UserType from './components/Registration/UserType';
import CertificateGenerator from "./pages/CertificateGenerator";
const App = () => {
  const [data, setData] = useState(null);
  const [type,setType]=useState(0);
  const { user, loading } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosHeader.get('auth/me');
        localStorage.setItem('data', JSON.stringify(response.data));
        setData(response.data); // Store the data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) { // Fetch data only if 'user' exists
      fetchData();
    }
  }, [user]);
  if (loading) {
    return <Spinner size="xl" />; // Show a loading spinner or placeholder
  }
  return (
    <ChakraProvider>
      <Routes>
        {/* //development purpose */}
        {/*<Route path="/register" element={<Home />} />*/}
        <Route path='/' element={<LandingPage />} />
        
        <Route path="/certificate" element={<CertificateGenerator />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/courses" element={<Courses />} />
        {/*testing purposes  */}
        
        {user && (
          <>
            <Route path="/bot" element={<Bot />} />
            <Route path='/guide' element={<Guide  type={type}/>} />
            <Route path='/government' element={<GovernWorkspace />} />
            <Route path='/government/create' element={<AddClerk />} />
            <Route path='/startupView/:startupId' element={<CompanyDetails />} />
            <Route path='/approvedStartups' element={<ViewStartups />} />
            <Route path="/status" element={<Status id={user.id} />} />
            <Route path="/startup" element={<Startup />} /> 
            <Route path='/UserType' element={<UserType setType={setType}/>}/>
            <Route path='/mentor' element={<Mentor/>}/>
            <Route path='/investor' element={<Investor/>}/>
            
          </>
        )}
      </Routes>
      {user&&<Bot/>}
    </ChakraProvider>
  );
}

export default App;
