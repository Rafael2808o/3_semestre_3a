import 'react-native-gesture-handler';

import NavStack from "./src/pages/NavStack";
import NavDrawer from "./src/pages/NavDrawer";
import NavTopTab from "./src/pages/NavTopTabs";
import NavBottomTab from "./src/pages/NavBottomTabs";

export default function App() {
  return (
    <NavStack />
    // <NavDrawer />
    // <NavTopTab />
    // <NavBottomTab />
  );
}