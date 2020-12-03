import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {ClientType, getClientsTC} from "../../reducers/client-reducer";
import {getSellersTC, SellersType} from "../../reducers/sellers-reducer";
import {Backdrop, Button, CircularProgress, Fade, Modal} from "@material-ui/core";
import ClientsTable from "../ClientsTable/ClientsTable";
import ProductTable from "../../ProductTable/ProductTable";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme: Theme) => createStyles({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function SellersTable() {
    const dispatch = useDispatch()
    const classes = useStyles();

    const rows = useSelector<AppRootStateType, SellersType[]>(state => state.sellers)
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(getSellersTC())
    }, [])
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span style={{fontSize: '16px'}}>Name</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Contacts</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Bill</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Address</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Company</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Products</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.info.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>{row.info.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <div>
                                    <div> Email: <span
                                        style={{fontWeight: "bold", fontSize: '14px'}}>{row.info.email}</span></div>
                                    <div> Phone: <span
                                        style={{fontWeight: "bold", fontSize: '14px'}}>{row.info.phone}</span></div>
                                    <div> Tax: <span
                                        style={{fontWeight: "bold", fontSize: '14px'}}>{row.info.numberTax}</span></div>
                                </div>
                            </TableCell>
                            <TableCell align="right"
                                       style={{fontWeight: "bold"}}>{row.info.bill} {row.info.currency}</TableCell>
                            <TableCell align="right">
                                <div>
                                    <div> Country: <span
                                        style={{fontWeight: "bold"}}>{row.address.map(item => item.country)}</span>
                                    </div>
                                    <div> City: <span
                                        style={{fontWeight: "bold"}}>{row.address.map(item => item.city)}</span>
                                    </div>
                                    <div> Street: <span
                                        style={{fontWeight: "bold"}}>{row.address.map(item => item.street)}</span>
                                    </div>
                                    <div> PostalCode: <span
                                        style={{fontWeight: "bold"}}>{row.address.map(item => item.postalCode)}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="right"> <span style={{fontWeight: "bold"}}>{row.company.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <ShoppingBasketIcon fontSize={"large"} style={{cursor: "pointer"}} color="primary" onClick={handleOpen}/>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <div className={classes.paper}>
                                            <ProductTable products={row.sellerProducts}/>
                                        </div>
                                    </Fade>
                                </Modal>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
