import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
// import DocsPage from "@/pages/docs";
// import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/signin" element={<IndexPage />} />
      <Route path="/map" element={<IndexPage />} />
      <Route path="/donation-goals" element={<IndexPage />} />
    </Routes>
  );
}

export default App;
