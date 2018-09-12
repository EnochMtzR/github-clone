const getRegistersFromCommand = (command, options) => {
  return command.split(options.registerSeparator);
};

const getFieldsFromRegister = (register, options) => {
  return register.split(new RegExp(`[${options.fieldSeparator}]`));
};

const mapFieldsIntoObject = (object, fields) => {
  let mappedObject = {};
  Object.keys(object).forEach((key, index) => {
    mappedObject[key] = fields[index];
  });

  return mappedObject;
};

const shellParser = (
  command,
  templateObject,
  options = { registerSeparator: "\n", fieldSeparator: " \\t" }
) => {
  const registers = getRegistersFromCommand(command, options);
  let parsedOutput = [];

  for (register of registers) {
    if (!register) {
      break;
    }
    const fields = getFieldsFromRegister(register, options);
    const registerObject = mapFieldsIntoObject(templateObject, fields);

    parsedOutput.push(registerObject);
  }
  return parsedOutput;
};

module.exports = shellParser;
