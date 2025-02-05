const validation = require("./validation");
const encrypt_text = async (req, res) => {
  try {
    validation.validation(req, res);
    let encrypted_text = await vigenereCipher(req);
    return res.status(200).json({
      status: 200,
      message: "Encrypted Successfully.",
      plain_text: req.body.plain_text,
      cipher_text: encrypted_text,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const decrypt_cipher_text = (req, res) => {
  try {
    validation.validation(req, res);
    let decrypted_text = vigenereCipher(req);
    return res.status(200).json({
      status: 200,
      message: "Decrypted Successfully.",
      cipher_text: req.body.cipher_text,
      plain_text: decrypted_text,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const vigenereCipher = (req) => {
  const plain_text = req.body.plain_text;
  const cipher_text = req.body.cipher_text;
  let key = req.body.key;
  const type = req.body.type;
  let text = "";
  text = type === "encrypt" ? plain_text : cipher_text;

  text = text
    .toUpperCase()
    .replace(/[^A-Z]/g, " ")
    .trim()
    .split(" ");
  key = key.toUpperCase().replace(/[^A-Z]/g, "");
  let result = [];
  let keyIndex = 0;
  let keyLength = key.length;

  for (let idx = 0; idx < text.length; idx++) {
    let txt = "";
    for (let i = 0; i < text[idx].length; i++) {
      let currentChar = text[idx].charCodeAt(i) - 65;
      let keyChar = key.charCodeAt(keyIndex % keyLength) - 65;

      let newCharCode =
        type === "encrypt"
          ? (currentChar + keyChar) % 26
          : (currentChar - keyChar + 26) % 26;

      txt += String.fromCharCode(newCharCode + 65);
      keyIndex++;
    }
    result.push(txt);
  }
  return result.join(" ");
};

module.exports = { encrypt_text, decrypt_cipher_text };
