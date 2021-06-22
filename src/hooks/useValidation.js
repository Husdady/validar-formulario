const validateField = field => {
  const errors = {};
    if (field.value === '') {
      errors[field.name] = field.emptyValue
    } else if (field.value.length < field.min) {
      errors[field.name] = field.shortValue || `Debe tener un mínimo de ${field.min} cáracteres`
    }
  return errors;
}

const validateEmail = email => {
  const errors = {},
    isValidEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value === '') {
    errors.email = email.required || 'Por favor ingresa tu correo electrónico';
  } else if (!isValidEmail.test(email.value)) {
    errors.email = email.validEmail || 'Ingresa un correo electrónico válido';
  };
  return errors;
}

module.exports = { validateField, validateEmail }
