const encrypt_plaintext = (req, res, next) => {
  try {
    const plaintext = req.body.plain_text;
    const key = Number(req.body.key);
    let encrypted_text = "";
    if (!req.body.plain_text) {
      return res
        .status(400)
        .json({ status: 400, message: "Plaintext is required." });
    }
    if(!key){
      return res
        .status(400)
        .json({ status: 400, message: "Key is required." });
    }
    if (key < 0 || key > 25) {
      return res
        .status(400)
        .json({ status: 400, message: "Key must be between 0 and 25." });
    }

    
    for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
   
        // Encrypt uppercase letters
        if (charCode >= 65 && charCode <= 90) {
          encrypted_text += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
          encrypted_text += String.fromCharCode(((charCode - 97 + key) % 26) + 97);
        } else {
          encrypted_text += plaintext[i];
        }
      }
  
      return res.status(200).json({
        status: 200,
        message: "Plaintext encrypted successfully.",
        plain_text: plaintext,
        encrypted_text: encrypted_text,
      });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const decrypt_cipher_text = (req, res, next) => {
    try {
        const cipher_text = req.body.cipher_text;
        const key = Number(req.body.key);
        let decrypted_text = "";
        if (!req.body.cipher_text) {
          return res
            .status(400)
            .json({ status: 400, message: "Cipher text is required." });
        }
        if(!key){
          return res.status(400).json({ message: "Key is required"});
        }
        if (key < 0 || key > 25) {
          return res
            .status(400)
            .json({ status: 400, message: "Key must be between 0 and 25." });
        }
        for (let i = 0; i < cipher_text.length; i++) {
            const charCode = cipher_text.charCodeAt(i);
            // console.log(charCode)
            // Encrypt uppercase letters
            if (charCode >= 65 && charCode <= 90) {
              let new_char =
                (charCode - 65 - key) % 26 < 0
                ? ((charCode - 65 - key + 26) % 26) + 65
                : ((charCode - 65 - key) % 26) + 65;
              decrypted_text += String.fromCharCode(new_char);
            } else if (charCode >= 97 && charCode <= 122) {
                let new_char =
                (charCode - 97 - key) % 26 < 0
                ? ((charCode - 97 - key + 26) % 26) + 97
                : ((charCode - 97 - key) % 26) + 97;
              //   console.log((charCode - 97 - 3) % 26, new_char);
              decrypted_text += String.fromCharCode(new_char);
            } else {
              decrypted_text += cipher_text[i]; 
      
          }
          }
      
          return res.status(200).json({
            status: 200,
            message: "Cipher text decrypted successfully.",
            cipher_text,
            decrypted_text,
          });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
};

module.exports = { encrypt_plaintext, decrypt_cipher_text };
