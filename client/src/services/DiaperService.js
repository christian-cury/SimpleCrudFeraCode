import axios from 'axios';

const URL = 'diaper';

class DiaperService {

  static getTotalDiapers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(URL);
        const data = res.data;
        resolve(data.data.total_rows);
      } catch (error) {
        reject(error)
      }
    })
  }

  static getDiapers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(URL);
        const data = res.data;

        resolve(
          data.data.rows.map(row => ({
            ...row
          }))
        )
      } catch (error) {
        reject(error);
      }
    })
  }

  static getDiaper(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${URL}/${id}`);
        const data = await res.data;
        resolve(await data);
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default DiaperService;