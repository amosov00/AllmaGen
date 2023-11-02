import Paper from '@mui/material/Paper';
import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toTableFormat} from '../utils.js'
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'classnames'
import { useAlert } from "react-alert";

export function EvPM() {
    const [tableData, setTableData] = useState(toTableFormat([0, 0]))
    const [loading, setLoading] = useState(true)
    const [minutes, setMinutes] = useState(60)
    const [event, setEvent] = useState('content')
    const alert = useAlert();

    function clearData() {
        setTableData(toTableFormat([0, 0]))
    }

    async function getChart() {
        try {
            setLoading(true)
            clearData()
            const {data} = await axios.get(`http://localhost:3000/chart`, {
                params: {minutes, event}
            })
            const formatedData = toTableFormat(data, 'EvPM')
            setTableData(formatedData)
        } catch (e) {
            alert.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getChart()
    }, [])


    return (
        <>
            <Paper className='ctr'>
                {
                    loading && <div className='chart-progress'>
                        <CircularProgress size={155}/>
                    </div>
                }
                <Chart height='600px' className={classNames({'blur': loading})} options={tableData.options} series={tableData.series} type="area" />
            </Paper>

            <Paper sx={{ p: 5, mt: 5 }} className='form'>
                <TextField
                    id="outlined-number"
                    label="Minutes"
                    type="number"
                    fullWidth="100%"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={minutes}
                    onInput={(e) => setMinutes(e.target.value)}
                    sx={{mr: 2 }}
                    disabled={loading}
                />
                  <Select
                    sx={{mr: 2 }}
                    value={event}
                    defaultValue={event}
                    onChange={(e) => setEvent(e.target.value)}
                    disabled={loading}
                >
                    <MenuItem value={'content'}>content</MenuItem>
                    <MenuItem value={'registration'}>registration</MenuItem>
                    <MenuItem value={'lead'}>lead</MenuItem>
                    <MenuItem value={'signup'}>signup</MenuItem>
                    <MenuItem value={'misc'}>misc</MenuItem>
                </Select>
                <Button variant="contained" disabled={loading} onClick={getChart}>Load</Button>
            </Paper>
        </>
    )
}