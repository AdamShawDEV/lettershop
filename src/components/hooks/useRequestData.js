import { useState, useEffect } from 'react';
import { requestAll, requestById } from '../../data';

const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
}

function useRequestData(id = null) {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const data = await requestById(id);
          setData(data);
          setRequestStatus(REQUEST_STATUS.SUCCESS);
        } else {
          const data = await requestAll();
          setData(data);
          setRequestStatus(REQUEST_STATUS.SUCCESS);
        }
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.ERROR);
      }
    }

    getData();
  }, []);

  return { data, requestStatus };
}

export { useRequestData as default, REQUEST_STATUS };