import React from 'react';
import 'date-fns';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {createStyles, Grid, makeStyles, MenuItem, Paper, Theme} from "@material-ui/core";
import s from './InvoiceForm.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ClientInfoType, ClientType} from "../../reducers/client-reducer";
import {SellersType} from "../../reducers/sellers-reducer";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const validationSchema = yup.object({
    client: yup
        .string()
        .required('Client is required'),
    seller: yup
        .string()
        .required('Seller is required'),
    product: yup
        .string()
        .required('Product is required'),
    productCount: yup
        .string()
        .required('Count is required'),
    status: yup
        .string()
        .required('Status is required'),
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
    }),
);

export type InvoiceStatus = "paid" | "partially" | "unpaid"

const InvoicePaymentStatus: InvoiceStatus[] = ["paid", "partially", "unpaid"]

export const InvoiceForm = () => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            client: '',
            seller: '',
            product: '',
            productCount: '',
            status: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
    });

    // const [client, setClient] = React.useState('');
    // const [seller, setSeller] = React.useState('');
    // const [product, setProduct] = React.useState('');
    // const [status, setStatus] = React.useState('');

    const clients = useSelector<AppRootStateType, ClientType[]>(state => state.clients)
    const sellers = useSelector<AppRootStateType, SellersType[]>(state => state.sellers)
    const products = sellers.filter(item => item.ID === formik.values.seller)

    // const clientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setClient(event.target.value);
    // };
    //
    // const sellerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSeller(event.target.value);
    // };
    //
    // const productChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setProduct(event.target.value);
    // };
    //
    // const statusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setStatus(event.target.value);
    // };
    //
    const [paymentDate, setPaymentDate] = React.useState<Date | null>(
        new Date(),
    );

    const [issueDate, setIssueDate] = React.useState<Date | null>(
        new Date(),
    );

    const paymentDateChange = (date: Date | null) => {
        setPaymentDate(date);
    };

    const issueDateChange = (date: Date | null) => {
        setIssueDate(date);
    };

    return (
        <Paper elevation={4} className={s.paper}>
            <form className={classes.root} onSubmit={formik.handleSubmit}>
                <TextField
                    id="client"
                    name="client"
                    select
                    label="Client"
                    value={formik.values.client}
                    onChange={formik.handleChange}
                    placeholder="Please select your Client"
                    variant="outlined"
                    className={s.input}
                    error={formik.touched.client && Boolean(formik.errors.client)}
                    helperText={formik.touched.client && formik.errors.client}
                >
                    {clients.map((option, idx) => (
                        <MenuItem key={idx} value={option.ID}>
                            {option.info.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="seller"
                    name="seller"
                    select
                    label="Seller"
                    value={formik.values.seller}
                    onChange={formik.handleChange}
                    placeholder="Please select your Seller"
                    variant="outlined"
                    className={s.input}
                    error={formik.touched.seller && Boolean(formik.errors.seller)}
                    helperText={formik.touched.seller && formik.errors.seller}
                >
                    {sellers.map((option, idx) => (
                        <MenuItem key={idx} value={option.ID}>
                            {option.info.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="product"
                    name="product"
                    select
                    label="Product"
                    value={formik.values.product}
                    onChange={formik.handleChange}
                    placeholder="Please select your Product"
                    variant="outlined"
                    className={s.input}
                    error={formik.touched.product && Boolean(formik.errors.product)}
                    helperText={formik.touched.product && formik.errors.product}
                >
                    {products[0]?.sellerProducts.map((option, idx) => (
                        <MenuItem key={idx} value={option.ID}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="productCount"
                    name="productCount"
                    type="number"
                    label="Product Count"
                    value={formik.values.productCount}
                    onChange={formik.handleChange}
                    placeholder="Please select count of products"
                    variant="outlined"
                    className={s.input}
                    error={formik.touched.productCount && Boolean(formik.errors.productCount)}
                    helperText={formik.touched.productCount && formik.errors.productCount}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="paymentDate"
                        name="paymentDate"
                        label="Choose payment date"
                        format="MM/dd/yyyy"
                        value={paymentDate}
                        onChange={paymentDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={s.input}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="issueDate"
                        name="issueDate"
                        label="Choose issue date"
                        format="MM/dd/yyyy"
                        value={issueDate}
                        onChange={issueDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={s.input}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    id="status"
                    name="status"
                    select
                    label="Status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    placeholder="Please select your Product"
                    variant="outlined"
                    className={s.input}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                >
                    {InvoicePaymentStatus.map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button color="primary" variant="contained" type="submit" className={s.btn}>
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

