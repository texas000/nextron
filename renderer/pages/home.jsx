import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, MenuItem } from "@blueprintjs/core";
import { Column, Table, Cell, CopyCellsMenuItem } from "@blueprintjs/table";
import '@blueprintjs/table/lib/css/table.css';
import "@blueprintjs/core/lib/css/blueprint.css";

const Home = () => {
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState(false);

  React.useEffect(()=> {
    initalData();
  }, [])
  
  const initalData = async () => {
    const fetchSearch = await fetch(`https://jsonplaceholder.typicode.com/users`);
    if(fetchSearch.status) {
      const Search = await fetchSearch.json();
      setResult(Search)
    }
  }

  const getData = async (s) => {
    const fetchSearch = await fetch(`https://jsonplaceholder.typicode.com/users/${s}`);
    if(fetchSearch.status) {
      const Search = await fetchSearch.json();
      setResult([Search])
    }
  }
  const RenderMenu = (context) => {
    return(
      <Menu>
        <MenuItem icon="calculator" text="COPY" onClick={()=>console.log(result[context.target.rows[0]].company.name)} />
        <MenuItem icon="calculator" text="PASTE" onClick={()=>console.log(context.target)} />
        <MenuItem icon="calculator" text="CUT" onClick={()=>console.log(context.target)} />
      </Menu>
    )
  }
  return (
    <React.Fragment>
      <Head>
        <title>SAMPLE WINDOW APP</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"/>

        
        <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
        <link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />
        <link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />

        <script src="https://unpkg.com/classnames@^2.2"></script> 
        <script src="https://unpkg.com/dom4@^1.8"></script> 
        <script src="https://unpkg.com/tslib@^1.9.0"></script> 
        <script src="https://unpkg.com/react@^16.2.0/umd/react.production.min.js"></script> 
        <script src="https://unpkg.com/react-dom@^16.2.0/umd/react-dom.production.min.js"></script> 
        <script src="https://unpkg.com/react-transition-group@^2.2.1/dist/react-transition-group.min.js"></script> 
        <script src="https://unpkg.com/popper.js@^1.14.1/dist/umd/popper.js"></script> 
        <script src="https://unpkg.com/react-popper@^1.0.0/dist/index.umd.min.js"></script> 
        <script src="https://unpkg.com/resize-observer-polyfill@^1.5.0"></script> 
        <script src="https://unpkg.com/@blueprintjs/icons@^3.4.0"></script> 
        <script src="https://unpkg.com/@blueprintjs/core@^3.10.0"></script> 
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossOrigin="anonymous"></script>
      </Head>
      <div className="container">
        <h1 className="text-center">Hello World</h1>
        <div className="row">
          <div className="card">
            <div className="card-header">
              SEARCH YOUR REFERNECE
            </div>
            <div className="card-body">
            <input onChange={e=>setSearch(e.target.value)}/>
            <button className="btn btn-primary btn-sm ml-4" onClick={()=>{
              getData(search)
            }}>Search</button>
            </div>
          </div>
        </div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
        {result &&<Table numRows={result.length} bodyContextMenuRenderer={RenderMenu} onSelection={(e)=>console.log(e)}>
            <Column name="Name" cellRenderer={(index)=>(<Cell intent="primary">{result[index].name}</Cell>)}/>
            <Column name="User" cellRenderer={(index)=>(<Cell>{result[index].username}</Cell>)}/>
            <Column name="Email" cellRenderer={(index)=>(<Cell>{result[index].email}</Cell>)}/>
            <Column name="Phone" cellRenderer={(index)=>(<Cell>{result[index].phone}</Cell>)}/>
            <Column name="Company" cellRenderer={(index)=>(<Cell>{result[index].company.name}</Cell>)}/>
            <Column name="Suite" cellRenderer={(index)=>(<Cell>{result[index].address.suite}</Cell>)}/>
            <Column name="Street" cellRenderer={(index)=>(<Cell>{result[index].address.street}</Cell>)}/>
            <Column name="City" cellRenderer={(index)=>(<Cell>{result[index].address.city}</Cell>)}/>
            </Table>}
      </div>
      <style jsx>
        {`
          * {
            font-family: 'Open Sans', sans-serif;
        `}
      </style>
    </React.Fragment>
  );
};

export default Home;
