import moment from 'moment'

export function toTableFormat(data, name) {
    const result = []
    data.forEach(element => {
        result.push([new Date(element.start_time).getTime(), element.value])
        result.push([new Date(element.end_time).getTime(), element.value])
    });


    return {
        series: [{
            name,
            data: result
        }],
        options: {
          chart: {
            id: 'area-datetime',
            type: 'area',
            zoom: {
              autoScaleYaxis: true
            }
          },
          dataLabels: {
            enabled: false
          },     
          markers: {
            size: 0,
            style: 'hollow',
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
        },
        
        selection: 'one_year',
      }
}


export function createColumns(data) {
    const tag_set = new Set()
    const mm_dma_set = new Set()
    data.forEach(({tag, mm_dma}) => {
        tag_set.add(tag)
        mm_dma_set.add(mm_dma)
    })
    return [
        {
            "field": "id",
            "hide": true
        },
        {
            "field": "uid",
            "headerName": "uid",
            "groupable": false,
            "aggregable": false,
            dataGeneratorUniquenessEnabled: true,
            width: 330
        },
        {
            "field": "tag",
            "headerName": "tag",
            type: "singleSelect",
            valueOptions: Array.from(tag_set),
            width: 150,
        },
        {
            "field": "site_id",
            "headerName": "site_id",
            "groupable": false,
            "aggregable": false,
            dataGeneratorUniquenessEnabled: true,
            width: 200,
            renderCell: (params) => (
                <a href={`https://${params.value}`} target="_blank">{params.value}</a>
              )
        },
        {
            "field": "time",
            "headerName": "time",
            type: "date",
            width: 200,
            valueFormatter: params => 
                moment(params?.value).format("DD/MM/YYYY hh:mm A"),
        },
        {
            "field": "mm_dma",
            "headerName": "mm_dma",
            type: "singleSelect",
            valueOptions: Array.from(mm_dma_set)
        },
    
    ]
}