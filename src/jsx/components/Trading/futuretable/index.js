import React, {useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

const tableData = [
    { title1: 'USDT', title2:'BTC', type: "ADMIN", price: '$0.1478', change: '+11%', volume: 'Bank', cap:'Monday 9:12 AM'   },
    { title1: 'BTC', title2:'BND',type: "SELF", price: '$0.6932',change: '+22%', volume: 'Crypto', cap:'Friday 10:11 PM'   },
    
];    

const FutureTable = () =>{
    const [data, setData] = useState(
		document.querySelectorAll("#future_wrapper tbody tr")
	);
	const sort = 6;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   // use effect
    useEffect(() => {
      setData(document.querySelectorAll("#future_wrapper tbody tr"));
      //chackboxFun();
	}, [test]);

  
   // Active pagginarion
    activePag.current === 0 && chageData(0, sort);
   // paggination
    let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
    return(
        <>
            <div className="table-responsive dataTablemarket">
                <div  id="future_wrapper" className="dataTables_wrapper no-footer">   
                    <table  className="table dataTable  shadow-hover display" style={{minWidth:"845px"}}>
                        <thead>
                            <tr>
                                <th>Asset Pair</th>
                                <th className="text-center">Transaction Type</th>
                                <th className="text-center">Amount</th>
                                <th className="text-center">Profit</th>
                                <th className="text-center">Created By</th>
                                <th className="text-center">Created At</th>
                                <th className="text-end">Status</th>
                                <th className="text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index)=>(
                                <tr key={index}>
                                    <td>
                                        <Link to={"#"} className="market-title d-flex align-items-center">   
                                            <h5 className="mb-0 ms-2"> {item.title1}</h5>
                                            <span className="text-muted ms-2"> {item.title2}</span>
                                        </Link>
                                    </td>
                                    <td>{item.volume}</td>
                                   
                                    <td>{item.price}</td>
                                    <td className={`${index % 2 == 0  ? "text-danger" : "text-success"} `}>{item.change}</td>
                                    <td style={{display: "flex", alignItems: "center", gap: "10px", justifyContent: "center"}}>
                                        {
                                            item.type == "SELF" ? (
                                                <FaUserCircle />
                                            ): (
                                                <RiAdminFill />
                                            )
                                        }
                                    <span>
                                        {item.type}
                                    </span>
                                    </td>
                                    <td>{item.cap}</td>
                                    <td className="text-end"><Link to={"#"}>Closed</Link></td>
                                    <td className="text-end">
                                        <button style={{background: "red", border: "none", padding: "10px", color: "white", borderRadius: "10px", cursor: "not-allowed", opacity: 0.5}}>Close Trade</button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3 mb-3">
                        <div className="dataTables_info">
                            Showing {activePag.current * sort + 1} to{" "}
                            {data.length > (activePag.current + 1) * sort
                                ? (activePag.current + 1) * sort
                                : data.length}{" "}
                            of {data.length} entries
                        </div>
                        <div
                            className="dataTables_paginate paging_simple_numbers mb-0"
                            id="application-tbl1_paginate"
                        >
                            <Link
                                className="paginate_button previous "
                                to="/market"
                                onClick={() =>
                                    activePag.current > 0 &&
                                    onClick(activePag.current - 1)
                                }
                                >
                                <i className="fa fa-angle-double-left" ></i> 
                            </Link>
                            <span>
                                {paggination.map((number, i) => (
                                    <Link
                                        key={i}
                                        to="/market"
                                        className={`paginate_button  ${
                                            activePag.current === i ? "current" : ""
                                        } `}
                                        onClick={() => onClick(i)}
                                    >
                                        {number}
                                    </Link>
                                ))}
                            </span>

                            <Link
                                className="paginate_button next"
                                to="/market"
                                onClick={() =>
                                    activePag.current + 1 < paggination.length &&
                                    onClick(activePag.current + 1)
                                }
                            >
                                <i className="fa fa-angle-double-right" ></i>
                            </Link>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default FutureTable;