/**
 * Created by zhengHu on 16-9-1.
 */
import 'core-js/fn/object/assign';
import React from 'react';
import {render} from 'react-dom';
import {Router,Route,browserHistory} from 'react-router'
import App from './components/settlement';
import Header from './components/Header';
import SettlementTicketList from './components/settlement/ticket/SettlementTicketList';
import SettlementDeliveryMain from './components/settlement/delivery/SettlementDeliveryMain';
import SettlementProList from './components/settlement/SettlementProList';
import SettlementReceiptMain from './components/settlement/receipt/SettlementReceiptMain';
render(
  <Router history={browserHistory}>
    <Route path="/*.html(:cart)" component={App} />
    <Route path="/header" component={Header}/>
    <Route path="/SettlementTicketList(:cart)" component={SettlementTicketList}/>
    <Route path="/delivery(:cart)" component={SettlementDeliveryMain}/>
    <Route path="/SettlementProList(:cart)" component={SettlementProList}/>
    <Route path="/receipt(:cart)" component={SettlementReceiptMain}/>
  </Router>
  , document.getElementById('main-page-view')
);
