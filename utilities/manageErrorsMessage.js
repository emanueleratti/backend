const manageErrorsMessages = (error) => {
  const debugMode = process.env.DEBUG_MODE;
  return debugMode ? error.message : error;
};

module.exports = manageErrorsMessages;
