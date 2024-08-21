import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails,Guide } from "./components/index";
const App=()=>{
  return(
    <>
      <Routes>
        <Route path='/guide' element={<Guide/>} />
        <Route path='/government' element={<GovernWorkspace/>} />
        <Route path='/startupView/:startupId' element={<CompanyDetails/>} />
      </Routes>
    </>
  )
}
export default App;
