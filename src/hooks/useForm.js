/* React components */
import { useState, useEffect } from 'react';
/* Custom hooks */
import { validateField, validateEmail } from './useValidation';

/* Hook para validar formulario */
const useForm = ({
	/* Añado por ahora 3 propiedades que serán los valores iniciales del formulario (initialValues), válido el formulario con validationSchema que es un obj que define las reglas en los campos, y onSubmit se debería ejecutar cuando el formulario es válido */
	initialValues,
	validationSchema,
	onSubmit
}) => {

	const [values, setValues] = useState(initialValues),
	[errors, setErrors] = useState({}),

	runValidationSchema = (property, value) => {

		let result;

		if (validationSchema) {
			/* primero verifico si existe el Schema, acontinuación si tiene una propiedad llamada isEmail que válida correos electrónicos, para ello el Schema debe tener propiedades que se llamen iguales a los 'values' */

			if (validationSchema[property].isEmail) {
				/* Si se cumple la condición entonces llamamos a la función validateEmail, que acepta un obj como parámetro y tres propiedades, el valor del email (texto) que se testea en la función, required: si el email está vacío, y validEmail, ambos retornan un mensaje dependiendo de cuál condición se cumple  */
				result = validateEmail({
					value,
					required: validationSchema[property].required, /* Cómo mensaje le pasamos la propiedad required del Schema dependiendo del campo */
					validEmail: validationSchema[property].validEmail /* Cómo mensaje le pasamos la propiedad validEmail del Schema dependiendo del campo */
				});
			} else {
				/* Válida un campo si este, está vacío o se ha definido un límite de carácteres, validateField recibe 5 propiedades, el nombre del campo (name), el valor, un mensaje si el valor está vacío (emptyValue), min, el límite de carácteres, y shortValue, el mensaje que se muestra cuando min se cumple  */
				const min = validationSchema[property].min.limit;
				result = validateField({
					name: property,
					value,
					emptyValue: validationSchema[property].required,
					min,
					shortValue: validationSchema[property].min.message(min)
				});
			}

			setErrors({...errors, [property]: result[property] });
			
		}
	},

	runValidateAllFields = () => {
		//// función para validar en todos los campos al presionar en el botón
	},
	
	setFieldValue = (property, value) => {
		setValues({...values, [property]: value}); /* cambio el valor dependiendo del campo que se está focuseando */
		runValidationSchema(property, value);
	},

	handleSubmit = e => {
		e.preventDefault();
		runValidateAllFields();
		return onSubmit(values);
	},

	resetForm = () => {
		setValues(initialValues);
		setErrors({});
	}

	// useEffect(() => {
	// 	console.log(errors);
	// }, [errors]);

	return {
		values,
		setFieldValue,
		errors,
		handleSubmit
	}
}

export default useForm;
