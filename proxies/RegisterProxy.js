import Proxy from './Proxy';

class RegisterProxy extends Proxy {

  constructor(parameters = {}) {
    super('Register', parameters);
  }

  addTemplate(param){
    return this.submit('post', `${this.endpoint}/create`,param);
  }

 /* schedulecampaign(param){
    return this.submit('post', `${this.endpoint}/schedule`,param);
  }

  updateBroadcastcampaign(param){
    return this.submit('post', `${this.endpoint}/update`,param);
  }

  getBroadcastcampaign(id, param){
    this.parameters = param;
    return this.submit('get', `${this.endpoint}/partner/${id}/all`);
  }

  getBroadcastcampaignedit(id){
    return this.submit('get', `${this.endpoint}/one?id=${id}`);
  }

  deleteBroadcastcampaign(id){
    //console.log("check2", id);
    return this.submit('post', `${this.endpoint}/delete?id=${id}`);
  }
*/
}

export default RegisterProxy;
