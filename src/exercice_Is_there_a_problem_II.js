(async _ => {
    const elements = await getPlurial();
    console.log(`how many elements are there ? ${elements}`);
})();
// Call web service and return total vehicles, (got is library to call url)
async function getTotalVehicles() {
    return await got.get('https://my-webservice.moveecar.com/vehicles/total');
}

async function getPlurial() {
    let total = 0;
    return getTotalVehicles()
        .then(r => {
            total = r;
            if (total <= 0) {
                return 'none';
            }
            if (total <= 10) {
                return 'few';
            }
            return 'many';
        })
        .catch(e => console.error(e.message));

}
