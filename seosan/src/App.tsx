import './App.css'
import {MyDatePicker} from "./MyCalendar.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/config/configStore.ts";

function App() {

  return (
    <>
        <Provider store={store}>
            <MyDatePicker/>
        </Provider>
    </>
  )
}

export default App
