import axios from 'axios';

const URL = '/api/model'

class ModelService {

  static getModels() {
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

  static createModel(model) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${URL}/create`, {
          model
        });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  static deleteModel(modelId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${URL}/delete/${modelId}`);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  
}

export default ModelService;

