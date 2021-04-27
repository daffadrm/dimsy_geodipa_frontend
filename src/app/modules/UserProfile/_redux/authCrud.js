import axios from "axios";
import { DEV_NODE, DEV_RUBY } from '../../../../redux/BaseHost' 
export const UPDATE_PROFILE = `${DEV_NODE}/api/update_personnel/`;
export const UPDATE_PASSWORD = `${DEV_RUBY}/api/user/users/current_user/update_password`;

export function updateProfile(id, data) {
  return axios.post(UPDATE_PROFILE + id, data);
}
export function updatePassword(params, data) {
  return axios.put(UPDATE_PASSWORD + params, {data});
}
