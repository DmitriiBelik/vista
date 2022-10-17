import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import {patientInfoFetched} from '../redux/MainSlice'

export default function BasicTable({status, data}) {
    const dispatch = useDispatch()
    const {presentList, quittingList, patientInfo} = useSelector(state => state.main)
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const contentFilling = (historyNum, element) => {
        let patient;
        if (status === 'presentList') {
            patient = presentList.find(patient => patient.historyNumber === historyNum)
        } else {
            patient = quittingList.find(patient => patient.historyNumber === historyNum)
        }
        const dateArr = patient.birthDate.split('-'),
              birthDate = new Date(dateArr[0], dateArr[1], dateArr[2]),
              dobnow = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today < dobnow) {
            age = age-1;
        }
        const patientInfo = {
            fullName: `${patient.firstName} ${patient.lastName} ${patient.patrName}`,
            age: age,
            diagnosis: patient.diagnosis
        }
        dispatch(patientInfoFetched(patientInfo))
        const elements = document.querySelectorAll('.MuiTableRow-root')
        elements.forEach(el => {
            el.classList.remove('active')
        })
        console.dir(element)
        element.parentNode.classList.add('active')
    }

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table"     >
            <TableHead>
                <TableRow>
                <TableCell>№ ИБ</TableCell>
                <TableCell align="right">ФИО</TableCell>
                <TableCell align="right">{status==='presentList'? 'Палата' : 'Причина выбытия'}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                <TableRow
                    key={row.historyNumber}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={(e)=> contentFilling(row.historyNumber, e.target)}
                >
                    <TableCell component="th" scope="row">
                    {row.historyNumber}
                    </TableCell>
                    <TableCell align="right">{`${row.firstName} ${row.lastName} ${row.patrName}`}</TableCell>
                    <TableCell align="right">{status==='presentList'? row.bedNumber : row.cause}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}
