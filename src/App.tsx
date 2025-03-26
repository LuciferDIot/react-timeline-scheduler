import "./App.css";
import { TimeLineScheduler } from "./components/templates";
import { demoSchedulerData } from "./data/demo";

function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <TimeLineScheduler config={demoSchedulerData} scrollIntoToday />
    </div>
  );
}

export default App;
