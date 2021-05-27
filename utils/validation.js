import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('please enter valid email')
    .required('email is required'),
  password: yup
    .string()
    .min(6, ({min}) => `password must be at least ${min} characters`)
    .required('password is required'),
});

export const regValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('please enter valid email')
    .required('email is required'),
  password: yup
    .string()
    // .matches(/\w*[a-z]\w*/, 'password must have a small letter')
    // .matches(/\w*[A-Z]\w*/, 'password must have a capital letter')
    // .matches(/\d/, 'password must have a number')
    // .matches(
    //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //   'password must have a special character',
    // )
    .min(6, ({min}) => `password must be at least ${min} characters`)
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords do not match')
    .required('confirm password is required'),
});
