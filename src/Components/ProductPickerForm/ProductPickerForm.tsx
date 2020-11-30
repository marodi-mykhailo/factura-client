import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ProductType} from "../../reducers/products-reducer";
import {Button, TextField} from "@material-ui/core";
import {array} from "yup";
import {SellersType} from "../../reducers/sellers-reducer";
import {useDispatch} from "react-redux";
import {changeAmount, deleteProduct} from "../../reducers/invoice-product-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
    paper: {
        maxWidth: 650,
        width: '100%',
        overflow: 'auto',
        maxHeight: '90vh'
    }
});

type ProductPropsType = {
    products: Array<{ ID: string, amount: string }>
    allProducts: ProductType[] | undefined
}


export default function ProductPickerForm(props: ProductPropsType) {
    const classes = useStyles();
    const dispatch = useDispatch()

    const returnName = (id: string) => {
        const product = props.allProducts?.find(item => item.ID === id)
        return product?.name
    }

    const deleteHandler = (id: string) => {
        dispatch(deleteProduct(id))
    }
    const onChangeHandler = (id: string, newValue: string) => {
        dispatch(changeAmount(id, newValue))
    }


    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><span style={{fontSize: '16px'}}>Name</span></TableCell>
                        <TableCell><span style={{fontSize: '16px'}}>Amount</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products?.map((row) => (
                        <TableRow key={row.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>{returnName(row.ID)}</span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold"}}>
                                    <EditableSpan
                                        id={row.ID}
                                        value={row.amount}
                                        onChange={onChangeHandler}
                                    /></span>
                                <Button onClick={() => deleteHandler(row.ID)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
