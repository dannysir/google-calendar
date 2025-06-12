import './App.css'
import {Provider} from "react-redux";
import {store} from "./redux/config/configStore.ts";
import {Calendar} from "./pages/Calendar.tsx";

function App() {

  return (
    <>
        <Provider store={store}>
            <Calendar/>
        </Provider>
    </>
  )
}

export default App
