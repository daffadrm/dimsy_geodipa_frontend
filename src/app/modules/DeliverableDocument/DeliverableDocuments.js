import React from 'react';
import ReactDOM from 'react-dom';
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
  CardHeader,
  CardHeaderToolbar
} from "../../../_metronic/_partials/controls";
import { Table, Form, Row, Col } from "react-bootstrap";
import { 
    toAbsoluteUrl, 
    // checkIsActive 
} from "../../../_metronic/_helpers";
import ChildTable from "./childTable";
import { LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from '@material-ui/core';
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class DeliverableDocument extends React.Component {
    constructor(props) {
        super()
        
        this.state = {
            data:[
                {
                    id: 1,
                    nameDocument: "Laporan Hasil Pekerjaan",
                    child: [
                        {
                            name: "Bulan Oktober", 
                            date: "2020-01-01",
                            uploadDate: null,
                            note: "Sudah OK",
                            attachment_vendor: null,
                            upload_date_vendor: "2020-01-01",
                            attachment_user: null,
                            upload_date_user: "2020-01-01",
                            progress: null,
                            mandatory: false,
                            approval_date: null,
                            comment: "Sudah ok",
                            status: null,
                            action: null,
                            approval: null
                        }
                    ]
                },
                {
                    id: 2,
                    nameDocument: "Delevery Order",
                    child: [
                    ]
                },
                {
                    id: 3,
                    nameDocument: "Berita Acara Pemberian Penjelasan",
                    child: [
                        {
                            
                            name: "BAPP", 
                            date: null,
                            uploadDate: null,
                            note: null,
                            attachment_vendor: null,
                            upload_date_vendor: null,
                            attachment_user: null,
                            upload_date_user: null,
                            progress: null,
                            mandatory: false,
                            approval_date: null,
                            comment: null,
                            status: null,
                            action: null,
                            approval: null
                        }
                    ]
                },
                {
                    id: 4,
                    nameDocument: "Berita Acara Serah Terima",
                    child: [
                        {
                            name: "BAST", 
                            date: null,
                            uploadDate: null,
                            note: null,
                            attachment_vendor: null,
                            upload_date_vendor: null,
                            attachment_user: null,
                            upload_date_user: null,
                            progress: null,
                            mandatory: false,
                            approval_date: null,
                            comment: null,
                            status: null,
                            action: null,
                            approval: null
                        }
                    ]
                }
            ],
            addParent: {
                name: "",
                index: "",
                open: false,
                state: ""
            }
        };
    }

    //Life Circle pada React JS Component
    componentDidMount() {
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    async openChild(id, index){
        var src = document.getElementById("parent-icon-" + id).getAttribute("src");
        var newSrc = "";
        if(src === "/media/svg/icons/Files/Folder-plus.svg"){
            newSrc = "/media/svg/icons/Files/Folder-minus.svg";
            var indexRow = window.$("#parent-" + id).index();
            var html = `
            <tr id="child-${id}">
                <td colspan='14' style="padding: 0">
                    <table class="table" style="margin-bottom: 0">
                        <thead></thead>
                        <tbody  id="child-table-${id}"></tbody>
                    <table />
                </td>
            </tr>
            `
            window.$('#my_table > tbody > tr:eq(' + indexRow + ')').after(html);
            ReactDOM.render(<ChildTable index={index} data={this.state.data[index]} callBackAddData={this.callBackAddData.bind(this)} />, document.getElementById(`child-table-${id}`));
        }else{
            newSrc = "/media/svg/icons/Files/Folder-plus.svg";
            document.getElementById("child-" + id).remove()
        }
        document.getElementById("parent-icon-" + id).setAttribute("src", newSrc);
    }

    callBackAddData(_data, index){
        let data = [...this.state.data];
        data[index].child = _data;
        this.setState({data});
    }

    addDataChildByIndex(id, index){
        let data = [...this.state.data];
        data[index].child.push({
            name: null, 
            date: null,
            uploadDate: null,
            note: null,
            attachment_vendor: null,
            upload_date_vendor: null,
            attachment_user: null,
            upload_date_user: null,
            progress: null,
            mandatory: false,
            approval_date: null,
            comment: null,
            status: null,
            action: null,
            approval: null
        });
        this.setState({data}, () => {
            if(!document.getElementById(`child-table-${id}`)) return;
            ReactDOM.render(<ChildTable index={index} data={this.state.data[index]} callBackAddData={this.callBackAddData.bind(this)} />, document.getElementById(`child-table-${id}`));
        });
    }

    addDataParentByIndex(index){
        let data = [...this.state.data];
        let lastData = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1) + 1)) + Math.ceil(1);
        data.splice(index + 1, 0, {
            id: lastData,
            nameDocument: this.state.addParent.name,
            child: [
            ]
        });
        let addParent = {
            name: "",
            index: "",
            open: false,
            state: ""
        };
        this.setState({data, addParent});
    }

    render() {
        const { data, addParent } = this.state;
        return (
            <React.Fragment>
            <Dialog
                open={addParent.open}
                keepMounted
                // onClose={this.handleOk.bind(this)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">Create Data</DialogTitle>
                <Form onSubmit={(e) => {e.preventDefault();let addParent = this.state.addParent; addParent.open = false; this.setState({addParent},()=>{if(this.state.addParent.state === "new"){this.addDataParentByIndex(this.state.addParent.index)}})}}>
                    <DialogContent>
                        <Form.Group as={Row} controlId="formPlaintextNameParent">
                            <Form.Label column sm="2">
                            Nama
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control type="text" placeholder="Nama" value={addParent.name} onChange={(e) => {let addParent = this.state.addParent; addParent.name = e.target.value; this.setState({addParent}) }} required />
                            </Col>
                        </Form.Group>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-sm btn-primary" type="submit">
                            Simpan
                        </button>
                        
                        <button className="btn btn-sm btn-danger" onClick={() => {let addParent = this.state.addParent; addParent.open = false; addParent.name = ""; this.setState({addParent})}}>
                            Batal
                        </button>
                    </DialogActions>
                </Form>
            </Dialog>
            <Card>
                <CardHeader title="Deliverable Dokumen: Production 1">
                    <CardHeaderToolbar>
                        <button type="button" className="btn p-1">
                            <Link to="/user/delivery_monitoring/item">
                            <i className="fas fa-times"></i>
                            </Link>
                        </button>
                    </CardHeaderToolbar>
                </CardHeader>
                <LinearProgress />
                <CardBody>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <div className="segment-table">
                                <div className="hecto-20">
                                    <Table className="table-bordered overflow-auto" id="my_table">
                                        <thead>
                                            <tr>
                                                <th className="bg-primary text-white align-middle text-center td-3">
                                                    {/* <img
                                                        src={toAbsoluteUrl("/media/svg/icons/Files/File-plus.svg")}
                                                        alt="File-plus.svg"
                                                        className="pointer"
                                                        onClick={}
                                                    /> */}
                                                </th>
                                                <th className="bg-primary text-white align-middle td-17">Deliverable Document</th>
                                                <th className="bg-primary text-white align-middle td-3">Note</th>
                                                <th className="bg-primary text-white align-middle td-6">Action</th>
                                                <th className="bg-primary text-white align-middle td-8">Attachment Vendor</th>
                                                <th className="bg-primary text-white align-middle td-8">Upload Date</th>
                                                <th className="bg-primary text-white align-middle td-8">Attachment User</th>
                                                <th className="bg-primary text-white align-middle td-8">Upload Date</th>
                                                <th className="bg-primary text-white align-middle td-6">Project Progress (%)</th>
                                                <th className="bg-primary text-white align-middle td-8">Mandatory</th>
                                                <th className="bg-primary text-white align-middle td-8">Approval Date</th>
                                                <th className="bg-primary text-white align-middle td-3">Comment</th>
                                                <th className="bg-primary text-white align-middle td-8">Status</th>
                                                <th className="bg-primary text-white align-middle">Approval</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item, index) => {
                                                        return (
                                                            <tr key={index.toString()} id={"parent-" + item.id}>
                                                                <td className="text-center">
                                                                    <span onClick={this.openChild.bind(this, item.id, index)} className="pointer">
                                                                        <img
                                                                            src={toAbsoluteUrl("/media/svg/icons/Files/Folder-plus.svg")}
                                                                            alt={"parent-icon-" + item.id}
                                                                            id={"parent-icon-" + item.id}
                                                                        />
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {item.nameDocument}
                                                                    {
                                                                        item.nameDocument === "Berita Acara Pemberian Penjelasan" || item.nameDocument === "Berita Acara Serah Terima" ?
                                                                        null:
                                                                        item.child.length === 0 ?
                                                                        <span className="pointer" style={{marginLeft: 10}} onClick={this.addDataChildByIndex.bind(this, item.id, index)}>
                                                                            <i className="fa fa-plus text-primary"/>
                                                                        </span>
                                                                        :
                                                                        null
                                                                    }
                                                                </td>
                                                                <td className="align-middle text-center">-</td>
                                                                <td className="text-center">
                                                                    {
                                                                        item.nameDocument === "Berita Acara Pemberian Penjelasan" || item.nameDocument === "Berita Acara Serah Terima" ?
                                                                        null
                                                                        :
                                                                        <div>
                                                                            <i className="far fa-plus-square m-1 text-primary pointer" onClick={() => {let addParent = this.state.addParent; addParent.index = index; addParent.open = true; addParent.state = "new"; this.setState({addParent})}}></i>
                                                                            <i className="far fa-edit m-1 text-success pointer" onClick={() => {let addParent = this.state.addParent; addParent.index = index; addParent.open = true; addParent.state = "edit"; addParent.name = item.nameDocument; this.setState({addParent})}}></i>
                                                                            <i className="far fa-trash-alt m-1 text-danger pointer"></i>
                                                                        </div>
                                                                    }
                                                                </td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                            
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                </CardBody>
            </Card>
            </React.Fragment>
        )
    }
}

export default injectIntl(connect(null, null)(DeliverableDocument));