import React, {FC} from 'react';
import {Button, FormControl, FormGroup, makeStyles, TextField} from "@material-ui/core";
import InputMask from "react-input-mask";
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../store/store";
import {fetchSendMail} from "../cartReducer";

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
    phone: string
    other:string
}


const FormCart:FC = () => {
    const classes = useStyles();
    const shopList2 = useSelector((state: AppRootStateType) => state.cart.carts)
    const status = useSelector((state: AppRootStateType) => state.cart.status)
    console.log(shopList2)
    const dispatch = useAppDispatch();
    type FormikErrorType = {
        name?: string
        surname?: string
        address?: string
        phone?: string
        other?:string
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            address: '',
            phone: '',
            other: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.surname) {
                errors.surname = 'Required';
            }
            if (!values.address) {
                errors.address = 'Required';
            }
            if (!values.phone) {
                errors.phone = 'Required';
            }
            if(values.phone.replace(/_/gm, '').length <= 16) {
                errors.phone = 'Invalid phone'
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValueType>) => {

            console.log(values)
            console.log(values.phone.length)
            try {
                const res = await dispatch(fetchSendMail({carts:shopList2 , ...values}))

                console.dir(res)
                formik.resetForm()
            }catch (e) {
                console.log(e.message)
                formikHelpers.setFieldError('other', e.message)
            }


        },
    })
    return (
        <>
            <form className={classes.form} onSubmit={formik.handleSubmit} >
                <FormControl className={classes.formControl}>
                    <FormGroup className={classes.formGroup}>
                        <TextField  label="Name" {...formik.getFieldProps('name')} onBlur={formik.handleBlur}/>
                        {formik.touched &&
                        formik.errors.name ? <div style={{color: 'red'}}>{formik.errors.name}</div> : null}
                        <TextField label="Surname" {...formik.getFieldProps('surname')} onBlur={formik.handleBlur}/>
                        {formik.touched &&
                        formik.errors.surname ? <div style={{color: 'red'}}>{formik.errors.surname}</div> : null}
                        <TextField  label="Address" multiline rowsMax={2} {...formik.getFieldProps('address')} onBlur={formik.handleBlur}/>
                        {formik.touched &&
                        formik.errors.address ? <div style={{color: 'red'}}>{formik.errors.address}</div> : null}
                        <InputMask
                            mask="+7(999) 999-99-99"
                            disabled={false}
                            {...formik.getFieldProps('phone')}
                        >
                            {(a:any) => {
                                return <TextField label="Phone" {...a} />
                            }}
                        </InputMask>
                        {formik.touched &&
                        formik.errors.phone ? <div style={{color: 'red'}}>{formik.errors.phone}</div> : null}

                    </FormGroup>
                    <Button type={'submit'} variant={'contained'} color={'primary'} disabled={status === 'loading'}>Order</Button>
                    {
                        formik.errors.other ? <div style={{color: 'red'}}>{formik.errors.other}</div> : null}
                    {
                        status === 'loading' ? <div style={{color: 'red'}}>{status}</div> : null}
                </FormControl>
            </form>
        </>
    );
};

export default FormCart;