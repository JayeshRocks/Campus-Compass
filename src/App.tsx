import Header from "./components/layout/Header";
import Sidebar from "./components/sidebar/Sidebar";
import MapView from "./components/map/MapView";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <MapView />
      </main>
    </>
  );
}
