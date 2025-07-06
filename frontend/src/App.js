import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
function App() {
  // console.log("Heloo World!")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        {/* <Route path="/otp-login" element={<OtpLoginForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
