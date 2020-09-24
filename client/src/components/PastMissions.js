import React, { Component, useEffect, useState, useMemo, forwardRef } from 'react'
import { useHistory } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table"; 
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import { TablePagination, TableRow, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



 
const tableIcons = {
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
};

const themeTable = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                "&&:hover": {
                    backgroundColor: 'rgba(250, 250, 250, 0.2)', 
                }, 
            } 
        },
        MuiTableHead: {
            root: {
                "&&:hover": {
                    backgroundColor: 'none', 
                }, 
            } 
        },
        MuiTableFooter: {
            root: {
                backgroundColor: 'none', 
            } 
        },
}
    
});


const useStyles = makeStyles({
    root: {
        color: 'whitesmoke', 
        '& tr': {
            backgroundColor: 'orange',
        },
    },
    selectIcon: {
        color: 'black', 
    },
    input: {
        color: 'black', 
        backgroundColor: "whitesmoke", 
    },
    actions: {
        color: "whitesmoke"
    },
    
    searchRoot: {
        padding: '0',
        '& div.MTableToolbar-spacer-13': {
            display: 'none',
        },

        '& div.MTableToolbar-actions-14': {
            color: 'whitesmoke',
            marginTop: '17px',
            marginLeft: '10px',
        },
    },

    searchField: {
        padding: '0',
        borderBottom: '1px solid whitesmoke',
        color: 'whitesmoke',
        //backgroundColor: 'black',
        '& div': {
            color: 'whitesmoke',
        },
        '& button': {
            color: 'whitesmoke'
        }
    }
});
  

const PastMissions = props => {
    const history = useHistory();
    const [result, setResult] = useState(null);
    const classes = useStyles();
  

    useEffect(() => {
      async function fetchData() {
        try {
            const resp = await axios.post('/api/launches/past').then(response => {
                console.log(response)
                return response
            })

            let launches = resp.data.docs

            let mapped = launches.map(e => { 
                let now = new Date(e.date_local);
                let date = now.toLocaleString();
                return {
                    patch: e.links.patch.small,
                    name: e.name,
                    launchDate: now,
                    success: e.success,
                    details: e.details ? e.details : "No details provided.",
                    rocket: e.rocket.name,
                    payloads: e.payloads,
                    id: e.id,
                    flightNo: e.flight_number,
                }
            })
            setResult(mapped);
        } catch (error) {
            console.error(error);
        }
      }
      fetchData();
    },[]);
    
    const handleRowClick = (event, rowData) => {
        console.log(event, rowData)
        history.push(`/launches/${rowData.flightNo}`)
    };

    return(
        <section className="past-missions-section">
            <h1 className="section-title">Past Launches</h1>

            <div id="past-mission-table-container">
                <MuiThemeProvider theme={themeTable}>
                <MaterialTable
                style={{width: '100%', backgroundColor: "#121315", color: "whitesmoke"}}
                icons={tableIcons}
                stickyHeader={true}
                onRowClick={handleRowClick}
                options={{
                    paging: true,
                    exportButton: true,
                    headerStyle: {backgroundColor: "whitesmoke", fontSize: "1em", fontWeight: '500'},               
                }}
                columns={[
                    { title: "Patch", field: "patch", sorting: false, render: rowData => {
                        return ( rowData.patch 
                            ? <img src={rowData.patch} style={{width: 40, borderRadius: '50%'}}/>
                            : <img src="/spacex_patch_small.jpg" style={{width: 40, height: 45, borderRadius: '50%'}}/> 
                        )
                    }},
                    { title: "Name", field: "name" },
                    { title: "Rocket", field: "rocket" },
                    { title: "Payloads", field: "payloads", render: rowData => {
                        return rowData.payloads.map(p => <p key={p.id}>{p.name}</p>)
                    }},
                    { title: "Launch Date", field: "launchDate", type: 'datetime', defaultSort: 'desc'},
                    { title: "Success", field: "success", cellStyle: (e, rowData) => {
                        return (rowData.success) ? { color: "green" } : { color: "red" }
                    }},
                    /* { title: "Details", field: "details", sorting: false, headerStyle: {minWidth: 400}, cellStyle: {minWidth: 500} }, */ 
                ]}
                data={result ? result : []}
                title=""
                components={{
                    Toolbar: props => {
                        let propsCopy = { ...props };
                        // Hide default title
                        propsCopy.showTitle = false;
                        propsCopy.disableGutters=true;
                        propsCopy.classes= {root: classes.searchRoot, searchField: classes.searchField};
                        return (
                            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                              <MTableToolbar {...propsCopy} />
                            </div>
                        );
                    },
                    /* Row: props => <TableRow classes={{ root: classes.rowRoot, hover: classes.rowHover }} />, */

                    Pagination: props => (
                      <TablePagination
                        /* {...props} */
                        /* labelRowsPerPage={<div>{props.labelRowsPerPage}</div>}
                        labelDisplayedRows={row => <div>{props.labelDisplayedRows(row)}</div>} */
                        component="div"
                        colSpan={props.colSpan}
                        count={props.count}
                        rowsPerPageOptions={[1, 5, 10, 25]}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        onChangePage={props.onChangePage}
                        onChangeRowsPerPage={props.onChangeRowsPerPage}
                        classes={{root: classes.root, selectIcon: classes.selectIcon, input: classes.input, actions: classes.actions}}
                      />
                    )          
                  }}
                
                  localization={{ body:{ emptyDataSourceMessage:<h1 style={{color: 'whitesmoke', textAlign:'center'}}>No records to display</h1> } }}
                />
                </MuiThemeProvider>
            </div>
        </section>
    )
}


export default PastMissions
