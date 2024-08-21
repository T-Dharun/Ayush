import { Route, Routes } from "react-router-dom";
import { GovernWorkspace } from "./pages";
import { CompanyDetails } from "./components";

const App=()=>{
  return(
    <>
      <Routes>
        <Route path='/government' element={<GovernWorkspace/>} />
        <Route path='/startupView/:startupId' element={<CompanyDetails/>} />
      </Routes>
    </>
  )
}
export default App;