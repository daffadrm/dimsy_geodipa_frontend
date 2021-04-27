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
    Table,
    Form,
    Col,
    Row,
    Sonnet
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
import PriceOfJob from "./PriceOfJob";
import DeliveryDocument from './DeliveryDocument';
import { LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, Slide, DialogContentText } from '@material-ui/core';
import { setDataDeverableDoc } from "./_redux/deliveryMonitoringSlice";
import { cloneDeep } from "lodash";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
// // import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div >
                    {children}
                </div>
            )}
        </div>
    );
}


class ItemDeliveryMonitoring extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: [
                {id:"1",
                    scope_of_work:"Pembayaran 10 Laptop",
                delivery_date:"2021-05-10",
                bobot_termin:"30",
                harga_pekerjaan:"300000"},
                { id:"2",
                    scope_of_work:"Pembayaran 10 Laptop",
                delivery_date:"2021-05-10",
                bobot_termin:"20",
                harga_pekerjaan:"200000",},
                // { id: "3", name: null, date: null, weight: '25' , price:null},
                // { id: "4", name: null, date: null, weight: '25' , price:null},
                // { id: "5", name: null, date: null, weight: '25' , price:null},
                // { id: "6", name: null, date: null, weight: '25' , price:null},
            ],
            updateData: [],
            preData: [],
            stateDialogSave: false,
            value: 0,
            jangka: {
                start_date: "2020-02-01",
                end_date: "2020-03-30",
                day: "01",
                month: "02"
            },
            open: false,
            edit: false,
            addTermin : {},
            deleted: false
        };
    }

    //Life Circle pada React JS Component
    componentDidMount() {
        this.props.setDataDeverableDoc(cloneDeep(this.state.data));
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    changesInputSow(index) {
        let data = [...this.state.data];
        data[index].scope_of_work = document.getElementById("sow-term-" + index).value;
        this.setState({ data })
    }

    changesInputDateDelivery(index) {
        let data = [...this.state.data];
        data[index].delivery_date = document.getElementById("date-delivery-" + index).value;
        this.setState({ data })
    }

    comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                // wajib compare data yang tidak boleh berubah. contoh ID. sisanya boleh compare dengan data yang berubah.
                return other.scope_of_work === current.scope_of_work && other.delivery_date === current.delivery_date && other.id === current.id
            }).length === 0;
        }
    }

    async checkedFormItem(event) {
        event.preventDefault();
        let { data } = this.state;
        const oldData = this.props.dataDeverableDoc;
        var waittingCheckData = new Promise(async (resolve) => {
            for (let index = 0; index < data.length; index++) {
                data[index].scope_of_work = data[index].scope_of_work.replace(/^\s+/, '').replace(/\s+$/, '');
                if (index === data.length - 1) resolve();
            }
        })
        await waittingCheckData;
        let updateData = await data.filter(this.comparer(oldData));
        console.log(updateData);
        let preData = await oldData.filter(this.comparer(data));
        console.log(preData);
        if (updateData.length > 0) {
            var waittingNumbering = new Promise(async (resolve) => {
                for (let index = 0; index < updateData.length; index++) {
                    for (let indexs = 0; indexs < data.length; indexs++) {
                        if (updateData[index].id === data[indexs].id) {
                            // updateData[index].no = indexs + 1;
                        };
                        if (index === updateData.length - 1) resolve();
                    }
                }
            })
            await waittingNumbering;
            this.setState({ updateData, stateDialogSave: true, preData });
        } else {
            this.setState({ updateData, stateDialogSave: true, preData });
        }
    }
    handleChange(event, newValue) {
        console.log(event, newValue);
        this.setState({
            value: newValue
        })
    }

    handleClickOpen(index) {
        console.log(index);
        this.setState({
            addTermin: {index: index},
            open: true
        })
    }
    handleClose() {
        this.setState({
         open:false
        })
    }
    handleClickOpenEdit(item) {
        console.log(item);
        var editTermin = {
        termin : item.scope_of_work,
        date : item.delivery_date,
        bobot : item.bobot_termin,
        price : item.harga_pekerjaan
    }

        this.setState({
            edit: true, editTermin
        }, ()=> {console.log(this.state.editTermin);})
    }
    handleCloseEdit() {
        this.setState({
         edit:false
        })
    }

    
    handleSaveAdd(){
        let data = cloneDeep(this.state.data);
        var lastID = Number(data[data.length-1].id)+1;
        data.splice(this.state.addTermin.index + 1, 0, { id: lastID, scope_of_work: this.state.addTermin.termin, delivery_date: this.state.addTermin.date, bobot_termin: this.state.addTermin.bobot, harga_pekerjaan: this.state.addTermin.price  },);
        console.log(data);
        let addTermin = {};
        this.setState({
            open:false,addTermin,data
           })
    }
    handleDelete(index){
        let data = cloneDeep(this.state.data);
        data.splice(index, 1);
        console.log(data);
        this.setState({
           data, deleted:false
           })
    }

    handleClikDelete(){
        this.setState({
            deleted:true

        })
    }
    handleClikDeleteClose(){
        this.setState({
            deleted:false

        })
    }

    render() {
        const { data, stateDialogSave, updateData, preData, value, jangka, open, edit, addTermin, deleted, editTermin } = this.state;
        return (
            <React.Fragment>
                <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Termin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
         
  <form>
  <div className="row">
  <div className="form-group">
  <label for="exampleFormControlInput1">Scope of Work (Term)</label>
    
    <input type="email" className="form-control" id="exampleFormControlInput1" value={addTermin.termin || ""  } onChange={(e)=> { let addTermin= this.state.addTermin; addTermin.termin = e.target.value; this.setState({addTermin})}} required placeholder="Scope of Work (Term)"/>
    
  </div>
  <div className="form-group ml-2">
    <label for="inputPassword">Delivery Date</label>
    
      <input type="date" className="form-control" id="inputPassword" placeholder="Delivey Date"value={addTermin.date || ""  } onChange={(e)=> { let addTermin= this.state.addTermin; addTermin.date = e.target.value; this.setState({addTermin})}} required/>
    
  </div>
  </div>
  <div className="row">
  <div className="form-group">
    <label for="inputPassword">Bobot</label>
      <input type="number" className="form-control" id="inputPassword" placeholder="Harga Pekerjaan" value={addTermin.bobot || ""  } onChange={(e)=> { let addTermin= this.state.addTermin; addTermin.bobot = e.target.value; this.setState({addTermin})}} required/>
  </div>
  <div className="form-group ml-2">
    <label for="inputPassword">Harga Pekerjaan</label>
      <input type="number" className="form-control" id="inputPassword" placeholder="Harga Pekerjaan" value={addTermin.price || ""  } onChange={(e)=> { let addTermin= this.state.addTermin; addTermin.price = e.target.value; this.setState({addTermin})}} required/>
  </div>
  </div>
</form>
  
        </DialogContent>
        <DialogActions>
          <Button type="button" className="btn btn-light-primary font-weight-bold" onClick={this.handleClose.bind(this)} color="secondary">
            Batal
          </Button>
          <Button type="button" className="btn btn-primary font-weight-bold" onClick={this.handleSaveAdd.bind(this)} color="secondary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={edit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Termin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          
  <form>
  <div className="row">
  <div className="form-group">
  <label for="exampleFormControlInput1">Scope of Work (Term)</label>
    
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Scope of Work (Term)" value={addTermin.termin || ""  } onChange={(e)=> { let editTermin= this.state.editTermin; editTermin.termin = e.target.value; this.setState({editTermin})}}/>
    
  </div>
  <div className="form-group ml-2">
    <label for="inputPassword">Delivery Date</label>
    
      <input type="date" className="form-control" id="inputPassword" placeholder="Delivey Date" />
    
  </div>
  </div>
  <div className="row">
  <div className="form-group">
    <label for="inputPassword">Bobot</label>
      <input type="number" className="form-control" id="inputPassword" placeholder="Harga Pekerjaan"/>
  </div>
  <div className="form-group ml-2">
    <label for="inputPassword">Harga Pekerjaan</label>
      <input type="number" className="form-control" id="inputPassword" placeholder="Harga Pekerjaan"/>
  </div>
  </div>
</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseEdit.bind(this)} color="secondary">
            Batal
          </Button>
          <Button onClick={this.handleCloseEdit.bind(this)} color="secondary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleted}
        onClose={this.handleClikDeleteClose.bind(this)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Apakah anda yakin ini menghapus data ini?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  className="btn btn-light-primary font-weight-bold" onClick={this.handleClikDeleteClose.bind(this)} color="secondary">
            Tidak
          </Button>
          <Button className="btn btn-primary font-weight-bold" onClick={this.handleDelete.bind(this)} color="secondary" autoFocus>
            Iya
          </Button>
        </DialogActions>
      </Dialog>
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
                                                    <th className="bg-primary text-white align-middle">Harga Pekerjaan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    updateData.map((item, index) => {
                                                        return (
                                                            <tr key={index.toString()}>
                                                                <td className="align-middle">{item.id}</td>
                                                                <td className="align-middle">
                                                                    {
                                                                        preData.length > 0 && preData[index].scope_of_work !== item.scope_of_work ?
                                                                            <span>
                                                                                <span className="text-danger">{preData[index].scope_of_work ? preData[index].scope_of_work : "Null"}</span>
                                                                                <span><i className="fas fa-long-arrow-alt-right mr-1 ml-1"></i></span>
                                                                            </span>
                                                                            : null
                                                                    }
                                                                    <span className={preData.length > 0 && preData[index].scope_of_work !== item.scope_of_work ? "text-primary" : ""}>{item.scope_of_work || ""}</span>
                                                                </td>
                                                                <td className="align-middle">
                                                                    {
                                                                        preData.length > 0 && preData[index].delivery_date !== item.delivery_date ?
                                                                            <span>
                                                                                <span className="text-danger">{preData[index].delivery_date ? window.moment(preData[index].delivery_date).format("DD/MM/YYYY") : "Null"}</span>
                                                                                <span><i className="fas fa-long-arrow-alt-right mr-1 ml-1"></i></span>
                                                                            </span>
                                                                            : null
                                                                    }
                                                                    <span className={preData.length > 0 && preData[index].delivery_date !== item.delivery_date ? "text-primary" : ""}>{item.delivery_date ? window.moment(item.date).format("DD/MM/YYYY") : ""}</span>
                                                                </td>
                                                                <td className="align-middle">{item.bobot_termin}%</td>
                                                                <td className="align-middle">{item.harga_pekerjaan}</td>
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
                                <button className="btn btn-sm btn-primary" onClick={() => { this.props.setDataDeverableDoc(cloneDeep(data)); this.setState({ stateDialogSave: false }) }}>
                                    Simpan
                        </button>
                                :
                                null
                        }

                        <button className="btn btn-sm btn-danger" onClick={() => { this.setState({ stateDialogSave: false }) }}>
                            Batal
                    </button>
                    </DialogActions>
                </Dialog>
                <Card style={{ minHeight: 300 }}>
                    {/* <CardHeader title="Deliverable Document">
                    <CardHeaderToolbar>
                    </CardHeaderToolbar>
                </CardHeader> */}
                    <LinearProgress className="rounded" />

                    <CardBody>
                        {/* <div className="row"> */}
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">sdds
  {/* <TabContent /> */}
  </Tab>
  <Tab eventKey="profile" title="Profile">
    {/* <Sonnet /> */}
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    {/* <Sonnet /> */}
  </Tab>
</Tabs>
                            <AppBar position="static" style={{ zIndex: 1 }}  className=" bg-primary text-white align-middle font-weight-bold" > 
                                <Tabs value={value} onChange={this.handleChange.bind(this)} aria-label="scrollable auto tabs example" scrollButtons="auto" variant="scrollable" indicatorColor="secondary" textColor="white">
                                    <Tab label="Detail " />
                                    <Tab label="Dokumen Kontrak" />
                                    <Tab label="Jaminan" />
                                    <Tab label="Harga Pekerjaan" />
                                    <Tab label="Jangka Waktu" />
                                    <Tab label="Para Pihak" />
                                    <Tab label="Tes" />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0} className="w-100 mt-4">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                            <Form.Label column sm="4">
                                                Nomor Kontrak
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="0931/SPK/IV/2021" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextPassword2">
                                            <Form.Label column sm="4">
                                                Judul Pengadaan
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                            <Form.Label column sm="4">
                                                Kewenangan
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="Unit Dieng" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                            <Form.Label column sm="4">
                                                User
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="Unit" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6">
                                        <Form.Group as={Row} controlId="formPlaintextEmail3">
                                            <Form.Label column sm="4">
                                                Nomor PO
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="8000003528" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextPassword4">
                                            <Form.Label column sm="4">
                                                Header Text PO
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="ABC International" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                            <Form.Label column sm="4">
                                                Harga Pekerjaan
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="1.000.000" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                            <Form.Label column sm="4">
                                                Penyedia
                                    </Form.Label>
                                            <Col sm="8">
                                                <Form.Control type="text" readOnly defaultValue="ABC International" className="bg-secondary" />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                </div>

                                
                            </TabPanel>
                            <TabPanel value={value} index={1}> 
                                
                                <div className="row">
                            <Form onSubmit={this.checkedFormItem.bind(this)} className="w-100 ml-4 mr-4 mt-4">
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <div className="segment-table">
                                        <div className="hecto-12">
                                            <Table className="table table-hover overflow-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="bg-primary text-white align-middle text-center">No</th>
                                                        <th className="bg-primary text-white align-middle">Nama Dokumen</th>
                                                        <th className="bg-primary text-white align-middle">Nomor Dokumen</th>
                                                        <th className="bg-primary text-white align-middle">Tanggal Dokumen</th>
                                                        <th className="bg-primary text-white align-middle">
                                                        <button type="button" className="btn btn-secondary">Edit Dokumen</button>
                                                        </th>
                                                        {/* <th className="bg-primary text-white align-middle">Project Progress(%)</th>
                                                        <th className="bg-primary text-white align-middle">Dokumen Progress</th>
                                                        <th className="bg-primary text-white align-middle">Deliverable Dokumen</th>
                                                        <th className="bg-primary text-white align-middle">Aksi</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map((item, index) => {
                                                            return (
                                                                <tr key={index.toString()}>
                                                                    <td className="align-middle text-center">1</td>
                                                                    <td>
                                                                        {/* <Form.Control size="sm" type="text" id={"sow-term-" + index} onChange={this.changesInputSow.bind(this, index)} value={item.name || ""} autoComplete="off" required /> */}
                                                                        Berita Acara Penjelasan KAK

                                                                    </td>
                                                                    <td>
                                                                        {/* <Form.Control size="sm" type="date" id={"date-delivery-" + index} onChange={this.changesInputDateDelivery.bind(this, index)} value={item.date || ""} required /> */}
                                                                        7777777777
                                                                    </td>
                                                                    <td className="align-middle text-center">2021-04-21</td>
                                                                    <td className="align-middle">
                                                                        
                                                                        {/* <div className="float-right">
                                                                            <Link to="/user/delivery_monitoring/item/harga">
                                                                                <i className="fas fa-edit pointer"></i>
                                                                            </Link>
                                                                        </div> */}
                                                                    </td>
                                                                    {/* <td className="align-middle">-</td>
                                                                    <td className="align-middle">
                                                                        -
                                                            </td> */}
                                                                    {/* <td className="align-middle">
                                                                       
                                                                            <strong>Detail Dokumen</strong>
                                                                       
                                                                    </td> */}
                                                                    {/* <td className="align-middle">
                                                                        <div className="float-right">
                                                                            <i className="fas fa-edit pointer"></i>
                                                                            <i className="fas ml-2 fa-plus pointer"></i>
                                                                            <i className="fas ml-2 fa-trash pointer"></i>
                                                                        </div>
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="text-right mt-4">
                                    <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                                </div> */}
                            </Form>
                        </div>




                                {/* <TableContainer component={Paper}>
      <Table className= "w-100" aria-label="simple table">
        <TableHead className="bg-secondary">
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map(() => (
            <TableRow>
              <TableCell component="th">
                tes
              </TableCell>
              <TableCell align="right">tes</TableCell>
              <TableCell align="right">tes</TableCell>
              <TableCell align="right">tes</TableCell>
              <TableCell align="right">tes</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>                      */}
                        
      </TabPanel>
                            <TabPanel value={value} index={2}>
                                
                                <div className = "row mt-4"> 
                                <div className = "col-3">Jaminan Uang Muka</div>
                                <div className="col-1 form-check form-check-inline ml-5">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                <label className="form-check-label" for="inlineRadio1">Ya</label>
                                </div>
                                <div className="col-1 form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                <label className="form-check-label" for="inlineRadio2">Tidak</label>
                                </div>
                                </div>
                                <div className = "row"> 
                                <div className = "col-3 mt-2">Jaminan Pelaksanaan</div>
                                <div className="col-1 form-check form-check-inline ml-5">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                <label className="form-check-label" for="inlineRadio1">Ya</label>
                                </div>
                                <div className="col-1 form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                <label className="form-check-label" for="inlineRadio2">Tidak</label>
                               
                                </div>
                                </div>
                                <div className = "row"> 
                                <div className = "col-3 mt-2">Jaminan Pemeliharaan</div>
                                <div className="col-1 form-check form-check-inline ml-5">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                <label className="form-check-label" for="inlineRadio1">Ya</label>
                                </div>
                                <div className="col-1 form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                <label className="form-check-label" for="inlineRadio2">Tidak</label>
                               
                                </div>
                                </div>
      </TabPanel>
                            <TabPanel value={value} index={3}>
                                
                                <fieldset disabled>
                                <div className="row mt-4">

                                    <div className="col-4">
                                        <p className="font-weight-bold">1. Nilai Kontrak Perjanjian</p>
                                        </div>
                                    <div className="col-4">
                                    <input class="form-control" type="text" placeholder="Disabled input" aria-label="Disabled input example" disabled cursor= "not-allowed"></input>
                                    </div>

                                </div>
                                    </fieldset>
                                <div className="row">
                                    <div className="col">
                                        <p className="font-weight-bold">2. Rincian Harga Pekerjaan</p>
                                        </div>
                                        <Form onSubmit={this.checkedFormItem.bind(this)} className="w-100 ml-4 mr-4">
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <div className="segment-table">
                                        <div className="hecto-12">
                                            <Table className="table table-hover overflow-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="bg-primary text-white align-middle text-center">No</th>
                                                        <th className="bg-primary text-white align-middle">Deskripsi</th>
                                                        <th className="bg-primary text-white align-middle">Qty</th>
                                                        <th className="bg-primary text-white align-middle">Satuan</th>
                                                        <th className="bg-primary text-white align-middle">Harga Satuan</th>
                                                        <th className="bg-primary text-white align-middle">Keterangan</th>
                                                        <th className="bg-primary text-white align-middle">Aksi</th>
                                                        {/* <th className="bg-primary text-white align-middle">Project Progress(%)</th>
                                                        <th className="bg-primary text-white align-middle">Dokumen Progress</th>
                                                        <th className="bg-primary text-white align-middle">Deliverable Dokumen</th>
                                                        <th className="bg-primary text-white align-middle">Aksi</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        [...Array(1)].map((item, index) => {
                                                            return (
                                                                <tr key={index.toString()}>
                                                                    <td className="align-middle text-center">1</td>
                                                                    <td>
                                                                        {/* <Form.Control size="sm" type="text" id={"sow-term-" + index} onChange={this.changesInputSow.bind(this, index)} value={item.name || ""} autoComplete="off" required /> */}
                                                                        Berita Acara Penjelasan KAK

                                                                    </td>
                                                                    <td>
                                                                        {/* <Form.Control size="sm" type="date" id={"date-delivery-" + index} onChange={this.changesInputDateDelivery.bind(this, index)} value={item.date || ""} required /> */}
                                                                        7777777777
                                                                    </td>
                                                                    <td className="align-middle">2021-04-21</td>
                                                                    <td className="align-middle">
                                                                        1.000.000
                                                                        {/* <div className="float-right">
                                                                            <Link to="/user/delivery_monitoring/item/harga">
                                                                                <i className="fas fa-edit pointer"></i>
                                                                            </Link>
                                                                        </div> */}
                                                                    </td>
                                                                    <td className="align-middle">-</td>
                                                                    <td className="align-middle">
                                                                        -
                                                            </td>
                                                                    {/* <td className="align-middle">
                                                                       
                                                                            <strong>Detail Dokumen</strong>
                                                                       
                                                                    </td> */}
                                                                    {/* <td className="align-middle">
                                                                        <div className="float-right">
                                                                            <i className="fas fa-edit pointer"></i>
                                                                            <i className="fas ml-2 fa-plus pointer"></i>
                                                                            <i className="fas ml-2 fa-trash pointer"></i>
                                                                        </div>
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="text-right mt-4">
                                    <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                                </div> */}
                            </Form>
                        
                                   

                                </div>
      </TabPanel>
                            <TabPanel value={value} index={4}>
                                
                                <div className = "row mt-4">
                                    <div className = "col-4 font-weight-bold">1. Jangka Waktu Perjanjian</div>
                                
                                <div className = "col-2 text-center">
                                <div class="form-group row">
                                <label for="example-email-input"></label>
                                <input class="form-control" type="date" value="date" value={jangka.start_date} onChange={
                                    (event)=> {
                                        let jangka= this.state.jangka;
                                        jangka.start_date= event.target.value;
                                        this.setState({jangka})

                                    }
                                } id="example-date-input"></input></div>
                                </div>
                                <div className="text-center">s/d</div>
                                
                                <div className = "col-2">
                                <div class="form-group row">
                                <label for="example-date-input"></label>
                                <input class="form-control" type="date" value={jangka.end_date} onChange={
                                    (event)=>{
                                        let end_jangka= this.state.end_jangka;
                                        jangka.end_date=event.target.value
                                        this.setState({end_jangka})

                                    }
                                } id="example-date-input"></input></div>
                                </div>
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" value= {jangka.month} onChange={
                                        (event)=>{
                                            let month= this.state.month;
                                            jangka.month=event.target.value
                                            this.setState({month})

                                        }
                                    }id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Bulan
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" value={jangka.day} onChange={
                                        (event)=>{
                                            let day= this.state.day;
                                            jangka.day=event.target.value
                                            this.setState({day})
                                        }
                                    }id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Hari
                                
                                </div>
                                
                                
                                
                                <div className = "row">
                                    <div className = "col-4 mt-2 font-weight-bold">2. Jangka Waktu Pelaksanaan Pekerjaan</div>
                                
                                    <div className = "col-2 text-center">
                                <div class="form-group row">
                                <label for="example-email-input"></label>
                                <input class="form-control" type="date" value="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className="text-center">s/d</div>
                                
                                <div className = "col-2">
                                <div class="form-group row">
                                <label for="example-date-input"></label>
                                <input class="form-control" type="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Bulan
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Hari
                                </div>

                                <div className = "row">
                                    <div className = "col-4 mt-2 font-weight-bold">3. Jangka Waktu Masa Garansi</div>
                                
                                    <div className = "col-2 text-center">
                                <div class="form-group row">
                                <label for="example-email-input"></label>
                                <input class="form-control" type="date" value="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className="text-center">s/d</div>
                                
                                <div className = "col-2">
                                <div class="form-group row">
                                <label for="example-date-input"></label>
                                <input class="form-control" type="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Bulan
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Hari
                                </div>

                                <div className = "row">
                                    <div className = "col-4 mt-2 font-weight-bold">4. Jangka Waktu Masa Pemeliharaan</div>
                                
                                <div className = "col-2 text-center">
                                <div class="form-group row">
                                <label for="example-email-input"></label>
                                <input class="form-control" type="date" value="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className="text-center">s/d</div>
                                
                                <div className = "col-2">
                                <div class="form-group row">
                                <label for="example-date-input"></label>
                                <input class="form-control" type="date" value="2011-08-19" id="example-date-input"></input></div>
                                </div>
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Bulan
                                <div className = "col-1">
                                <div class="form-group">
                                    {/* <label for="exampleFormControlInput1"></label> */}
                                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                                </div>
                                </div>Hari
                                </div>
      </TabPanel>
                            <TabPanel value={value} index={5}>
                                {/* <div className="mt-2 text-uppercase font-weight-bold">Pihak pertama</div> */}
                                {/* <div className="text-uppercase font-weight-bold text-right">Pihak kedua</div> */}

                                {/* <div className="row">
                                    <div classsName ="col-xl-6">
                                        <form className="sm-4 ml-4">
                                            Nama Pemberi Kerja
                                            
                                        </form>
                                        </div>
                                  
                                   
                                        <form className="sm-4 ml-4">
                                        <Form.Control type="text" readOnly defaultValue="0931/SPK/IV/2021" className="bg-secondary" />
                                    
                                            
                                        </form>
                                        <div className = "sm-4">
                                            tes
                                        </div>
                                        
                                   
                                </div> */}
                                <div className="row">
                                {/* <div className="col mt-2 text-uppercase font-weight-bold">Pihak pertama</div> */}
                            <div className="col-xl-6">
                                <div className="col mt-2 text-uppercase font-weight-bold mb-2">Pihak pertama</div>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        1. Nama Pemberi Kerja
                                    </Form.Label>
                                    <Col sm="6" >
                                        <Form.Control type="text" readOnly defaultValue="0931/SPK/IV/2021" className="" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        1.2 Akta Pendirian
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama Notaris
                                    </Form.Label>
                                    <Col sm="6" className="ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nomor Akta
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Nomor SK Kemenhumkam
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        1.3 Akta Perubahan Terakhir
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama Notaris
                                    </Form.Label>
                                    <Col sm="6" className="ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nomor Akta
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Nomor SK Kemenhumkam
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2" className="mt-4">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        1.4 Domisili Hukum
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="textarea" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        1.5 Pejabat Berwenang
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama
                                    </Form.Label>
                                    <Col sm="6" className="ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Jabatan
                                    </Form.Label>
                                    <Col sm="6" className= "ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Alamat
                                    </Form.Label>
                                    <Col sm="6" className= "ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6">
                                <div className="col mt-2 text-uppercase font-weight-bold underline mb-2">Pihak kedua</div>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        2.1 Nama Penyedia
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control type="text" readOnly defaultValue="0931/SPK/IV/2021" className="" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        2.2 Akta Pendirian
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama Notaris
                                    </Form.Label>
                                    <Col sm="6" className="ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nomor Akta
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Nomor SK Kemenhumkam
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        2.3 Akta Perubahan Terakhir
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama Notaris
                                    </Form.Label>
                                    <Col sm="6" className="ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nomor Akta
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Nomor SK Kemenhumkam
                                    </Form.Label>
                                    <Col sm="3" className= "ml-5">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="border-black-300" />
                                    </Col>-
                                    {/* <div className ="text-center">-</div> */}
                                    <Col sm="3" className= "">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2" className="mt-4">
                                    <Form.Label column sm="5" className="font-weight-bold">
                                        2.4 Domisili Hukum
                                    </Form.Label>
                                    <Col sm="6" className="ml-10">
                                        <Form.Control type="textarea" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="6" className="font-weight-bold">
                                        2.5 Pejabat Berwenang
                                    </Form.Label>
                                    {/* <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col> */}
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Nama
                                    </Form.Label>
                                    <Col sm="6" className="ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold">
                                        Jabatan
                                    </Form.Label>
                                    <Col sm="6" className= "ml-7">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="5" className="ml-5 font-weight-bold" >
                                        Alamat
                                    </Form.Label>
                                    <Col sm="6" className= "ml-7">
                                    <input type="email" class="form-control" readOnly defaultValue="tes" placeholder="Enter full name"/>
                                    </Col>
                                </Form.Group>
                                </div>
                        </div>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <form class="form">
 <div class="card-body">
  <div class="form-group row col-xl-6">
   <label class="col-sm-6 col-form-label text-lg-right">Full Name:</label>
   <div class="col-sm-6">
    <input type="email" class="form-control" placeholder="Enter full name"/>
    <span class="form-text text-muted">Please enter your full name</span>
   </div>
   <label class="col-lg-2 col-form-label text-lg-right">Contact Number:</label>
   <div class="col-lg-3">
    <input type="email" class="form-control" placeholder="Enter contact number"/>
    <span class="form-text text-muted">Please enter your contact number</span>
   </div>
   <label class="col-lg-2 col-form-label text-lg-right">Contact Number:</label>
   <div class="col-lg-3">
    <input type="email" class="form-control" placeholder="Enter contact number"/>
    <span class="form-text text-muted">Please enter your contact number</span>
   </div>
  </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-lg-right">Address:</label>
   <div class="col-lg-3">
    <div class="input-group">
     <input type="text" class="form-control" placeholder="Enter your address"/>
     <div class="input-group-append"><span class="input-group-text"><i class="la la-map-marker"></i></span></div>
    </div>
    <span class="form-text text-muted">Please enter your address</span>
   </div>
   <label class="col-lg-2 col-form-label text-lg-right">Postcode:</label>
   <div class="col-lg-3">
    <div class="input-group">
     <input type="text" class="form-control" placeholder="Enter your postcode"/>
     <div class="input-group-append"><span class="input-group-text"><i class="la la-bookmark-o"></i></span></div>
    </div>
    <span class="form-text text-muted">Please enter your postcode</span>
   </div>
  </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-lg-right">Group:</label>
   <div class="col-lg-3">
    <div class="radio-inline">
     <label class="radio radio-solid">
      <input type="radio" name="example_2" checked="checked" value="2"/>
      <span></span>
      Sales Person
     </label>
     <label class="radio radio-solid">
      <input type="radio" name="example_2" value="2"/>
      <span></span>
      Customer
     </label>
    </div>
    <span class="form-text text-muted">Please select user group</span>
   </div>
  </div>
 </div>
 <div class="card-footer">
  <div class="row">
   <div class="col-lg-2"></div>
   <div class="col-lg-10">
    <button type="reset" class="btn btn-success mr-2">Submit</button>
    <button type="reset" class="btn btn-secondary">Cancel</button>
   </div>
  </div>
 </div>
</form>
      </TabPanel>
                        {/* </div> */}
                        {/* <div className="row">
                            <div className="col-xl-6">
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                        Nomor Kontrak
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="0931/SPK/IV/2021" className="" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword2">
                                    <Form.Label column sm="4">
                                        Judul Pengadaan
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="Pengadaan Barang dan Jasa" className="" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                        Kewenangan
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                        User
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className="col-xl-6">
                                <Form.Group as={Row} controlId="formPlaintextEmail3">
                                    <Form.Label column sm="4">
                                        Nomor PO
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="8000003528" className="bg-secondary" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword4">
                                    <Form.Label column sm="4">
                                        Header Text PO
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="ABC International" className="bg-secondary" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                         Harga Pekerjaan
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="1.000.000" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail1">
                                    <Form.Label column sm="4">
                                        Penyedia
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" readOnly defaultValue="ABC International" className="bg-secondary" />
                                    </Col>
                                </Form.Group>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <Form onSubmit={this.checkedFormItem.bind(this)} className="w-100">
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <div className="segment-table">
                                        <div className="hecto-12">
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
                                                            return (
                                                                <tr key={index.toString()}>
                                                                    <td className="align-middle text-center">{index + 1}</td>
                                                                    <td>
                                                                        <Form.Control size="sm" type="text" id={"sow-term-" + index} onChange={this.changesInputSow.bind(this, index)} value={item.name || ""} autoComplete="off" required />

                                                                    </td>
                                                                    <td>
                                                                        <Form.Control size="sm" type="date" id={"date-delivery-" + index} onChange={this.changesInputDateDelivery.bind(this, index)} value={item.date || ""} required />
                                                                    </td>
                                                                    <td className="align-middle text-center">{item.weight}%</td>
                                                                    <td className="align-middle">
                                                                        <div className="float-right">
                                                                            <Link to="/user/delivery_monitoring/item/harga">
                                                                                <i className="fas fa-edit pointer"></i>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                    <td className="align-middle">-</td>
                                                                    <td className="align-middle">
                                                                        -
                                                            </td>
                                                                    <td className="align-middle">
                                                                        <Link to="/user/delivery_monitoring/item/dokumen">
                                                                            <strong>Detail Dokumen</strong>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <div className="float-right">
                                                                            <i className="fas fa-edit pointer"></i>
                                                                            <i className="fas ml-2 fa-plus pointer"></i>
                                                                            <i className="fas ml-2 fa-trash pointer"></i>
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
                        </div> */}
                    </CardBody>
                </Card>
                <Card className="mt-5">
                    <CardBody>
                    <div className="row">
                            <Form onSubmit={this.checkedFormItem.bind(this)} className="w-100">
                                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                    <div className="segment-table">
                                        <div className="hecto-12">
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
                                                            return (
                                                                <tr key={index.toString()}>
                                                                    <td className="align-middle text-center">{index + 1}</td>
                                                                    <td>
                                                                        <Form.Control size="sm" type="text" id={"sow-term-" + index} onChange={this.changesInputSow.bind(this, index)} value={item.scope_of_work || ""} autoComplete="off" required />

                                                                    </td>
                                                                    <td>
                                                                        <Form.Control size="sm" type="date" id={"date-delivery-" + index} onChange={this.changesInputDateDelivery.bind(this, index)} value={item.delivery_date || ""} required />
                                                                    </td>
                                                                    <td className="align-middle text-center">{item.bobot_termin}%</td>
                                                                    <td className="align-middle">{item.harga_pekerjaan}
                                                                        <div className="float-right">
                                                                            <Link to="/user/delivery_monitoring/item/harga">
                                                                                <i className="fas fa-edit pointer"></i>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                    <td className="align-middle">-</td>
                                                                    <td className="align-middle">
                                                                        -
                                                            </td>
                                                                    <td className="align-middle">
                                                                        <Link to="/user/delivery_monitoring/dokumen">
                                                                            <strong>Detail Dokumen</strong>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="align-middle">
                                                                        <div className="float-right">
                                                                            <i onClick={this.handleClickOpenEdit.bind(this, item)} className="fas fa-edit pointer"></i>
                                                                            <i onClick={this.handleClickOpen.bind(this, index)}  className="fas ml-2 fa-plus pointer"></i>
                                                                            <i onClick={this.handleClikDelete.bind(this, index)}className="fas ml-2 fa-trash pointer"></i>
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
                        </div>
                    </CardBody>
                    
                   
                    

                </Card>
                <div className="mt-5">
                    {/* <Route
                        path="/user/delivery_monitoring/item/dokumen"
                        component={DeliveryDocument}
                    /> */}
                    <Route
                        path="/user/delivery_monitoring/item/harga"
                        component={PriceOfJob}
                    />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    dataDeverableDoc: state.deliveryMonitoring.dataDeverableDoc,
});

const mapDispatchToProps = dispatch => ({
    setDataDeverableDoc: value => dispatch(setDataDeverableDoc(value)),
});
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ItemDeliveryMonitoring));
