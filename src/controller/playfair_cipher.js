const validation = require('./validation');
const encrypt_text = (req, res) => {
  try {
    // Validate the input
    validation.validation(req, res);
    
    
    const key = req.body.key?.toUpperCase();
    const plain_text = req.body.plain_text?.toUpperCase();
    let matrix = getGenerateMatrix(key);
    let encrypted_text = "";

    
    let formattedText = formatText(plain_text);

    for (let i = 0; i < formattedText.length; i++) {
      let [r1, c1] = getPosition(formattedText[i][0], matrix);
      let [r2, c2] = getPosition(formattedText[i][1], matrix);

      if (r1 === r2) {
        encrypted_text += matrix[r1][(c1 + 1) % 5];
        encrypted_text += matrix[r2][(c2 + 1) % 5];
      } else if (c1 === c2) {
        encrypted_text += matrix[(r1 + 1) % 5][c1];
        encrypted_text += matrix[(r2 + 1) % 5][c2];
      } else {
        encrypted_text += matrix[r1][c2] + matrix[r2][c1];
      }
    }

    return res.status(200).json({
      status: 200,
      message: "Plain text encrypted successfully.",
      plain_text,
      cipher_text: encrypted_text,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

const decrypt_cipher_text = (req, res) => {
  try {
    // Validate the input
    validation.validation(req, res)
    
    
    const key = req.body.key?.toUpperCase();
    const cipher_text = req.body.cipher_text?.toUpperCase();
    let matrix = getGenerateMatrix(key);
    let decrypted_text = "";

    let formattedText = formatText(cipher_text);
    

    for (let i = 0; i < formattedText.length; i++) {
      let [r1, c1] = getPosition(formattedText[i][0], matrix);
      let [r2, c2] = getPosition(formattedText[i][1], matrix);

      if (r1 === r2) {
        decrypted_text += matrix[r1][(c1 - 1 + 5) % 5];
        decrypted_text += matrix[r2][(c2 - 1 + 5) % 5];
      } else if (c1 === c2) {
        decrypted_text += matrix[(r1 - 1 + 5) % 5][c1];
        decrypted_text += matrix[(r2 - 1 + 5) % 5][c2];
      } else {
        decrypted_text += matrix[r1][c2] + matrix[r2][c1];
      }
    }

    formattedText = formatText(decrypted_text);
    decrypted_text = '';
    

    for(var i = 0; i < formattedText.length;) {
        if(i < formattedText.length-1 && formattedText[i][0] === formattedText[i+1][0] && formattedText[i][1] === "X"){
            decrypted_text += formattedText[i][0] + formattedText[i+1][0];
            i += 2;
        }else{
            decrypted_text += formattedText[i];
            i++;
        }
    }
    
    if(formattedText[formattedText.length -1][1] === 'Z'){
      decrypted_text = decrypted_text.substring(0, decrypted_text.length - 1);
    }
    

    return res.status(200).json({
      status: 200,
      message: "Cipher text decrypted successfully.",
      cipher_text,
      plain_text: decrypted_text,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
};

const getGenerateMatrix = (key) => {
  let keySet = new Set(key);
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  let matrix = [];

  for (let char of alphabet) {
    keySet.add(char);
  }

  let keyArray = Array.from(keySet);
  for (let i = 0; i < 5; i++) {
    matrix.push(keyArray.slice(i * 5, i * 5 + 5));
  }
  return matrix;
};

const formatText = (text) => {
  let formattedText = text.replace(/[^A-Za-z]/g, "").toUpperCase();
  let result = [];

  for (let i = 0; i < formattedText.length; ) {
    let pair = formattedText.slice(i, i + 2);
    if (pair.length < 2) {
        new_pain = pair === "Z" ? 'X' : 'Z';
        pair += new_pain;
      result.push(pair);
      i = i + 1;
    } else {
      if (pair[0] === pair[1]) {
        pair = pair[0] + "X";
        result.push(pair);
        i = i + 1;
      } else {
        result.push(pair);
        i = i + 2;
      }
    }
  }

  return result;
};

const getPosition = (pair, matrix) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (pair === matrix[i][j]) {
        return [i, j];
      }
    }
  }
};

module.exports = { encrypt_text, decrypt_cipher_text };
