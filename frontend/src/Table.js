import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import {createColumns} from './utils.js'
import classNames from 'classnames'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function getCustomToolbar(data, fn, event, setEvent) {
    return CustomToolbar.bind(this, data.length, fn, event, setEvent)
}
function CustomToolbar(data, fn, event, setEvent) {
    return (
      <GridToolbarContainer>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <GridToolbarFilterButton variant="outlined" />
                <Select
                    value={event}
                    defaultValue={event}
                    onChange={(e) => setEvent(e.target.value)}
                    sx={{mr: 2 }}
            >
                    <MenuItem value={'content'}>content</MenuItem>
                    <MenuItem value={'registration'}>registration</MenuItem>
                    <MenuItem value={'lead'}>lead</MenuItem>
                    <MenuItem value={'signup'}>signup</MenuItem>
                    <MenuItem value={'misc'}>misc</MenuItem>
                    <MenuItem value={'fclick'}>fclick</MenuItem>
            </Select>
            </div>
            <Button variant="outlined" onClick={fn} disabled={data === 0}>Calculate</Button>
        </div>
      </GridToolbarContainer>
    );
  }

export function Table() {
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedItems, setSelectedItems] = useState([])
    const [columns, setColumns] = useState([])
    const [result, setResult] = useState({})
    const [event, setEvent] = useState('content')

    function countUnique(iterable) {
        return new Set(iterable).size;
    }


    function calc() {
        const impression_count = countUnique(selectedItems.map((item) => item.uid))
        const event_count = selectedItems.filter((item) => event === item.tag).length
        const coefficient = 'fclick' === event ? 100 : 1000
        setResult({
            value: Math.round(coefficient * (event_count / impression_count)),
            impressions: impression_count,
            event 
        })
    }


    async function getChart() {
        try {
            setLoading(true)
            const {data} = await axios.get(`http://localhost:3000/table`)
            console.log(data)
            setTableData(data.map((item) => ({
                ...item,
                time: new Date(item.time.replace('000Z', '000'))
            })))
            setColumns(createColumns(data))
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
            <div className='ctr'>
                {
                    loading && <div className='chart-progress'>
                        <CircularProgress size={155}/>
                    </div>
                }
                <Paper style={{ height: 600, width: '100%' }} className={classNames({'blur': loading})}>
                    <DataGrid 
                        onRowSelectionModelChange={(ids) => setSelectedItems(ids.map((id) => tableData[id]))}
                        checkboxSelection 
                        disableRowSelectionOnClick 
                        columns={columns} 
                        rows={tableData} 
                        slots={{ toolbar: getCustomToolbar(selectedItems, calc, event, setEvent) }}
                    />
                </Paper>
            </div>

            <Paper sx={{ p: 5, mt: 5 }} className='form result'>
                {
                    result.impressions && <div className='result'>
                        <Typography variant="h4" component="h4">
                            impressions: {result.impressions}
                        </Typography>
                        <Typography variant="h4" component="h4">
                            {result.event === 'fclick' ? 'CTR' : 'EvPM'}: {result.value}
                        </Typography>
                    </div>
                }
            </Paper>
        </>
    )
}