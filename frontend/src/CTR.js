import Paper from '@mui/material/Paper';
import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {toTableFormat} from './utils.js'
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classNames from 'classnames'

export function CTR() {
    const [tableData, setTableData] = useState(toTableFormat([0, 0]))
    const [loading, setLoading] = useState(true)
    const [minutes, setMinutes] = useState(60)

    function clearData() {
        setTableData(toTableFormat([0, 0]))
    }

    async function getChart() {
        try {
            setLoading(true)
            clearData()
            const {data} = await axios.get(`http://localhost:3000/chart`, {
                params: {minutes, event: 'fclick'}
            })
            const formatedData = toTableFormat(data, 'CTR')
            setTableData(formatedData)
        } catch (e) {
            throw new Error(e)
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
                <Button variant="contained" disabled={loading} onClick={getChart}>Load</Button>
            </Paper>
        </>
    )
}