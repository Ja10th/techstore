import Floating from "./components/floating";
import FloatingTwo from "./components/FloatingTwo";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductLust";
import Top from "./components/top";


const cartConfig = {
  cartMode: 'client-only', // Use client-only mode
  // stripe: 'your-publishable-key', // No need to add this for client-only
};

export default function Home() {
  
  return (
   <>
   <Top />
   <Floating />
   <Navbar />
   <Hero />
   <ProductList />
   </>
  );
}
