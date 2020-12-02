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
import {ClientType} from "../../reducers/client-reducer";
import {SellersType} from "../../reducers/sellers-reducer";
import {getInvoicesTC, InvoiceType} from "../../reducers/invoice-reducer";
import ProductModal from "../ProductModal/ProductModal";

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


export default function InvoicesTable() {

    const dispatch = useDispatch()

    const rows = useSelector<AppRootStateType, InvoiceType[]>(state => state.invoices)
    const clients = useSelector<AppRootStateType, ClientType[]>(state => state.clients)
    const sellers = useSelector<AppRootStateType, SellersType[]>(state => state.sellers)

    useEffect(() => {
        dispatch(getInvoicesTC())
    }, [])

    const findClientName = (id: string) => {
        let client = clients.find(item => item.ID === id)
        if (!client) {
            return
        } else {
            return client.info.name
        }
    }
    const findSellerName = (id: string) => {
        let seller = sellers.find(item => item.ID === id)
        if (!seller) {
            return
        } else {
            return seller.info.name
        }
    }

    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span style={{fontSize: '16px'}}>Invoice Number</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Client</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Seller</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>SellDate</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>PaymentDate</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>IssueDate</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Status</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>PriceNetto</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>priceBrutto</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Products</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>{row.numberFacture}</span>
                            </TableCell>

                            <TableCell align="right"
                                       style={{fontWeight: "bold"}}>
                                {findClientName(row.clientID)}
                            </TableCell>
                            <TableCell align="right">
                                <span
                                    style={{fontWeight: "bold", fontSize: '14px'}}>{findSellerName(row.sellerID)}</span>
                            </TableCell>
                            <TableCell align="right"
                                       style={{fontWeight: "bold"}}>
                                {new Date(parseInt(row.sellDate)).toDateString()}
                            </TableCell>
                            <TableCell align="right"> <span
                                style={{fontWeight: "bold"}}>{new Date(parseInt(row.paymentDate)).toDateString()}</span>
                            </TableCell>
                            <TableCell align="right"> <span
                                style={{fontWeight: "bold"}}>{new Date(parseInt(row.issueDate)).toDateString()}</span>
                            </TableCell>
                            <TableCell align="right"> <span style={{fontWeight: "bold"}}>{row.status}</span>
                            </TableCell>
                            <TableCell align="right"> <span style={{fontWeight: "bold"}}>{row.priceNetto}</span>
                            </TableCell>
                            <TableCell align="right"> <span style={{fontWeight: "bold"}}>{row.priceBrutto}</span>
                            </TableCell>
                            <TableCell align="right">
                                <ProductModal products={row.products}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
