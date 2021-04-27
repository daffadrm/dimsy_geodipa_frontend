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
// import { 
//     toAbsoluteUrl, 
//     // checkIsActive 
// } from "../../../_metronic/_helpers";
import ChildTable from "./childTable";
import { LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from '@material-ui/core';
import { Link } from "react-router-dom";
import { cloneDeep  } from "lodash";
// import axios from "axios";
import {getDocumentPO} from "./_redux/deliveryMonitoringCrud"
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class DeliveryDocument extends React.Component {
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
                        },
                        {
                            name: "Bulan November", 
                            date: "2020-01-02",
                            uploadDate: null,
                            note: "Sudah OK",
                            attachment_vendor: null,
                            upload_date_vendor: "2020-01-02",
                            attachment_user: null,
                            upload_date_user: "2020-01-02",
                            progress: null,
                            mandatory: false,
                            approval_date: null,
                            comment: "Sudah ok",
                            status: null,
                            action: null,
                            approval: null
                        }
                    ],
                    icon: "fas fa-folder-plus"
                },
                {
                    id: 2,
                    nameDocument: "Delivery Order",
                    child: [
                    ],
                    icon: "fas fa-folder-plus"
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
                    ],
                    icon: "fas fa-folder-plus"
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
                    ],
                    icon: "fas fa-folder-plus"
                },
                {
                    id: 5,
                    nameDocument: "Dokumen Pendukung",
                    child: [],
                    icon: "fas fa-folder-plus"
                }
            ],
            addChild: {
                name: "", 
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
            },
            addParents: {},
            addChilds: {},
            dialogDelete: {
                // open: true OR false
                // state: 1 (Perent) OR 0 (Child)
                // data:
            }
        };
    }

    //Life Circle pada React JS Component
    componentDidMount() {
        window.$('select').selectpicker();
        let {data} = this.state;
        getDocumentPO(1, 8000003554).then((result) => { console.log(result);
            data[2].child[0].name = result.data.getDocsBa[1].doc_name;
            data[2].child[0].upload_date_vendor = result.data.getDocsBa[1].due_date;
            data[2].child[0].mandatory = result.data.getDocsBa[1].mandatory;
            data[3].child[0].name = result.data.getDocsBa[0].doc_name;
            data[3].child[0].upload_date_vendor = result.data.getDocsBa[0].due_date;
            data[3].child[0].mandatory = result.data.getDocsBa[0].mandatory;
            data[4].child.push({

            })
            data[4].child[0].name = result.data.getDocsPen[1].doc_name
            data[4].child[0].upload_date_vendor = result.data.getDocsPen[1].due_date
            data[4].child.push({

            })
            data[4].child[1].name = result.data.getDocsPen[2].doc_name
            data[4].child[1].upload_date_vendor = result.data.getDocsPen[2].due_date
            

           
            console.log(data);
        }).catch((error) => {
            console.log(error);

        })
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    async openChild(id, index){
        let { data } = this.state;
        if(data[index].icon === "fas fa-folder-plus"){
            data[index].icon = "fas fa-folder-minus";
            var indexRow = window.$("#parent-" + id).index();
            var html = `
            <tr id="child-${id}" name="child" idChild="${id}">
                <td colspan='14' style="padding: 0">
                    <table class="table" style="margin-bottom: 0">
                        <thead></thead>
                        <tbody  id="child-table-${id}"></tbody>
                    <table />
                </td>
            </tr>
            `;  
            window.$('#my_table > tbody > tr:eq(' + indexRow + ')').after(html);
            ReactDOM.render(<ChildTable index={index} data={this.state.data[index]} callBackAddData={this.callBackAddData.bind(this)} callBackDeleteData={this.callBackDeleteData.bind(this)} callBackEditData={this.callBackEditData.bind(this)} />, document.getElementById(`child-table-${id}`));
        }else{
            data[index].icon = "fas fa-folder-plus";
            document.getElementById("child-" + id).remove();
        }
        this.setState({data})
    }

    callBackAddData(_data, index){
        let data = [...this.state.data];
        data[index].child = _data;
        this.setState({data});
    }

    callBackDeleteData(indexPerent, indexChild){
        let { data, dialogDelete } = this.state;
        dialogDelete.state = 0;
        dialogDelete.open = true;
        dialogDelete.data = data[indexPerent];
        dialogDelete.indexChild = indexChild;
        this.setState({dialogDelete});
    }

    callBackEditData(indexPerent, indexChild){
        let { data, addChilds } = this.state;
        addChilds.indexChild = indexChild;
        addChilds.name = data[indexPerent].child[indexChild].name;
        addChilds.open = true;
        addChilds.data = data[indexPerent];
        addChilds.status = "changes";
        addChilds.button = true;
        this.setState({addChilds});
    }

    createParentsByIndex(event){
        event.preventDefault();
        let data = cloneDeep(this.state.data);
        let lastData = Math.floor(Math.random() * (Math.floor(100) - Math.ceil(1) + 1)) + Math.ceil(1);
        let index = data.findIndex(x => x.nameDocument === this.state.addParents.data.nameDocument);
        let nameDocument = this.state.addParents.name;
        if(this.state.addParents.status === "changes"){
            data[index].nameDocument = nameDocument;
        }else{
        data.splice(index + 1, 0, {
            id: lastData,
                nameDocument,
            child: [
                ],
                icon: "fas fa-folder-plus"
            });
        }
        let addParents = {};
        this.setState({data, addParents},()=>{
            window.$('select').prop('selectedIndex', 0);
        });
    }

    createChildsByIndex(event){
        event.preventDefault();
        let data = this.state.data;
        let addChild = cloneDeep(this.state.addChild);
        let addChilds = cloneDeep(this.state.addChilds);
        let index = data.findIndex(x => x.nameDocument === addChilds.data.nameDocument);
        let id = addChilds.data.id;
        addChild.name = addChilds.name;
        if(this.state.addChilds.status === "changes"){
            data[index].child[addChilds.indexChild].name = addChilds.name;
        }else{
            data[index].child.splice(addChilds.indexChild === undefined ? 0 : addChilds.indexChild + 1, 0, addChild);
        }
        addChilds = {};
        this.setState({data, addChilds}, () => {
            window.$('select').prop('selectedIndex', 0);
            if(!document.getElementById(`child-table-${id}`)) return;
            ReactDOM.render(<ChildTable index={index} data={this.state.data[index]} callBackAddData={this.callBackAddData.bind(this)} callBackDeleteData={this.callBackDeleteData.bind(this)} callBackEditData={this.callBackEditData.bind(this)} />, document.getElementById(`child-table-${id}`));
        });
    }

    removeDataByIndex(){
        let { data, dialogDelete } = this.state;
        let index = data.findIndex(x => x.nameDocument === dialogDelete.data.nameDocument);
        let id = dialogDelete.data.id;
        if(dialogDelete.state === 1){
            data.splice(index, 1);
            dialogDelete = {};
            this.setState({data, dialogDelete});
            Array.prototype.slice.call(document.getElementsByName("child")).forEach((item, index) => {
                var indexPerent = data.findIndex(x => x.id === Number(item.getAttribute("idChild")));
                item.remove();
                if(indexPerent === -1) return;
                data[indexPerent].icon = "fas fa-folder-plus";
                this.setState({data})
            });
        }else{
            data[index].child.splice(dialogDelete.indexChild, 1);
            dialogDelete = {};
            this.setState({data, dialogDelete});
            if(!document.getElementById(`child-table-${id}`)) return;
            ReactDOM.render(<ChildTable index={index} data={this.state.data[index]} callBackAddData={this.callBackAddData.bind(this)} callBackDeleteData={this.callBackDeleteData.bind(this)} callBackEditData={this.callBackEditData.bind(this)} />, document.getElementById(`child-table-${id}`));
        }
    }

    render() {
        const { data, addParents, addChilds, dialogDelete } = this.state;
        return (
            <React.Fragment>
            <Dialog
                open={dialogDelete.open !== undefined ? dialogDelete.open : false}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{dialogDelete.state !== undefined ? (dialogDelete.state === 1 ? "Delete Folder":"Delete File") : "Error State Delete Function"}</DialogTitle>
                    <DialogContent>
                    {
                        dialogDelete.state !== undefined ? 
                            (
                                dialogDelete.state === 1 ? 
                                    <div>
                                        <span>Apakah Anda Yakin ingin manghapus Folder <b>{dialogDelete?.data.nameDocument}</b> ? Jika <b>YA</b> file-file yang tersimpan pada folder tersebut akan <b className="text-danger">hilang secara permanen dan tidak bisa di pulihkan kembali</b>, setelah Anda menyimpan perubahan.</span>
                                    </div>
                                    :
                                    <div>
                                    <span>Apakah Anda Yakin ingin manghapus File <b>{dialogDelete?.data.child[dialogDelete?.indexChild].name}</b> pada Folder <b>{dialogDelete?.data.nameDocument}</b> ? Jika YA file tersebut akan <b className="text-danger">hilang secara permanen dan tidak bisa di pulihkan kembali</b>, setelah Anda menyimpan perubahan.</span>
                                    </div>
                            ) 
                            : 
                            "Error State Delete Function"
                    }
                </DialogContent>
                <DialogActions>
                    <button className="btn btn-sm btn-primary" type="button" onClick={this.removeDataByIndex.bind(this)}>
                        Mengerti
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={()=>{let dialogDelete = this.state.dialogDelete; dialogDelete = {}; this.setState({dialogDelete});}}>
                        Batal
                    </button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={addParents.open !== undefined ? addParents.open : false}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{addParents.status === "changes" ? "Edit": "Buat"} Folder</DialogTitle>
                <Form onSubmit={this.createParentsByIndex.bind(this)}>
                    <DialogContent>
                        <Form.Group as={Row} controlId="formCreateFolder">
                            <Form.Label column sm="4">
                            Nama Folder
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control type="text" placeholder="Nama Folder" value={addParents.name || ""} onChange={(e)=>{ let addParents = this.state.addParents; addParents.name = e.target.value; this.setState({addParents}) }} required />
                            </Col>
                        </Form.Group>
                        {
                            addParents.status === "changes" ?
                            null
                            :
                            <Form.Group as={Row} controlId="formPositionFolder">
                                <Form.Label column sm="4">
                                Posisi Folder Setelah
                                </Form.Label>
                                <Col sm="8">
                                <Form.Control as="select" onChange={(e)=>{ let addParents = this.state.addParents; addParents.data = data.filter((item) => {return item.nameDocument === e.target.value})[0]; this.setState({addParents});}} defaultValue={'DEFAULT'} value={addParents.data?.nameDocument}>
                                    <option value="DEFAULT" disabled hidden>Pilih Folder</option>
                                    {
                                        data.map((item, index) => {
                                            return(
                                                <option className="selectpicker" key={index.toString()} value={item.nameDocument} multiple>{item.nameDocument}</option>
                                            )
                                        })
                                    }
                                    
                                </Form.Control>
                                
                                </Col>
                                <Col sm="8">
                                {/* <Form.Control as="select" onChange={(e)=>{ let addParents = this.state.addParents; addParents.data = data.filter((item) => {return item.nameDocument === e.target.value})[0]; this.setState({addParents});}} defaultValue={'DEFAULT'} value={addParents.data?.nameDocument}>
                    
                                </Form.Control> */} 
                                    <select class="selectpicker" multiple>
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                </select>
                                
                                </Col>  
                                
                            </Form.Group>
                        }
                        
                                <select class="select"  multiple data-live-search="true">
                                    <option  value="1">Mustard</option>
                                    <option value="2">Ketchup</option>
                                    <option value="3">Relish</option>
                                    </select>
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-sm btn-primary" type="submit" disabled={!addParents.data}>
                            Simpan
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={()=>{ let addParents = this.state.addParents; addParents = {}; this.setState({addParents}); window.$('select').prop('selectedIndex', 0); }}>
                            Batal
                        </button>
                    </DialogActions>
                </Form>
            </Dialog>
            <Dialog
                open={addChilds.open !== undefined ? addChilds.open : false}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{addChilds.status === "changes" ? "Edit": "Buat"} File</DialogTitle>
                <Form onSubmit={this.createChildsByIndex.bind(this)}>
                    <DialogContent>
                        <Form.Group as={Row} controlId="formCreateFile">
                            <Form.Label column sm="4">
                            Nama File
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control type="text" placeholder="Nama File" value={addChilds.name || ""} onChange={(e)=>{ let addChilds = this.state.addChilds; addChilds.name = e.target.value; this.setState({addChilds}) }} required />
                            </Col>
                        </Form.Group>
                        {
                            addChilds.status === "changes" ?
                            null
                            :
                            <div>
                                <Form.Group as={Row} controlId="formChooseFolder">
                                    <Form.Label column sm="4">
                                    Penyimpanan Folder
                                    </Form.Label>
                                    <Col sm="8">
                                    <Form.Control as="select" onChange={(e)=>{ let addChilds = this.state.addChilds; delete addChilds.indexChild ;addChilds.data = data.filter((item) => {return item.nameDocument === e.target.value})[0]; addChilds.data.child.length > 0 ? addChilds.button = false : addChilds.button = true; this.setState({addChilds});}} defaultValue={'DEFAULT'} value={addChilds.nameDocument}>
                                        <option value="DEFAULT" disabled hidden>Pilih Folder</option>
                                        {
                                            data.map((item, index) => {
                                                return(
                                                    <option key={index.toString()} value={item.nameDocument}>{item.nameDocument}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                    </Col>
                                </Form.Group>
                                {
                                    addChilds.data ?
                                    <Form.Group as={Row} controlId="formPositionFiler">
                                        <Form.Label column sm="4">
                                        Posisi File Setelah
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control as="select" required={addChilds.data.child.length > 0 ? true : false} onChange={(e)=>{let addChilds = this.state.addChilds; addChilds.indexChild = addChilds.data.child.findIndex(x => x.name === e.target.value); addChilds.button = true; this.setState({addChilds});}} value={addChilds.indexChild !== undefined ? addChilds.data.child[addChilds.indexChild].name : "DEFAULT"}>
                                        <option value="DEFAULT" disabled hidden>Pilih File</option>
                                            {
                                                addChilds.data.child.map((item, index) => {
                                                    return(
                                                        <option key={index.toString()} value={item.name}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    :
                                    null
                                }
                            </div>
                        }
                        
                    </DialogContent>
                    <DialogActions>
                        <button className="btn btn-sm btn-primary" type="submit" disabled={!addChilds.button }>
                            Simpan
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={()=>{ let addChilds = this.state.addChilds; addChilds = {}; this.setState({addChilds}); window.$('select').prop('selectedIndex', 0); }}>
                            Batal
                        </button>
                    </DialogActions>
                </Form>
            </Dialog>
            <Card>
                <CardHeader title="Deliverable Dokumen: Production 1">
                    <CardHeaderToolbar>
                        <button type="button" className="btn btn-sm btn-primary m-1" onClick={()=>{ let addParents = this.state.addParents; addParents.open = true; this.setState({addParents});}}>
                            <span className="mr-2">Buat Folder</span>
                            <i className="fas fa-folder-plus"></i>
                        </button>
                        <button type="button" className="btn btn-sm btn-primary m-1" onClick={()=>{ let addChilds = this.state.addChilds; addChilds.open = true; this.setState({addChilds});}}>
                            <span className="mr-2">Buat File</span>
                            <i className="fas fa-file-alt"></i>
                        </button>
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
                                                            <tr key={index.toString()} id={"parent-" + item.id} name="parent">
                                                                <td className="text-center">
                                                                    <span onClick={this.openChild.bind(this, item.id, index)} className="pointer">
                                                                        <i className={item.icon + " fa-lg"} id={"parent-icon-" + item.id}></i>
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {item.nameDocument}
                                                                </td>
                                                                <td className="align-middle text-center">-</td>
                                                                <td className="text-center">
                                                                    {
                                                                        item.nameDocument === "Berita Acara Pemberian Penjelasan" || item.nameDocument === "Berita Acara Serah Terima" ?
                                                                        null
                                                                        :
                                                                        <div>
                                                                            <i className="far fa-edit m-1 text-success pointer" onClick={() => {let addParents = this.state.addParents; addParents.open = true; addParents.name = item.nameDocument; addParents.data = item; addParents.status = "changes"; this.setState({addParents}) }}></i>
                                                                            <i className="far fa-trash-alt m-1 text-danger pointer" onClick={()=>{let dialogDelete = this.state.dialogDelete; dialogDelete.open = true; dialogDelete.state = 1; dialogDelete.data = item; this.setState({dialogDelete});}}></i>
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
                                                                <td>{item.due_date}</td>
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
                        <div className="text-right mt-4">
                            <button type="button" className="btn btn-sm btn-primary">Submit</button>
                        </div>
                </CardBody>
            </Card>
            </React.Fragment>
        )
    }
}

export default injectIntl(connect(null, null)(DeliveryDocument));