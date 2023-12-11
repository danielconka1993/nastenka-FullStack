import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/global/GlobalContext";
import SharedLayou from "./components/primary/SharedLayout";
import MinePage from "./pages/MinePage";
import Error from "./pages/Error";
import OnePost from "./components/posts/OnePost";

const App = () => {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayou />}>
              <Route index element={<MinePage />} />
              <Route path="*" element={<Error />} />
              <Route path="/:postID" element={<OnePost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
};

export default App;
