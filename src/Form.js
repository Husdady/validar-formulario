/* Custom Hooks */
import useForm from './hooks/useForm.js';
import { validateField, validateEmail } from './hooks/useValidation';

/* Styles */
import './css/styles.css';

/* Reglas del Esquema:
	required: Si el valor está vacío se pasa como valor el mensaje,
	min: { valor mínimo de carácteres
		limit: define el límite,
		message: define un mensaje para la regla min
	}
*/
/* Esquema de prueba, usado en validationSchema */
// const validateFormSchema = {
// 	name: {
// 		required: 'Por favor ingresa un nombre.',
// 		min: {
// 			limit: 7,
// 			message: limit => `El límite es de ${limit} carácteres.`
// 		}
// 	},
// 	surname: {
// 		required: 'Por favor ingrese un apellido.',
// 		min: {
// 			limit: 12,
// 			message: 'La cantidad máxima de carácteres es 12.'
// 		}
// 	},
// 	email: {
// 		required: 'Por favor debe ingresar su correo electrónico.',
// 		isEmail: true,
// 	}
// }

const Form = () => {
	/*
		values: obtiene el estado actual de los valores del formulario
		setField: cambia el estado de los valores del formulario, recibe dos argumentos: el campo (propiedades de initialValues) y su valor,
		errors: obtiene los errores del formulario,
		handleSubmit: función que se pasa al onSubmit del formulario para validarlo
	*/
	const { values, setFieldValue, errors, handleSubmit } = useForm({
		 /* Valores iniciales del formulario */
		initialValues: {
			name: '',
			surname: '',
			email: ''
		},
		// validationSchema: validateFormSchema,
		// validateAllFields: true,
		validate: (property, value) => {
			/* Si VALIDATE_ALL_FIELDS es false VALIDATE recibe 2 parámetros: la propiedad y su valor, dependiendo de su propiedad se va a cumplir la regla, si es true, recibe un obj que es el estado de los valores */
			/* Crea un obj vacío fuera de la función validate (línea 32), a continuación crea las reglas y añade propiedades al obj que serán los errores para mostrarlos como errorObj.name = 'Campo obligatorio'. Retorna los errores para validarlos */
			/* ADVERTENCIA: Si usted a proporciona validateAllFields en TRUE y añade dos argumentos en validate, no funcionará la validación, cuando validateAllFields es false recibe dos parametros y cuando es true sólo uno */

			/* Ejemplo de validación en cada campo individualmente */
			const errorObj = {};

			switch (property) {
				case 'name':
					const testName = validateField({
						name: property,
						value,
						required: 'Por favor ingresa un nombre.',
						min: 6,
						shortValue: 'Ingresa un valor menor a 6 carácteres'
					});
					Object.assign(errorObj, testName);
					break;
				case 'surname':
					const testSurname = validateField({
						name: property,
						value,
						required: 'Por favor ingresa un apellido.',
						min: 8,
						shortValue: 'Ingresa un valor menor a 8 carácteres'
					});
					Object.assign(errorObj, testSurname);
					break;
				case 'email':
					/* VERIFICA EL HOOK useValidation y su función validateEmail */
					const testEmail = validateEmail({
						value,
						required: 'Por favor ingresa un email',
						validEmail: 'El email que has ingresado no es correcto'
					});
					Object.assign(errorObj, testEmail);
					break;
			}

			return errorObj;
			/* Si todas las reglas se cumplen, se ejecuta onSubmit */

			/* VALIDACIÓN EN TODOS LOS CAMPOS, DEBE TENER validateAllFields en TRUE y recibir un sólo argumento		
			CONSULTA EL HOOK useValidation y su función validateField

			const testName = validateField({
				name: 'name',
				value: value.name,
				required: 'Por favor ingresa un nombre.',
				min: 6,
				shortValue: 'Ingresa un valor menor a 6 carácteres'
			});
			
			const testSurname = validateField({
				name: 'surname',
				value: value.surname,
				required: 'Por favor ingresa un apellido.',
				min: 8,
				shortValue: 'Ingresa un valor menor a 8 carácteres'
			});

			 VERIFICA EL HOOK useValidation y su función validateEmail
			const testEmail = validateEmail({
				value: value.email,
				required: 'Por favor ingresa un email',
				validEmail: 'El email que has ingresado no es correcto'
			});

			const errorObj = Object.assign({}, testName, testSurname, testEmail);
			return errorObj;
			*/
			
		},
		onSubmit: ({
			values,
			resetForm
		}) => {
			alert('You are logged');
			// resetForm(); reinicia el formulario
		}
	})

	return (
		<form id="container" onSubmit={handleSubmit}>
			<h2>Formulario:</h2>
			<input
				type="text"
				value={values.name}
				className="textInput"
				placeholder="Ingresa un nombre"
				onChange={e => setFieldValue('name', e.target.value)}
			/>

			{errors.name && <span className="error-message">{errors.name}</span>}

			<input
				type="text"
				value={values.surname}
				className="textInput"
				placeholder="Ingresa un apellido"
				onChange={e => setFieldValue('surname', e.target.value)}
			/>

			{errors.surname && <span className="error-message">{errors.surname}</span>}

			<input
				type="text"
				value={values.email}
				className="textInput"
				placeholder="Ingresa un email"
				onChange={e => setFieldValue('email', e.target.value)}
			/>

			{errors.email && <span className="error-message">{errors.email}</span>}

			<button type="submit" id="button">Enviar</button>
		</form>
	);
}

export default Form;
