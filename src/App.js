import "./App.css";
import Mansonry from "./Mansonry";

function App() {
  const photos = [];

  for (let step = 1; step < 8; step++) {
    photos.push(<img key={step} alt={step} src={`/assets/00${step}.jpg`} />);
  }

  return <Mansonry>{photos}</Mansonry>;
}

export default App;
