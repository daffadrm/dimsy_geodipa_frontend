import React from 'react';
import { Form } from "react-bootstrap";
class ChildTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataRow: this.props?.data.child,
            parentData: this.props?.data,
            indexRow: this.props.index
        }
    }

    //Life Circle pada React JS Component
    componentDidMount() {
    }

    // Setiap ada Perubahan data pada redux akan terlihat pada componentDidUpdate
    componentDidUpdate(prevProps, prevState) {
    }

    removeDataByIndex(indexRow, indexCell){
        let dataRow = [...this.state.dataRow];
        dataRow.splice(indexCell, 1)
        this.setState({dataRow}, ()=>{
            this.props.callBackAddData(dataRow, indexRow);
        })
    }

    changesRadio(indexRow, indexCell, event){
        let dataRow = [...this.state.dataRow];
        dataRow[indexCell].mandatory = JSON.parse(event.target.value);
        this.setState({dataRow}, ()=>{
            this.props.callBackAddData(dataRow, indexRow);
        })
    }

    render() {
        const { dataRow, indexRow } = this.state;
        return (
            <React.Fragment>
                {
                    dataRow?.map((item, index) => {
                        return(
                            <tr key={index.toString()}>
                                <td className="align-middle text-center td-3">
                                    <span>
                                        <i className="far fa-file"/>
                                    </span>
                                </td>
                                <td className="align-middle td-17">
                                    <span>{item.name}</span>
                                    {/* <input type="text" className="form-control form-control-sm" id={"changeInput-"+ parentData.id + "-" + index} value={item.name ? item.name:"" } onChange={(e) => {let dataRow = [...this.state.dataRow]; dataRow[index].name = e.target.value; this.setState({dataRow});}} /> */}
                                </td>
                                <td className="align-middle text-center td-3">{item.note ? <i className='far fa-eye pointer'></i>: "-"}</td>
                                <td className="align-middle td-6 text-center">
                                    {
                                        item.name === "BAPP" || item.name === "BAST" ?
                                        null
                                        :
                                        <div>
                                            <i className="far fa-plus-square m-1 text-primary pointer"></i>
                                            <i className="far fa-edit m-1 text-success pointer"></i>
                                            <i className="far fa-trash-alt m-1 text-danger pointer" onClick={this.removeDataByIndex.bind(this, indexRow, index)}></i>
                                        </div>
                                    }
                                </td>
                                <td className="align-middle td-8">Unduh</td>
                                <td className="align-middle td-8">{ item.upload_date_vendor ? window.moment(new Date(item.upload_date_vendor)).format("DD MMM YYYY") : null }</td>
                                <td className="align-middle td-8">Unduh</td>
                                <td className="align-middle td-8">{ item.upload_date_user ? window.moment(new Date(item.upload_date_user)).format("DD MMM YYYY") : null }</td>
                                <td className="align-middle td-6">-</td>
                                <td className="align-middle td-8 text-center">
                                <Form>
                                    <Form.Check inline label="Yes" type="radio" id={`inline-radio-1`} value={true} checked={item.mandatory ? true : false } onChange={this.changesRadio.bind(this, indexRow, index)} name="mandatary" />
                                    <Form.Check inline label="no" type="radio" id={`inline-radio-2`} value={false} checked={!item.mandatory ? true : false} onChange={this.changesRadio.bind(this, indexRow, index)} name="mandatary" />
                                </Form>
                                </td>
                                <td className="align-middle td-8">-</td>
                                <td className="align-middle text-center" style={{width: "4.4%"}}>
                                    {item.comment ? <i className='far fa-eye pointer'></i>: "-"}
                                </td>
                                <td className="align-middle td-8">-</td>
                                <td className="align-middle text-center">
                                    <i className="far fa-check-circle fa-lg m-2 text-primary pointer"></i>
                                    <i className="far fa-times-circle fa-lg m-2 text-danger pointer"></i>
                                </td>
                            </tr>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default ChildTable;