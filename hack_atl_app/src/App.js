import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Homepage from './Homepage'
import AddProduct from './AddProduct'
import PurchaseView from './PurchaseView'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {Homepage}/>
        <Route exact path = "/AddProduct" component = {AddProduct}/>
        <Route exact path = "/PurchaseView" component = {PurchaseView}/>
      </Switch>
    </BrowserRouter>
    );
}

export default App;
