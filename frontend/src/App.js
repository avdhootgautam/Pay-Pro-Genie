import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import DatasetUploadPage from "./pages/DatasetUploadPage";
function App() {
  // console.log("Heloo World!")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/upload-dataset" element={<DatasetUploadPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
