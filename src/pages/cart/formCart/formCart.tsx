import React, {FC, useState} from 'react';
import {Button, FormControl, FormGroup, makeStyles, TextField} from "@material-ui/core";
import InputMask from "react-input-mask";
import {FormikHelpers, useFormik} from "formik";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formControl: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formGroup: {
        marginBottom: '2%'
    }
    }

));


type FormValueType ={
    name: string
    surname: string
    address: string
}


const FormCart:FC = () => {
    const classes = useStyles();
    const [valuesss, setValues] = useState<string>('')
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const customChange = (e:any) => {
        setValues(e.target.value)
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            address: ''

        },
        // validate: (values) => {
        //     const errors: FormikErrorType = {};
        //     if (!values.email) {
        //         errors.email = 'Required';
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address';
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required';
        //     } else if (values.password.length < 6) {
        //         errors.password = 'Password has been 6 length'
        //     }
        //     return errors;
        // },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValueType>) => {

            console.log(values)
            console.log(valuesss)


            // const res = await dispatch(LoginTC(values))
            // if (LoginTC.rejected.match(res)) {
            //     if (res.payload?.fieldsErrors?.length){
            //         const error = res.payload.fieldsErrors[0]
            //         formikHelpers.setFieldError(error.field, error.error)
            //     } else {
            //
            //     }
            // }

        },
    })
    return (
        <>
            <form className={classes.form} onSubmit={formik.handleSubmit} >
                <FormControl className={classes.formControl}>
                    <FormGroup className={classes.formGroup}>
                        <TextField  label="Name" {...formik.getFieldProps('name')}/>
                        <TextField label="Surname" {...formik.getFieldProps('surname')}/>
                        <TextField label="Address" multiline rowsMax={2} {...formik.getFieldProps('address')}/>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            disabled={false}
                            value={valuesss}
                            onChange={customChange}
                        >
                            {() => <TextField label="Phone"/>}
                        </InputMask>
                    </FormGroup>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormControl>
            </form>
        </>
    );
};

export default FormCart;