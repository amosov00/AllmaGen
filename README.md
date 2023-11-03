# AllmaGen test task

### Deployment
| Frontend | Backend |
| ------ | ------ |
| http://n92650l3.beget.tech | https://fair-lime-bluefish-shoe.cyclic.app |

### Backend Features
- Simulating database queries
- The application does not contain an internal state, so scaling is possible using Kubernetis
- Available rest API for receiving data
- User input validation and error handling
- Developed an effective algorithm for calculating "EvPM" and "CTR" depending on the entered time period

### Frontend Features
- Сompetent use of ready-made UAI library
- Processing and logging errors of interaction with the backend
- Implemented drawing of graphs
- Ability to enter and load different time values for CTR и EvPM
- Ability to select a tag in the selector for the EvPM chart
- Implemented a label with which you can see the exact date and immediately hover over the griffac
- Implemented routing between different sections of the application
- For both tables and charts I made a beautiful blur and an amazing loader that appear while loading data
- Blocking buttons (user input) during loading
- Made a table that displays all actions performed by the user
- combined tags with "v" and without "v" into a single whole
- Made it possible to filter the table by all possible parameters
- Implemented the ability to calculate parameters "Impressions", "CTR" and "EvPM" based on selected rows in the table (based on the selected parameter in the top right of the table)
- Made links in the table clickable


### Tech stack

- [React.js]
- [React-router-dom]
- [MUI]
- [Axios]
- [Moment]
- [Node.js]
- [Express]
- [JOI]
- [Classnames]


### Instructions for local launch

1. Download [this files](https://drive.google.com/file/d/1gydaF1Ab9lIeFVxQEHi-3RGF-eRAgdLX/view)
2. Copy these two files to a folder ``/backend/tables``
3. Install dependencies and run backend
```sh
cd backend
npm i
node run backend
```
4. Install dependencies and run frontend
```sh
cd frontend
npm i
node run frontend
```

### Backend API documentation

<details>
  <summary><code>GET</code> <code><b>/table</b></code> <code>(Shows all actions of unique users)</code></summary>

##### Parameters

> None

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | JSON                                                         |
> | `404`         | `application/json`                | `{"code":"404","message":"Error message"}`                            |


</details>


<details>
  <summary><code>GET</code> <code><b>/chart</b></code> <code>(takes a specific user action and time period and returns an array of objects. Each object contains an index value for a certain period)</code></summary>

##### Parameters

> | name   |  type      | data type      | description                                                  |
> |--------|------------|----------------|--------------------------------------------------------------|
> | `minutes` |  required  | string, number         | The specific proxy config unique idendifier                  |
> | `event` |  required  | 'content', 'registration', 'fclick', 'lead', 'signup', 'misc'        | The specific proxy config unique idendifier                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `text/plain;charset=UTF-8`        | JSON                                                        |
> | `404`         | `application/json`                | `{"code":"404","message":"Error message"}`                            |


</details>
