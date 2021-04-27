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
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { Table, Pagination } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers/AssetsHelpers";
import { Link } from "react-router-dom";

import './DeliverableDocument.css';

class DeliverableDocument extends React.Component {
    constructor(props) {
        super()
        this.state = {
            nameStateFilter: "",
            filterTable: {}
        }
    }

    //Life Circle pada React JS Component
    componentDidMount() {
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    openFilterTable(index){
        let idFilter = "filter-" + index;
        let idInputFilter = "loop-value-" + index;
        let status = document.getElementById(idFilter).getAttribute("status");
        let { nameStateFilter, filterTable } = this.state;
        if(nameStateFilter === ""){
            nameStateFilter = idFilter;
            this.setState({nameStateFilter}, () => {
                document.getElementById(idFilter).setAttribute("status", "open");
                document.getElementById(idFilter).classList.add("open");
            });
        }else if(nameStateFilter === idFilter){
            if(status === "closed"){
                document.getElementById(idFilter).setAttribute("status", "open");
                document.getElementById(idFilter).classList.add("open");
            }else{
                document.getElementById(idFilter).setAttribute("status", "closed");
                document.getElementById(idFilter).classList.remove("open");
                document.getElementById(idInputFilter).value = filterTable[idInputFilter] || "";
            }
        }else{
            document.getElementById(nameStateFilter).setAttribute("status", "closed");
            document.getElementById(nameStateFilter).classList.remove("open");
            nameStateFilter = idFilter;
            this.setState({nameStateFilter}, () => {
                document.getElementById(idFilter).setAttribute("status", "open");
                document.getElementById(idFilter).classList.add("open");
            });
        }
    }

    updateValueFilter(property){
        let filterTable = this.state.filterTable;
        filterTable[property] = document.getElementById(property).value;
        this.setState({filterTable});
    }

    resetValueFilter(property){
        let filterTable = this.state.filterTable;
        filterTable[property] = "";
        document.getElementById(property).value = ""
        this.setState({filterTable});
    }

    resetFilter(){
        let filterTable = {};
        this.setState({filterTable});
    }

    render() {
        const { filterTable } = this.state;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader title="Deliverable Document">
                        <CardHeaderToolbar>
                        </CardHeaderToolbar>
                    </CardHeader>
                    <CardBody>
                        <div className="panel-filter-table mb-1">
                            <span className="mr-2 mt-2 float-left">Filter By:</span>
                            <div className="d-block">
                                <div className="float-left">
                                    {
                                        [...Array(5)].map((item, index) => {
                                            return (
                                                <div key={index.toString()} className="btn-group hover-filter-table" status="closed" id={"filter-" + index}>
                                                    <div className="btn btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false" onClick={this.openFilterTable.bind(this, index)}>
                                                        <span>Nomor PO: </span>
                                                        <strong style={{paddingRight: 1, paddingLeft: 1}}>
                                                            <span className="filter-label" id={"filter-span-" + index}>{filterTable["loop-value-" + index]}</span>
                                                        </strong>
                                                        {
                                                            filterTable["loop-value-" + index] ?
                                                            null
                                                            : 
                                                            <span style={{color: "#777777"}}>
                                                                semua
                                                            </span>
                                                        }
                                                        
                                                    </div>
                                                    <ul role="menu" className="dropdown-menu" style={{zIndex: 90}}>
                                                        <li style={{width: 350, padding: 5}}>
                                                            <form className="clearfix">
                                                                <div className="float-left">
                                                                    <input type="text" className="form-control form-control-sm" name={"loop-value-" + index} id={"loop-value-" + index} defaultValue={filterTable["loop-value-" + index] || ""} placeholder="semua" />
                                                                </div>
                                                                <button type="button" className="ml-2 float-left btn btn-sm btn-primary" onClick={this.updateValueFilter.bind(this, "loop-value-" + index )}>Perbaharui</button>
                                                                <button type="button" className="float-right btn btn-sm btn-light" onClick={this.resetValueFilter.bind(this, "loop-value-" + index )}>
                                                                    <i className="fas fa-redo fa-right"></i>
                                                                    <span>Reset</span>
                                                                </button>
                                                            </form>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm btn-danger ml-2 mt-2 button-filter-submit float-left" onClick={this.resetFilter.bind(this)}>
                                Reset
                            </button>
                        </div>

                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <div className="segment-table">
                                <div className="hecto-10">
                                    <Table className="overflow-auto">
                                <thead>
                                    <tr>
                                                <th className="text-primary align-middle">
                                        <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
                                            <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Down-2.svg")}/>
                                        </span>
                                        Nomor PO
                                        <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
                                            <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Up-2.svg")}/>
                                        </span>
                                        </th>
                                                <th className="text-muted align-middle">
                                            Nomor Kontrak
                                        </th>
                                                <th className="text-muted align-middle">
                                            Nama Kontrak
                                        </th>
                                                <th className="text-muted align-middle">
                                            Tanggal PO
                                        </th>
                                                <th className="text-muted align-middle">
                                            Tanggal Kontrak
                                        </th>
                                                <th className="text-muted align-middle">
                                            Nama Penyedia
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                            [...Array(100)].map((item, index) => {
                                                return (
                                                    <tr key={index.toString()}>
                                                        <td><Link to="/vendor/deliverable_document/item"><strong>249710</strong></Link></td>
                                                        <td>234.PJ/PST-001/I/2021</td>
                                                        <td>Pengadaan Test 1</td>
                                                        <td>05/01/2020</td>
                                                        <td>04/01/2020</td>
                                                        <td>PT. JayaJaya</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                </tbody>
                            </Table>
                        </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <span>Total Data: 5/5</span>
                        </div>
                        <div className="d-flex mt-4">
                            <select className="form-control form-control-sm font-weight-bold mr-4 border-0 bg-light mr-1" style={{width: 75}} defaultValue={5}>
                                {
                                    ["5", "10", "20", "50", "100"].map((item, index) => {
                                        return (
                                            <option key={index.toString()} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />

                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item disabled>{13}</Pagination.Item>

                                <Pagination.Next disabled />
                                <Pagination.Last disabled />
                            </Pagination>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default injectIntl(connect(null, null)(DeliverableDocument));