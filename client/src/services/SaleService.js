import axios from 'axios';

const URL = '/api/sale'

class SaleService {

  static createSale(sale) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${URL}/create`, {
          sale
        });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getSales(diaperId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${URL}/${diaperId}`);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

}

export default SaleService;

