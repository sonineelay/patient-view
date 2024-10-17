import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="container-fluid p-0">
      <nav className="navbar bg-dark">
        <div className="container-fluid ">
          <span className="navbar-brand mb-0 h1 text-white">PatientView: Patient Health Dashboard </span>
        </div>
      </nav>
      <Dashboard />
    </div>
  );
};

export default App;
