/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilteringTable from '../table/FilteringTable/FilteringTable';
import { useGetTransactionsQuery } from '../../../redux/services/transactions';

const ViewTransactions = () => {
  const { userToken } = useSelector(state => state.auth);
  const { data, isLoading } = useGetTransactionsQuery(userToken);

  const [transactionsData, setTransactionsData] = useState([]);
  const [isDataCached, setIsDataCached] = useState(false);

  useEffect(() => {
    // Check if data is available and not cached
    if (data && data[1] && !isDataCached) {
      setTransactionsData(data[1].data);
      setIsDataCached(true); // Mark data as cached
    }
  }, [data, isDataCached]);

  useEffect(() => {
    // Function to manually trigger data refetch
    const handleRefetch = () => {
      setIsDataCached(false); // Mark data as not cached to allow refetch
    };

    // Add event listeners or any other mechanism to trigger refetch
    // Example: window.addEventListener('someEvent', handleRefetch);

    // Clean up event listeners
    return () => {
      // Example: window.removeEventListener('someEvent', handleRefetch);
    };
  }, []);

  useEffect(() => console.log("dtrans", transactionsData), [transactionsData]);

  return (
    <div>
      {
        !isLoading && (
          <FilteringTable data={transactionsData} isLoading={isLoading}/>
        ) 
      }
    </div>
  );
};

export default ViewTransactions;
