/**
 * Created by zhengHu on 16-9-1.
 */
import 'core-js/fn/object/assign';
import React from 'react';
import {render} from 'react-dom';
import {Router,Route,browserHistory} from 'react-router'
import useBasename from 'history/lib/useBasename'
import App from './components/settlement';
import Header from './components/Header';
import SettlementTicketList from './components/settlement/ticket/SettlementTicketList';
import SettlementDeliveryMain from './components/settlement/delivery/SettlementDeliveryMain';
import SettlementProList from './components/settlement/SettlementProList';
import SettlementReceiptMain from './components/settlement/receipt/SettlementReceiptMain';
import InvalideProList from './components/settlement/InvalideProList';
// 此处用于添加根路径
const historyw = useBasename(() => browserHistory)({ basename: `/react_settlement1` });

render(
  <Router history={historyw}>
    <Route path="/index.html" component={App} />
        <Route path="SettlementTicketListForReact(:cart)" component={SettlementTicketList}/>
        <Route path="deliveryForReact(:cart)" component={SettlementDeliveryMain}/>
        <Route path="SettlementProListForReact(:cart)" component={SettlementProList}/>
        <Route path="receiptForReact(:cart)" component={SettlementReceiptMain}/>
  </Router>
  , document.getElementById('main-page-view')
);
