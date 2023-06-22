import * as React from 'react';
import {Provider} from "react-redux"
import {store} from "./src/app/store"
import {Navigation} from "./src/common/navigation/Navigation"


function App() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;