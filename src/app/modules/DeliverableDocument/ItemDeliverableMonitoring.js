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
import { Table, 
    Form, 
    Col, 
    Row, 
    // Pagination 
} from "react-bootstrap";
// import SVG from "react-inlinesvg";
import { 
    // toAbsoluteUrl, 
    // checkIsActive 
} from "../../../_metronic/_helpers";
import {
  Card,
  CardBody,
//   CardHeader
} from "../../../_metronic/_partials/controls";
import { Link } from "react-router-dom";
import {
    Route, 
    // Switch
} from "react-router-dom";
// import PriceOfJob from "./PriceOfJob";
import DeliverableDocument from './DeliverableDocuments';
import { LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ItemDeliverableMonitoring extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: [
                { id: "1", name: null, date: null, weight: '20' },
                { id: "2", name: null, date: null, weight: '30' },
                { id: "3", name: null, date: null, weight: '25' },
                { id: "4", name: null, date: null, weight: '25' },
                { id: "5", name: null, date: null, weight: '25' },
                { id: "6", name: null, date: null, weight: '25' },
            ],
            updateData: [],
            preData: [],
            stateDialogSave: false
        };
    }

    //Life Circle pada React JS Component
    componentDidMount() {
        localStorage.setItem("oldData", JSON.stringify(this.state.data))
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    changesInputSow(index){
        let data = [...this.state.data];
        data[index].name = document.getElementById("sow-term-" + index).value;
        this.setState({data})
    }

    changesInputDateDelivery(index){
        let data = [...this.state.data];
        data[index].date = document.getElementById("date-delivery-" + index).value;
        this.setState({data})
    }

    comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            // wajib compare data yang tidak boleh berubah. contoh ID. sisanya boleh compare dengan data yang berubah.
            return other.name === current.name && other.date === current.date && other.id === current.id
          }).length === 0;
        }
    }

    async checkedFormItem(event){
        event.preventDefault();
        let { data } = this.state;
        const oldData = JSON.parse(localStorage.getItem("oldData"));
        var waittingCheckData = new Promise(async (resolve) => {
            for (let index = 0; index < data.length; index++) {
                data[index].name = data[index].name.replace(/^\s+/, '').replace(/\s+$/, '');
                if (index === data.length - 1) resolve();
            }
        })
        await waittingCheckData;
        let updateData = await data.filter(this.comparer(oldData));
        let preData = await oldData.filter(this.comparer(data));
        if(updateData.length > 0){
            var waittingNumbering = new Promise(async (resolve) => {
                for (let index = 0; index < updateData.length; index++) {
                    for (let indexs = 0; indexs < data.length; indexs++) {
                        if(updateData[index].id === data[indexs].id){
                            updateData[index].no = indexs + 1;
                        };
                        if (index === updateData.length - 1) resolve();
                    }
                }
            })
            await waittingNumbering;
            this.setState({updateData, stateDialogSave: true, preData});
        }else{
            this.setState({updateData, stateDialogSave: true, preData});
        }
    }

    render() {
        const { data, stateDialogSave, updateData, preData } = this.state;
        return (
            <React.Fragment>
            <Dialog
                open={stateDialogSave}
                keepMounted
                // onClose={this.handleOk.bind(this)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={updateData.length > 0 ? true : false}
            >
                <DialogTitle id="alert-dialog-title">Simpan Data</DialogTitle>
                <DialogContent>
                    {
                        updateData.length === 0 ?
                        <DialogContentText>
                            Tidak ada perubahan Data.
                        </DialogContentText>
                        :
                        <div>
                            <DialogContentText>
                                Berikut data yang diubah: 
                            </DialogContentText>
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <Table className="table-bordered overflow-auto">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary text-white align-middle">No</th>
                                                <th className="bg-primary text-white align-middle">Scope of Work(Term)</th>
                                                <th className="bg-primary text-white align-middle">Delivery Date</th>
                                                <th className="bg-primary text-white align-middle">Bobot(%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                updateData.map((item, index) => {
                                                    return(
                                                        <tr key={index.toString()}>
                                                            <td className="align-middle">{item.no}</td>
                                                            <td className="align-middle">
                                                                {
                                                                    preData.length > 0 && preData[index].name !== item.name ?
                                                                    <span>
                                                                        <span className="text-danger">{preData[index].name ? preData[index].name: "Null"}</span>
                                                                        <span><i className="fas fa-long-arrow-alt-right mr-1 ml-1"></i></span>
                                                                    </span>
                                                                    : null
                                                                }
                                                                <span className={preData.length > 0 && preData[index].name !== item.name ? "text-primary":""}>{item.name || ""}</span>
                                                            </td>
                                                            <td className="align-middle">
                                                                {
                                                                    preData.length > 0 && preData[index].date !== item.date ?
                                                                    <span>
                                                                        <span className="text-danger">{preData[index].date ? window.moment(preData[index].date).format("DD/MM/YYYY"): "Null"}</span>
                                                                        <span><i className="fas fa-long-arrow-alt-right mr-1 ml-1"></i></span>
                                                                    </span> 
                                                                    : null
                                                                }
                                                                <span className={preData.length > 0 && preData[index].date !== item.date ? "text-primary":""}>{item.date ? window.moment(item.date).format("DD/MM/YYYY") : ""}</span>
                                                            </td>
                                                            <td className="align-middle">{item.weight}%</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                        </div>
                    }
                    
                </DialogContent>
                <DialogActions>
                    {
                        updateData.length > 0 ?
                        <button className="btn btn-sm btn-primary" onClick={()=>{localStorage.setItem("oldData", JSON.stringify(data)); this.setState({stateDialogSave: false})}}>
                            Simpan
                        </button>
                        :
                        null
                    }
                    
                    <button className="btn btn-sm btn-danger" onClick={() => {this.setState({stateDialogSave: false})}}>
                        Batal
                    </button>
                </DialogActions>
            </Dialog>
            <Card>
                {/* <CardHeader title="Deliverable Document">
                    <CardHeaderToolbar>
                    </CardHeaderToolbar>
                </CardHeader> */}
                <LinearProgress className="rounded" />
                <CardBody>
                        <div className="row">
                            <div className="col-xl-6">
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                        Nomor PO
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="249710" className="bg-secondary" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="4">
                                        Nomor Kontrak
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="234.PJ/PST-001/I/2021" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6">
                                <Form.Group as={Row} controlId="formPlaintextEmail3">
                                    <Form.Label column sm="4">
                                        Nama Kontrak
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="bg-secondary" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword4">
                                    <Form.Label column sm="4">
                                        Nama Penyedia
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="ABC International" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>
                    <Form onSubmit={this.checkedFormItem.bind(this)}>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <div className="segment-table">
                                <div className="hecto-10">
                                    <Table className="table-bordered overflow-auto">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary text-white align-middle">No</th>
                                                <th className="bg-primary text-white align-middle">Scope of Work(Term)</th>
                                                <th className="bg-primary text-white align-middle">Delivery Date</th>
                                                <th className="bg-primary text-white align-middle">Bobot(%)</th>
                                                <th className="bg-primary text-white align-middle">Harga Pekerjaan</th>
                                                <th className="bg-primary text-white align-middle">Project Progress(%)</th>
                                                <th className="bg-primary text-white align-middle">Dokumen Progress</th>
                                                <th className="bg-primary text-white align-middle">Deliverable Dokumen</th>
                                                <th className="bg-primary text-white align-middle">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item, index) => {
                                                    return(
                                                        <tr key={index.toString()}>
                                                            <td className="align-middle text-center">{index + 1}</td>
                                                            <td>
                                                                <Form.Control size="sm" type="text" id={"sow-term-" + index} onChange={this.changesInputSow.bind(this, index)} value={item.name || ""} autoComplete="off" required/>
                                                                
                                                            </td>
                                                            <td>
                                                                <Form.Control size="sm" type="date" id={"date-delivery-" + index} onChange={this.changesInputDateDelivery.bind(this, index)} value={item.date || ""} required/>
                                                            </td>
                                                            <td className="align-middle text-center">{item.weight}%</td>
                                                            <td className="align-middle">
                                                                <div className="float-right">
                                                                    {/* <Link to="/vendor/deliverable_document/item/harga"> */}
                                                                        <i className="fas fa-edit pointer"></i>
                                                                    {/* </Link> */}
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">-</td>
                                                            <td className="align-middle">
                                                            -
                                                            </td>
                                                            <td className="align-middle">
                                                                <Link to="/vendor/deliverable_document/item/dokumen">
                                                                    <strong>Detail Dokumen</strong>
                                                                </Link>
                                                            </td>
                                                            <td className="align-middle">
                                                                <div className="float-right">
                                                                <i className="fas fa-edit pointer"></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className="text-right mt-4">
                            <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
                <div className="mt-5">
                <Route
                    path="/vendor/deliverable_document/item/dokumen"
                    component={DeliverableDocument}
                />
                {/* <Route
                    path="/vendor/deliverable_document/item/harga"
                    component={PriceOfJob}
                /> */}
                </div>
            </React.Fragment>
        )
    }
}

export default injectIntl(connect(null, null)(ItemDeliverableMonitoring));