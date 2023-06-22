import * as React from 'react';
import {Provider} from "react-redux"
import {store} from "./src/app/store"
import {Layout} from "./src/components/Layout/Layout"


function App() {

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;