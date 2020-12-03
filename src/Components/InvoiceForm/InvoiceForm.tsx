import React, {useEffect} from 'react';
import 'date-fns';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Backdrop, createStyles, Fade, makeStyles, MenuItem, Modal, Paper, Theme} from "@material-ui/core";
import s from './InvoiceForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ClientType, getClientsTC} from "../../reducers/client-reducer";
import {getSellersTC, SellersType} from "../../reducers/sellers-reducer";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {createInvoiceTC} from "../../reducers/invoice-reducer";
import ProductPickerForm from "../ProductPickerForm/ProductPickerForm";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {addProduct, InvoiceProductType, resetProducts} from "../../reducers/invoice-product-reducer";


export const isObjEqual = (obj1: { ID: string, amount: string }, obj2: { ID: string, amount: string }) => {
    return !(obj1.ID === obj2.ID && obj1.amount === obj2.amount);
}

const validationSchema = yup.object({
    client: yup
        .string()
        .required('Client is required'),
    seller: yup
        .string()
        .required('Seller is required'),
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
            width: '100%',
            overflow: 'auto',
            maxHeight: '90vh'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2),
            margin: theme.spacing(2),
        },
        product: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: "80%",
            margin: "10px auto",
            padding: "20px 0"
        },
        h1: {
            ...theme.typography.button,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
        },
        btnWrapp: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '60%'
        }
    }),
);

export type InvoiceStatus = "paid" | "partially" | "unpaid"

const InvoicePaymentStatus: InvoiceStatus[] = ["paid", "partially", "unpaid"]

export const InvoiceForm = () => {
    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        return () => {
            dispatch(resetProducts())
        }
    }, [])

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
            let newInvoice = {
                clientID: formik.values.client,
                sellerID: formik.values.seller,
                products: invoiceProductArr,
                sellDate: sellMilliseconds,
                paymentDate: paymentMilliseconds,
                issueDate: issueMilliseconds,
                status: formik.values.status
            }
            dispatch(createInvoiceTC(newInvoice))
            formik.resetForm({
                values: {
                    client: '',
                    seller: '',
                    product: '',
                    productCount: '',
                    status: ''
                }
            })
        },
    });

    const clients = useSelector<AppRootStateType, ClientType[]>(state => state.clients)
    const sellers = useSelector<AppRootStateType, SellersType[]>(state => state.sellers)
    const [modal, setModalOpen] = React.useState(false);

    const products = sellers.find(item => item.ID === formik.values.seller)

    const invoiceProductArr = useSelector<AppRootStateType, InvoiceProductType[]>(state => state.invoiceProducts)

    const addItemsArr = () => {
        const obj = {
            ID: formik.values.product,
            amount: formik.values.productCount
        }
        formik.resetForm({
            values: {
                client: formik.values.client,
                seller: formik.values.seller,
                product: '',
                productCount: '',
                status: formik.values.status
            }
        })
        dispatch(addProduct(obj))
    }

    const modalOpen = () => {
        setModalOpen(true);
    };

    const modalClose = () => {
        setModalOpen(false);
    };

    const [sellDate, setSellDate] = React.useState<Date | null>(
        new Date(),
    );

    const [paymentDate, setPaymentDate] = React.useState<Date | null>(
        new Date(),
    );


    const [issueDate, setIssueDate] = React.useState<Date | null>(
        new Date(),
    );

    const sellMilliseconds = issueDate && issueDate.getTime()
    const paymentMilliseconds = paymentDate && paymentDate.getTime()
    const issueMilliseconds = issueDate && issueDate.getTime()

    const sellDateChange = (date: Date | null) => {
        setSellDate(date);
    };

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
                <Paper elevation={4} className={classes.product}>
                    <h1 className={classes.h1}>Product</h1>
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
                        disabled={!formik.values.seller}
                        error={formik.touched.product && Boolean(formik.errors.product)}
                        helperText={formik.touched.product && formik.errors.product}
                    >
                        {products?.sellerProducts.map((option, idx) => (
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
                    <div className={classes.btnWrapp}>
                        <Button variant="contained"
                                color="primary"
                                size="large"
                                onClick={addItemsArr}
                                disabled={!formik.values.product || !formik.values.productCount}
                        >
                            Add to list
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<PlaylistAddCheckIcon/>}
                            onClick={modalOpen}
                            disabled={invoiceProductArr.length === 0}
                        >
                            List of Products
                        </Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={modal}
                            onClose={modalClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={modal}>
                                <ProductPickerForm products={invoiceProductArr} allProducts={products?.sellerProducts}/>
                            </Fade>
                        </Modal>
                    </div>
                </Paper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="sellDate"
                        name="sellDate"
                        label="Choose sell date"
                        format="MM/dd/yyyy"
                        value={sellDate}
                        onChange={sellDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={s.input}
                    />
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
                <Button color="primary" disabled={invoiceProductArr.length === 0} variant="contained" type="submit"
                        className={s.btn}>
                    Submit
                </Button>
            </form>
        </Paper>
    )
        ;
};

