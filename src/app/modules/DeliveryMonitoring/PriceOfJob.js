import React from 'react';
import { 
    // useSelector, 
    // shallowEqual, 
    connect, 
    // useDispatch 
} from "react-redux";
import { 
    // FormattedMessage, 
    injectIntl 
} from "react-intl";
import {
  Card,
  CardBody,
  CardHeader
} from "../../../_metronic/_partials/controls";
// import { Table } from "react-bootstrap";

class PriceOfJob extends React.Component {
    constructor(props) {
        super()
        this.state = {
        };
    }

    //Life Circle pada React JS Component
    componentDidMount() {
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        return (
            <React.Fragment>
            <Card>
                <CardHeader title="Harga Pekerjaan: Production 1">
                </CardHeader>
                <CardBody>
                    Harga Pekerjaan
                </CardBody>
            </Card>
            </React.Fragment>
        )
    }
}

export default injectIntl(connect(null, null)(PriceOfJob));