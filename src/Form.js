/* Custom Hooks */
import useForm from './hooks/useForm.js';

/* Styles */
import './css/styles.css';

const validateFormSchema = {
	name: {
		required: 'Por favor ingresa un nombre.',
		min: {
			limit: 7,
			message: limit => `El límite es de ${limit} carácteres.`
		}
	},
	email: {
		required: 'Por favor debe ingresar su correo electrónico',
		isEmail: true,
	}
}

const Form = () => {

	const { values, setFieldValue, errors, handleSubmit } = useForm({
		initialValues: {
			name: '',
			email: ''
		},
		validationSchema: validateFormSchema,
		onSubmit: values => {
			// alert('You are logged!');
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
