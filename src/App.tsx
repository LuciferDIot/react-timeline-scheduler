import { Timeline } from "./components/templates";
import { demoSchedulerData } from "./data/demo";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <Timeline config={demoSchedulerData} scrollIntoToday />
    </div>
  );
}

export default App;
