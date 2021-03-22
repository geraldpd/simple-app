class Token{

    isValid(token){
        const payload = this.payload(token);
        const domain = window.location.origin;

        if(payload){
            return payload.iss == domain+'/api/auth/login' || domain+'/api/auth/register' ? true : false;
        }

        return false;
    }

    payload(token){
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload){
        return JSON.parse(atob(payload));
    }
}

export default Token = new Token();