import { useState, useEffect } from 'react';

const tempData = [
    {
      id: 'ksdshdk8sd8sadasd8s',
      name: 'e',
      description: 'This is a great letter',
      price: 12.64,
      case: 'lower',
      family: 'comic-sands',
    },
    {
      id: 'shdkshdsdosd8os898s8d0',
      name: 'g',
      description: 'This is a great letter for having a good time',
      price: 24.95,
      case: 'upper',
      family: 'times new roman',
    },
    {
      id: 'jshd8sds9d89sd',
      name: 'w',
      description: 'This letter will do in the rain',
      price: 16.45,
      case: 'lower',
      family: 'wingdings',
    },
    {
      id: 'j98dso98a9sd80d',
      name: 's',
      description: 'Its slippyer than a snake',
      price: 12.64,
      case: 'lower',
      family: 'calibri',
    },
    {
      id: 'kjs8s8d9s8d9',
      name: 's',
      description: 'Its slippyer than a snake',
      price: 12.64,
      case: 'upper',
      family: 'bongo',
    },
    {
      id: 'sj8d89sa8d09sd8',
      name: 'l',
      description: 'Is it an i or is it a l you will have to tell us after you bought it',
      price: 7.99,
      case: 'upper',
      family: 'comic-sands',
    },
    {
      id: 'sd90s9ds909s8a0d8',
      name: 'f',
      description: 'You will find your best friend in this letter',
      price: 19.22,
      case: 'upper',
      family: 'bahnschrift',
    },
  ];

const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  }

function useRequestData() {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);

    // introduce delay to highlight loading stats
    const delay = (numSecs) => new Promise((resolve) => setTimeout(resolve, numSecs));

    useEffect(() => {
        const getData = async () => {
            await delay(2000);
            try {
                setData(tempData);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
            } catch(e) {
                setRequestStatus(REQUEST_STATUS.ERROR);
            }
        }

        getData();
    }, []);

    return { data, requestStatus};
}

export { useRequestData as default, REQUEST_STATUS};