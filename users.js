//para fetch de API 
class Users {
  constructor(){
    this.apiKey = 'a71b232c-218e-4d';
  }

  async getUser() {
    const response = await fetch(`https://www.mockachino.com/a71b232c-218e-4d/users`);
    const responseData = await response.json();

    return responseData;
  }
}

