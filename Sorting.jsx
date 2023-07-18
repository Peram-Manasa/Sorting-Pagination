import React, { useEffect, useState } from 'react'
import '../Sorting-Pagination/sorting.css';
import {AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";


export const Sorting = () => {
    const[data, setData] = useState([]);
    //step-4
    const[searchPhrase, setSearchPhrase]= useState(" ");
    //step-5
    const[sorted, setSorted] = useState({sorted:"id",reversed:false} );
    //step-7
    const[currentpage, setCurrentpage] = useState(1);
    const PrestPage = 10;
    const lastIndex = currentpage* PrestPage;
    const firstIndex = lastIndex- PrestPage;
    const records = data.slice(firstIndex, lastIndex);
    const npages = Math.ceil(data.length/PrestPage);
    const numbers = [...Array(npages+1).keys()].slice(1)

//step-3
    const Handler = (e)=>{
        e.preventDefault();
        const finalResult = data.filter((t)=>(t.title.toLowerCase().includes(e.target.value.toLowerCase())) )
        setData(finalResult)
        setSearchPhrase(e.target.value);
    }
    //step-6
    const sortedById = ()=>{
        setSorted({sorted:"id", reversed:! sorted.reversed})
        const userdata = [...data];
        userdata.sort((usera, userb)=>{
            if(sorted.reversed){
                return userb.id-usera.id
            }
            return usera.id-userb.id
        }) 
        setData(userdata)  
    }

    const render = ()=>{
        if(sorted.reversed){
            return <AiOutlineArrowUp/>
        }
        return <AiOutlineArrowDown/>
    }

    //step-1
    
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos').then((res)=>res.json().then((json)=>setData(json)))
    },[])

    const sortByTitle = ()=>{
        setSorted({sorted:"title", reversed:!sorted.reversed})
        const userData = [...data];
        userData.sort((usera, userb) =>{
            if(sorted.reversed){
                return (userb.title).localeCompare(usera.title);
            }
            return (usera.title).localeCompare(userb.title)
        })
        setData(userData);
    }
    //step-8
    const prePage = () =>{
        if(currentpage!==1){
            setCurrentpage(currentpage-1)
        }
    }
    //step-9
    const correntPage = (e)=>{
        setCurrentpage(e);
    }
    //step-10
    const nextPage = ()=>{
        if(currentpage!==npages){
            setCurrentpage(currentpage+1)
        }
    }



  return (
    <>

   <div className="app">
    <div className="search-container">
        <input type="text" value={searchPhrase} onChange={Handler} />
    </div>
    <div className="main-container">
      <table>
        <thead>
            <tr>
                <th onClick={sortedById}><span>ID</span> {sorted.sorted=== "id"? render():null}</th>
                <th onClick={sortByTitle
                }><span>Title</span> {sorted.sorted==="title"? render():null}</th>
            </tr>
        </thead>
        <tbody>
            {
                records.map((x,i)=><tr key={i}>
                    <td>{x.id}</td>
                    <td>{x.title}</td>
                </tr>)
            }
        </tbody>
      </table>

    </div>
    <nav className="pagination">
        <ul>
            <li>
                <a href="#" onClick={prePage}>Prevoies page</a>
            </li>
            {
                numbers.map((x,y)=>(
                    <li className={`${currentpage=== x ? 'active' : null}`} key={y}>
                        <a href="#" onClick={()=> correntPage(x)}>{x}</a>

                    </li>
                ))
            }
            <li>
                <a href="#" onClick={nextPage}>nextPage</a>
            </li>
        </ul>
    </nav>
   </div>
    </>
  )
}

// import React, { useEffect, useState } from 'react';
// import {AiOutlineArrowUp,AiOutlineArrowDown } from "react-icons/ai";

// export const Sorting = () => {
//     const [data, setData] = useState([]);
//     const[searchPhrase, setSearchPhrase]= useState(" ");
//     const[sorted, setSorted] = useState({sorted:"id", reversed:false});
//     const[currentpage, setCurrentpage]= useState(0);
//     const PresentPage = 4;
//     const lastIndex = currentpage* PresentPage;
//     const firstIndex= lastIndex-PresentPage;
//     const records = data.slice(firstIndex, lastIndex);
//     const noofPages = Math.ceil(data.length/PresentPage);
//     const numbers = [...Array(noofPages+1).keys()].slice(1);


//     const PreviousPage= ()=>{
//         if(currentpage!==1){
//             setCurrentpage(currentpage-1)
//         }
//     }
//     const correntPage= (e)=>{
//         setCurrentpage(e)
//     }

//     const lastPage = ()=>{
//         if(currentpage!==noofPages){
//             setCurrentpage(currentpage+1);
//         }
//     }

//     useEffect(()=>{
//         fetch('https://jsonplaceholder.typicode.com/todos').then((res)=>res.json().then((json)=>setData(json)))
//         console.log(data);
//     })

//     const handler = (e)=>{
//         e.preventDefault();
//         const finalresult = data.filter((x)=>x.title.toLowerCase().includes(e.target.value.toLowerCase()))
//         setData(finalresult);
//         setSearchPhrase(e.target.value)
//     }

//      const sortById = ()=>{
//         setSorted({sorted:"id", reversed:! sorted.reversed});
//         const totaldata = [...data];
//         totaldata.sort((a,b)=>{
//             if(sorted.reversed){
//                 return b.id- a.id
//             }
//             return a.id- b.id
//         })
//         setData(totaldata) 
        
//      }

//      const render = ()=>{
//         if(sorted.reversed){
//             return <AiOutlineArrowUp/>
//         }
//         return <AiOutlineArrowDown/>
//      }

//      const sortByTitle = ()=>{
//         setSorted({sorted:"title", reversed:! sorted.reversed});
//         const totaldata = [...data];
//         totaldata.sort((a,b)=>{
//             if(sorted.reversed){
//                 return (b.title).localeCompare(a.title);
//             }
//             return (a.title).localeCompare(b.title)
//         })
//         setData(totaldata)
//      }



    
//   return (
//     <>
//     <div>
//         <div>
//             <input type="text"   value={searchPhrase} onChange={handler}/>
//         </div>
//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th onClick={sortById}>
//                              <span>ID</span>
//                              {sorted.sorted==="id" ? render():null}
//                             </th>
//                             <th onClick={sortByTitle}>
//                                 <span>Title</span>
//                                 {sorted.sorted==="title" ? render():null}
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             records.map((x)=>
//                             <tr>
//                                 <td>{x.id}</td>
//                                 <td>{x.title}</td>
//                             </tr>
//                             )
//                         }
//                     </tbody>
//                 </table>
//             </div>
//             <nav>
//                 <ul>
//                     <li>
//                         <a href="#" onClick={PreviousPage}>Previous Page</a>
//                     </li>
//                     {
//                         numbers.map((x)=>(
//                             <li className={`${currentpage===x ? 'active': null}`}>
//                                 <a href="#" onClick={()=>correntPage(x)}>{x}</a>
//                             </li>
//                         ))
//                     }
//                     <li>
//                         <a href="#" onClick={lastPage}>nextpage</a>
//                     </li>
//                 </ul>
//             </nav>
        
//     </div>

//     </>
//   )
// }
