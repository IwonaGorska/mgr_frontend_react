import http from "../http-common";

class ItemsService {

  constructor() {
    this.state = {
      tableName: "/items"
    };
  }

  getAll() {
    try{
      const response = http.get(this.state.tableName);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.get(this.state.tableName);
  }

  get(id) {
    try{
      const response = http.get(this.state.tableName + `/${id}`);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.get(this.state.tableName + `/${id}`);
  }

  create(data) {
    try{
      const response = http.post(this.state.tableName, data);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.post(this.state.tableName, data);
  }

  update(id, data) {
    try{
      const response = http.put(this.state.tableName + `/${id}`, data);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.put(this.state.tableName + `/${id}`, data);
  }

  delete(id) {
    try{
      const response = http.delete(this.state.tableName + `/${id}`);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.delete(this.state.tableName + `/${id}`);
  }

  deleteAll() {
    try{
      const response = http.delete(this.state.tableName);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.delete(this.state.tableName);
  }

  findByName(name) {
    try{
      const response = http.get(this.state.tableName + `?name=${name}`);
      return response;
    }catch(error){
      console.log('Error - ', error);
      return error;
    }
    // return http.get(this.state.tableName + `?name=${name}`);
  }
}

export default new ItemsService();
