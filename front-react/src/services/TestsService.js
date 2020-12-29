import http from "../http-common";

class TestsService {

  constructor() {
    this.state = {
      tableName: "/tests"
    };
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
}

export default new TestsService();
