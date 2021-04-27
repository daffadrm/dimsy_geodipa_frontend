import { LOGIN_URL } from "../../Auth/_redux/authCrud";
import {DEV_NODE} from "../../../../redux/BaseHost";
import axios from 'axios'

export const PO_URL = `http://172.18.1.112:3000/api/get-docs-deliverable/` //`${DEV_RUBY}/api/`

export function getDocumentPO(id,po) {
    return axios.get (PO_URL+id+'/'+po)
}


