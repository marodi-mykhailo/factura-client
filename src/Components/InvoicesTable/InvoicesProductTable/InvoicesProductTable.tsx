import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ProductType} from "../../../reducers/products-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

type ProductPropsType = {
    products: { ID: string, amount: string }[]
}


export default function InvoicesProductTable(props: ProductPropsType) {
    const classes = useStyles();
    const productsAll = useSelector<AppRootStateType, ProductType[]>(state => state.products)
    const findProduct = (id: string) => {
        let product = productsAll.find(item => item.ID === id)
        if (!product) {
            return
        } else {
            return product
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span style={{fontSize: '16px'}}>Name</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Price</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Unit</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Currency</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Tax</span></TableCell>
                        <TableCell align="right"><span style={{fontSize: '16px'}}>Amount</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products.map((row) => (
                        <TableRow key={row.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>{findProduct(row.ID)?.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{findProduct(row.ID)?.price}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{findProduct(row.ID)?.unit}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{findProduct(row.ID)?.currency}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{findProduct(row.ID)?.tax}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{row.amount}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
