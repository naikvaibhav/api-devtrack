const bcrypt = require("bcrypt");
const saltRounds = 10;
const logger = require("./loggerLib");

const hashPassword = (myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  return hash;
};

const comparePassword = async (myPlaintextPassword, hashedPassword) => {
  try {
    const validPassword = await bcrypt.compare(
      myPlaintextPassword,
      hashedPassword
    );
    return validPassword;
  } catch (err) {
    logger.error(err.message, "Comparison error", 5);
    return err.message;
  }
};

module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
};
