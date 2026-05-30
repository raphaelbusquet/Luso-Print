/* Lusoprint — root app */

const App = () => {
  return (
    <div id="top">
      <Announce />
      <Nav onCart={()=>{}} />
      <Hero />
      <Universos />
      <Edito />
      <Personalizacao />
      <Diario />
      <Newsletter />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
