import "./App.css";
import Header from '../src/components/Header'
import Conversor from '../src/components/Conversor'
import Footer from '../src/components/Footer'

function FlamaApp() {
  return (
    <div className="flama">
      <Header/>
      <Conversor/>
      <Footer/>
    </div>
  );
}

export default FlamaApp;
