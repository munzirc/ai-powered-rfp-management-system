import ChatBox from "./modules/Chat/ChatBox";
import Rfp from "./modules/Rfp/Rfp";
import Sidebar from "./modules/Sidebar/Sidebar";
import VendorView from "./modules/Vendors/VendorView";
import useStore from "./store/store";

const views = {
  chat: <ChatBox />,
  rfps: <Rfp />,
  vendors: <VendorView />
};

function App() {
  const tab = useStore((state) => state.tab);



  return (
    <div className="relative bg-[#111111] h-screen w-screen flex items-center justify-center">
      <div
        className="absolute inset-4 bg-[#111111] rounded-xl 
      shadow-lg shadow-black/60 flex
    "
      >
        <div className="absolute w-[200px] top-0 bottom-0 left-0 bg-[#181818] rounded-l-xl">
          <Sidebar />
        </div>

        <div className="absolute left-[200px] right-0 top-0 bottom-0 bg-[#1a1a1a] rounded-r-xl">
          {
            views[tab] || <div className="text-white p-6">Select a tab from the sidebar.</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
