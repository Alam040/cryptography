const router = require('express').Router();
const caesar_cipher = require('../controller/caesar_cipher');
const monoalphabetic_cipher = require('../controller/monoalphabetic_cipher');
const playfair_cipher = require('../controller/playfair_cipher')
const vigenere_cipher = require('../controller/vigenere.cipher')

router.post('/', (req, res) => {
    // console.log(req.body)
    const encrypt_type = req.body.method
    const type = req.body.type
    // console.log(encrypt_type)
    if (encrypt_type === 'caesar') {
        if(type === "encrypt") caesar_cipher.encrypt_plaintext(req, res) 
        else if(type === "decrypt") caesar_cipher.decrypt_cipher_text(req, res) ;
        else return res.status(400).json({status: 400, message: 'Invalid encryption type.'})
    } 
    else if (encrypt_type === 'monoalphabetic') {
        if(type === "encrypt") monoalphabetic_cipher.encrypt_plaintext(req, res) 
        else if(type === "decrypt") monoalphabetic_cipher.decrypt_cipher_text(req, res) ;
        else return res.status(400).json({status: 400, message: 'Invalid encryption type.'})
    } 
    else if (encrypt_type === 'playfair') {
        if(type === "encrypt") playfair_cipher.encrypt_text(req, res) ; 
        else if(type === "decrypt") playfair_cipher.decrypt_cipher_text(req, res) ;
        else return res.status(400).json({status: 400, message: 'Invalid encryption type.'})
    } 
    else if (encrypt_type === 'vigenere') {
        if(type === "encrypt") vigenere_cipher.encrypt_text(req, res) ; 
        else if(type === "decrypt") vigenere_cipher.decrypt_cipher_text(req, res) ;
        else return res.status(400).json({status: 400, message: 'Invalid encryption type.'})
    } 
    else {
        return res.status(400).json({status: 400, message: 'Invalid encryption method name.'})
    }
});



module.exports = router