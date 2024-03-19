const file = require("../services/login.service");
const FileService = new file();

module.exports = { loginWebUser, loginMobileUser };

//Service Center Login
async function loginWebUser(req, res) {
  try {
    const result = await FileService.loginAndAuthenticateWeb(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}


//Customer Login
async function loginMobileUser(req, res) {
  try {
    const result = await FileService.loginAndAuthenticateMobile(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}