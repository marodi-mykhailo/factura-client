import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {SellerProduct} from "../reducers/sellers-reducer";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

type ProductPropsType ={
    products: SellerProduct[]
}


export default function ProductTable(props: ProductPropsType) {
    const classes = useStyles();
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products.map((row) => (
                        <TableRow key={row.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>{row.name}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{row.price}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{row.unit}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{row.currency}</span>
                            </TableCell>
                            <TableCell align="right">
                                <span style={{fontWeight: "bold"}}>{row.tax}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
