export default {
  accessToken:
    "at.0te0pvhwd0onfqu7bhoegn9u0zu9wv3v-1la06dh8ja-12fyh6i-x02vs3gxg",
  deviceSerial: "E12366153",
  validateCode: "AFNEVA",
  /**用户Token */
  setToken(accessToken) {
    this.accessToken = accessToken;
  },
  /***设备序列号 */
  setSerial(deviceSerial) {
    this.deviceSerial = deviceSerial;
  },
  /*** 设备验证码*/
  setCode(validateCode) {
    this.validateCode = validateCode;
  }
};
