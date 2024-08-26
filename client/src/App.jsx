import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails, Guide,Startup,Mentor,Investor } from "./components/index";
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import LandingPage from './pages/LandingPage';
import Bot from './pages/bot';
import Login from "./components/Login/login";
import { Home ,Status,ForgotPassword} from './pages';
import { useAuth } from './services/AuthContext';
import { useEffect,useState } from "react";
import axiosHeader from "./axiosHeader";
import AddClerk from "./components/government/AddClerk";
import ViewStartups from "./components/government/ViewStartups";
import EntityDetails from "./components/Registration/EntityDetails";
import AddressDetails from "./components/Registration/AddressDetails";
import { ProgressBar } from "./components/Home/index";
import Registration from "./pages/Registration";
import UserType from './components/Registration/UserType';
const App = () => {
  const [data, setData] = useState(null);
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
        <Route path='/' element={<LandingPage />} />
        <Route path="/register" element={<Home />} />
        <Route path="/r" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login/>} />
        {/*testing purposes  */}
        <Route path="/startup" element={<Startup />} /> 
        <Route path='UserType' element={<UserType/>}/>
        <Route path='/mentor' element={<Mentor/>}/>
        <Route path='/investor' element={<Investor/>}/>
        {user && (
          <>
            <Route path="/bot" element={<Bot />} />
            
            <Route path='/guide' element={<Guide />} />
            <Route path='/government' element={<GovernWorkspace />} />
            <Route path='/government/create' element={<AddClerk />} />
            <Route path='/startupView/:startupId' element={<CompanyDetails />} />
            <Route path='/approvedStartups' element={<ViewStartups/>} />
            <Route path="/status" element={<Status id={user.id} />} />
          </>
        )}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
