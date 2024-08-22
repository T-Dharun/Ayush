import Header from "../components/Landing/Header";
import Navbar from "../components/Landing/Navbar";
import Hero from "../components/Landing/Hero";
import Analytics from "../components/Landing/Analytics";
import Newsletter from "../components/Landing/Newsletter";
import Cards from "../components/Landing/Cards";
import Footer from "../components/Landing/Footer";
function App() {
  return (
    <div className="bg-[#425417] ">
      <Header />
      <div className="bg-[url('https://img.freepik.com/premium-photo/ayurvedic-spices_6751-83.jpg?size=626&ext=jpg&ga=GA1.1.1532003599.1724182688&semt=ais_hybrid')] bg-cover bg-center">

      <Navbar />
      <Hero />
      </div>
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
