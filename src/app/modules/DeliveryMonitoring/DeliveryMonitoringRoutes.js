import React from "react";
import { 
    Redirect, 
    Route, 
    Switch 
} from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import DeliveryMonitoring from "./DeliveryMonitoring";
import ItemDeliveryMonitoring from "./ItemDeliveryMonitoring";
import DeliveryDocument from "./DeliveryDocument";
import { 
  // FormattedMessage, 
  injectIntl 
} from "react-intl";
import { connect } from "react-redux";
// import { useSelector } from "react-redux";

function DeliveryMonitoringRoutes(props) {
  // const { user } = useSelector((state) => state.auth);
  // const { intl } = props;
  const suhbeader = useSubheader();
  suhbeader.setTitle("Delivery Monitoring");
  return (
        <Switch>
          <Redirect
            from="/user/delivery_monitoring"
            exact={true}
            to="/user/delivery_monitoring/dashboard"
          />
          <Route
            path="/user/delivery_monitoring/dashboard"
            component={DeliveryMonitoring}
          />
          <Route
            path="/user/delivery_monitoring/item"
            component={ItemDeliveryMonitoring}
          />
          <Route
            path="/user/delivery_monitoring/dokumen"
            component={DeliveryDocument}
          />
        </Switch>
  );
}
export default injectIntl(connect(null, null)(DeliveryMonitoringRoutes));