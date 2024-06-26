(async () => {
    const result = await computeResult();
    console.log(`Total: ${result}`);
})();

// Call web service and return count user, (got is library to call url)
async function getCountUsers() {
    return { total: await got.get('https://my-webservice.moveecar.com/users/count') };
}

// Add total from service with 20
async function computeResult() {
    const result = await getCountUsers();
    return result.total + 20;
}
