import React from "react";
import { 
    Redirect, 
    Route, 
    Switch 
} from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import DeliverableDocument from "./DeliverableDocument";
import ItemDeliverableMonitoring from "./ItemDeliverableMonitoring";
import { 
  // FormattedMessage, 
  injectIntl 
} from "react-intl";
import { connect } from "react-redux";
// import { useSelector } from "react-redux";

function DeliverableDocumentRoutes(props) {
//   const { user } = useSelector((state) => state.auth);
//   const { intl } = props;
  const suhbeader = useSubheader();
  suhbeader.setTitle("Deliverable Document");
  return (
        <Switch>
          <Redirect
            from="/vendor/deliverable_document"
            exact={true}
            to="/vendor/deliverable_document/dashboard"
          />
          <Route
            path="/vendor/deliverable_document/dashboard"
            component={DeliverableDocument}
          />
          <Route
            path="/vendor/deliverable_document/item"
            component={ItemDeliverableMonitoring}
          />
        </Switch>
  );
}
export default injectIntl(connect(null, null)(DeliverableDocumentRoutes));