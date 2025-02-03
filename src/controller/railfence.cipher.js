const validation = require('./validation')
const encrypt_text = (req, res) => {
    try {
       validation.validation(req, res);

       
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

const decrypt_cipher_text = (req, res) => {
    try {
       validation.validation(req, res);


    } catch (error) {
        return res.status(500).json({error: error})
    }
}


module.exports = {encrypt_text, decrypt_cipher_text};