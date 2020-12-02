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
import {changeAmount, deleteProduct, resetProducts} from "../../reducers/invoice-product-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {red} from "@material-ui/core/colors";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        width: '100%',
        overflow: 'auto',
        maxHeight: '90vh',
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
                        <TableCell><span style={{fontSize: '18px'}}>Name</span></TableCell>
                        <TableCell><span style={{fontSize: '18px'}}>Amount</span></TableCell>
                        {props.products.length > 0 && <TableCell align="right">
                            <Button variant="contained"
                                    color="secondary"
                                    onClick={() => dispatch(resetProducts())}
                            >
                                reset
                            </Button>
                        </TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products?.map((row) => (
                        <TableRow key={row.ID}>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold", fontSize: '16px'}}>{returnName(row.ID)}</span>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <span style={{fontWeight: "bold", fontSize: '16px'}}>
                                    <EditableSpan
                                        id={row.ID}
                                        value={row.amount}
                                        onChange={onChangeHandler}
                                    /></span>
                            </TableCell>
                            <TableCell component="th" scope="row" align={'right'}>
                                <DeleteForeverIcon
                                    style={{color: red[500], cursor: "pointer"}}
                                    onClick={() => deleteHandler(row.ID)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
