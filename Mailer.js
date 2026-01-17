

const { Resend } = require('resend');

const resend = new Resend('re_Rh69Dkjm_NywTbvLmcRfL3DykX5yJQwqS');

const Mailer = function(data){
    this.data = data
}
Mailer.prototype.resendMail = async function() {
  return new Promise(async(resolve, reject) => {
    const { data, error } = await resend.emails.send({
      from: 'Kings Developers Mail <info@kingsdevelopers.com>',
      to: ['info@kingsdevelopers.com'],
      subject:'Client Inquiry',
      html: `
      <b>Client name: ${this.data.name}</b><br>
      <b>Client phone: ${this.data.phone} </b><br>
      <b>Client email: ${this.data.email} </b><br>
      <b>Client message: ${this.data.message} </b><br>
      <b>Contact from: ${this.data.url} </b>
      `,
    });
  
    if (error) {
      reject({ error });
    }
  
    resolve({ data });
  })
}
Mailer.prototype.resendSale = async function() {
  return new Promise(async(resolve, reject) => {
    const { data, error } = await resend.emails.send({
      from: 'Kings Developers Mail <info@kingsdevelopers.com>',
      to: ['sales@kingsdevelopers.com'],
      subject: 'Client Inquiry',
      html: `
      <b>Client name: ${this.data.name}</b><br>
      <b>Client phone: ${this.data.phone} </b><br>
      <b>Client email: ${this.data.email} </b><br>
      <b>Client message: ${this.data.message} </b><br>
      <b>Contact from: ${this.data.url} </b>
      `,
    });
  
    if (error) {
      reject({ error });
    }
  
    resolve({ data });
  })
}
Mailer.prototype.resendSubscribe = async function() {
  return new Promise(async(resolve, reject) => {
    const { data, error } = await resend.emails.send({
      from: 'Kings Developers Mail <info@kingsdevelopers.com>',
      to: ['info@kingsdevelopers.com'],
      subject: 'Client Subscription',
      html: `
       <b>Client name: ${this.data.name}</b><br>
      <b>Client email: ${this.data.email} </b><br>
       <b>Contact from: ${this.data.url} </b>
      `,
    });
  
    if (error) {
      reject({ error });
    }
  
    resolve({ data });
  })
}
module.exports = Mailer