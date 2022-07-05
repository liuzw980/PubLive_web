import axios from "axios";
import publive from "./WebIMConfig"

function arrlist() {
    axios({
        method: 'post',
        url: 'http://13.57.133.175:8888/api/httplive/temp/v2/getWebConfig',
    }).then((res) => {
        const publiveNew = new publive(res.data.retObj)
        const data = publiveNew.handle()
    })
}
arrlist()