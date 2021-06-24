/* React components */
import { useState, useEffect } from 'react';
/* Custom hooks */
import { validateField, validateEmail } from './useValidation';

const isEmpty = obj => Object.keys(obj).length === 0;

const useForm = ({
	initialValues,
	validationSchema,
	validate,
	validateOnChange = true,
	validateAllFields = false,
	onSubmit
}) => {

	const [values, setValues] = useState(initialValues),
		[errors, setErrors] = useState({}),

		getRulesSchema = validationSchema ? Object.values(validationSchema) : [],
		getPropertiesNameSchema = validationSchema ? Object.getOwnPropertyNames(validationSchema) : [],
		getPropertiesValues = Object.getOwnPropertyNames(initialValues),

		runValidationRules = (property, value) => {
			let result;
			if (validationSchema[property].isEmail) {
				result = validateEmail({
					value,
					required: validationSchema[property].required,
					validEmail: validationSchema[property].validEmail
				});
			} else {
				const existMinRule = validationSchema[property].min;
				const min = existMinRule && existMinRule.limit;
				result = validateField({
					name: property,
					value,
					required: validationSchema[property].required,
					min,
					shortValue: existMinRule && (typeof existMinRule.message === 'function' ? existMinRule.message(min) : existMinRule.message)
				});
			}

			return result;
		},

		runValidationSchema = result => {
			setErrors(result);
			isEmpty(result) && onSubmit({
				values,
				resetForm
			});
		},

		deleteUndefinedErrors = (result, property) => {
			if (isEmpty(result)) {
				const deleteProperty = { ...errors };
				delete deleteProperty[property];
				!isEmpty(errors) && setErrors(deleteProperty);
			} else {
				setErrors({ ...errors, [property]: result[property] });
			}
		},

		runValidationErrors = ({ property, value, allValues }) => {
			const getErrors = validateAllFields ? validate(allValues) : validate(property, value);
			return getErrors;
		},

		runValidateAllFields = () => {
			let result;
			if (validationSchema) {
				result = getRulesSchema.reduce((acc, _, i) => {
					const property = getPropertiesNameSchema[i];
					const getValidationResult = runValidationRules(property, values[property]);
					return { ...acc, ...getValidationResult };
				}, {});
			} else if (validate) {
				result = getPropertiesValues.reduce((acc, property) => {
					// const getErrors = validate(property, values[property]);
					const getErrors = runValidationErrors({
						property,
						value: values[property],
						allValues: values
					});
					return { ...acc, ...getErrors };
				}, {});
			}
			runValidationSchema(result);
		},

		setFieldValue = (property, value) => {
			let deleteErrors;
			const fieldValue = { ...values, [property]: value };
			setValues(fieldValue);
			if (validateOnChange) {
				if (validationSchema) {
					deleteErrors = runValidationRules(property, value);
				} else if (validate) {
					const getErrors = runValidationErrors({
						property,
						value,
						allValues: fieldValue
					});
					deleteErrors = getErrors;
					typeof getErrors === 'object' && setErrors(getErrors);
				}
			}
			deleteUndefinedErrors(deleteErrors, property);
		},

		handleSubmit = e => {
			e.preventDefault();
			return runValidateAllFields();
		},

		resetForm = () => {
			setValues(initialValues);
			setErrors({});
		}

	return {
		values,
		setFieldValue,
		errors,
		handleSubmit,
		resetForm
	}
}

export default useForm;
