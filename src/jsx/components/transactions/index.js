import React, { useEffect, useState } from 'react'
import SortingTable from '../table/SortingTable/SortingTable'
import { useSelector } from 'react-redux'
import FilteringTable from '../table/FilteringTable/FilteringTable'
import { useGetTransactionsQuery } from '../../../redux/services/transactions'

const ViewTransactions = () => {
  const { loading, userInfo, userToken, success } = useSelector(state => state.auth);
	const {data, isLoading, error} = useGetTransactionsQuery(userToken)
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    if (data && data[1]) {
      setTransactionsData(data[1].data);
    }
  }, [data]);

  useEffect(()=>console.log("dtrans", transactionsData),[]);
  
  return (
    <div>
      {
        !isLoading && (
          <FilteringTable data={transactionsData}/>
        ) 
      }
    </div>
  )
}

export default ViewTransactions;
