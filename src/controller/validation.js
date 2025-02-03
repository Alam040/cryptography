const validation = (req, res) => {
    try {
      const plain_text = req.body.plain_text;
      const key = req.body.key;
      const type = req.body.type;
      const cipher_text = req.body.cipher_text;
      if (type === "encrypt" && !plain_text) {
        return res.status(400).send({ message: "Plain text is required" });
      }
      if (type === "decrypt" && !cipher_text) {
        return res.status(400).send({ message: "Cipher text is required" });
      }
      if (!key) {
        return res.status(400).send({ message: "Key is required" });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  module.exports = {validation};