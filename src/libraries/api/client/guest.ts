import envConfig from "../../config/environment";
import axios from "axios";
const guestAxios = axios.create({ baseURL: envConfig.PUBLIC_API_BASE_URL });

export default guestAxios;
