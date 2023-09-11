import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { useParams } from 'react-router';

export default function PaperInfo() {
    const [allStocks, setAllStocks] = useState([])
    const { paperID } = useParams()

    const handleFindStocks = async () => {
        try {
            const rawAllStock = await fetch("https://localhost:7159/api/Papers/GetFindStocks", {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                method: "GET",
            })
            const jsonAllStock = await rawAllStock.json()
            setAllStocks(jsonAllStock.filter((row) => (row.id == paperID)))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const idTimer = setInterval(handleFindStocks, 1000)

        return () => {
            clearInterval(idTimer)
        }
    }, [])

    return (
        <TableContainer component={Paper} sx={{ width: 200, height: 620 }}>
            <h1 style={{padding: "10px", fontSize: "18px"}}>Paper Details</h1>
            <Table sx={{ minWidth: 200, maxWidth: 200 }} aria-label="simple table">
                <TableBody>
                    {allStocks.map((row) => (
                        <React.Fragment key={row.id}>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Room Name
                                </TableCell>
                                <TableCell>{row.roomName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Rack Number
                                </TableCell>
                                <TableCell>{row.rackNum}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Brand
                                </TableCell>
                                <TableCell>{row.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Size
                                </TableCell>
                                <TableCell>{row.size}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Weight
                                </TableCell>
                                <TableCell>{row.weight}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Finish
                                </TableCell>
                                <TableCell>{row.finish}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Type
                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    QOH
                                </TableCell>
                                <TableCell>{row.qoh}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Bound In
                                </TableCell>
                                <TableCell>{row.boundIn}</TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}