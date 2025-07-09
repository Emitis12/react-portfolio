import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/AnimatedNavbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import DownloadCV from "./components/DownloadCV";
import Footer from "./components/Footer";
import BlogPost from "./components/BlogPost";
import BlogList from "./components/BlogList";
import Preloader from "./components/Preloader";
import "antd/dist/reset.css";
import "./index.css";
import bgimg from "./img/bgimg.png"
import CustomCursor from "./components/CustomCursor";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading ? (
        <Preloader onFinish={() => setLoading(false)} />
      ) : (
       <div
  className="bg-cover bg-center bg-no-repeat text-white transition-all duration-500 min-h-screen"
  style={{
    backgroundImage: `url(${bgimg})`,
    imageRendering: "auto", // or "crisp-edges" for pixelated art
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

          <CustomCursor />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <DownloadCV />
                  <About />
                  <Projects />
                  <Skills />
                  <Testimonials />
                  <Contact />
                </>
              }
            />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
