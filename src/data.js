const tempData = [
    {
        id: 'ksdshdk8sd8sadasd8s',
        name: 'e',
        description: 'This is a great letter',
        price: 12.64,
        case: 'lower',
        family: 'comic sans',
    },
    {
        id: 'shdkshdsdosd8os898s8d0',
        name: 'a',
        description: 'This is a great letter for having a good time. Background image credit \n<br /><a href="https://www.freepik.com/vectors/fun-background">Fun background vector created by freepik - www.freepik.com</a>',
        price: 24.95,
        case: 'lower',
        family: 'comic sans',
    },
    {
        id: 'jshd8sds9d89sd',
        name: 'b',
        description: 'This letter will do in the rain',
        price: 16.45,
        case: 'lower',
        family: 'comic sans',
    },
    {
        id: 'j98dso98a9sd80d',
        name: 'f',
        description: 'Its slippyer than a snake',
        price: 12.64,
        case: 'lower',
        family: 'comic sans',
    },
    {
        id: 'kjs8s8d9s8d9',
        name: 'g',
        description: 'Its slippyer than a snake',
        price: 12.64,
        case: 'upper',
        family: 'comic sans',
    },
    {
        id: 'sj8d89sa8d09sd8',
        name: 'p',
        description: 'Is it an i or is it a l you will have to tell us after you bought it',
        price: 7.99,
        case: 'upper',
        family: 'comic sans',
    },
    {
        id: 'sd90s9ds909s8a0d8',
        name: 'w',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'comic sans',
    },
    {
        id: 'sjklda9odas9d9s8d',
        name: 'i',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'times new roman',
    },
    {
        id: '98dsf08sdf8s0',
        name: 'h',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'times new roman',
    },
    {
        id: 'sjlsadsa0d9a0da',
        name: 'q',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'times new roman',
    },
    {
        id: 'df98s08f0s',
        name: 'v',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'times new roman',
    },
    {
        id: 'sd9a9ds9dasda',
        name: 'z',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'times new roman',
    },
    {
        id: 'sdsdasd3a4d34ad4a',
        name: 'j',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'helvetica',
    },
    {
        id: 'sefw34s4s4fs',
        name: 'k',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'helvetica',
    },
    {
        id: 'a34d34dwa43a',
        name: 'r',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'helvetica',
    },
    {
        id: 'zzfz-f9-f9',
        name: 's',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'helvetica',
    },
    {
        id: 'sz09d-zs9d-z-dz',
        name: 'a',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'helvetica',
    },
    {
        id: 's9z-d9szd9',
        name: 'c',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'helvetica',
    },
    {
        id: 'df8zdfxd0f',
        name: 'u',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'helvetica',
    },
    {
        id: 'ssdad9-9as-d',
        name: 'd',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'wingdings',
    },
    {
        id: 'sdsdaosi0a0090877',
        name: 'x',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'lower',
        family: 'wingdings',
    },
    {
        id: 'dasdas43fx3s',
        name: 'a',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'wingdings',
    },
    {
        id: 'sdsd0sd9',
        name: 'b',
        description: 'You will find your best friend in this letter',
        price: 19.22,
        case: 'upper',
        family: 'wingdings',
    },
];

// introduce delay to highlight loading stats
const delay = (numSecs = 2000) => new Promise((resolve) => setTimeout(resolve, numSecs));

async function requestAll() {
    await delay();
    return tempData;
}

async function requestById(id) {
    await delay();
    return tempData.find((i) => i.id === id);
}

export { requestAll, requestById };