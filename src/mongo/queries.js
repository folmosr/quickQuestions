/**
 * Complete the query, you have a variable that contains a piece of text to search for. 
 * Search by exact email, starts with first or last name and only users 
 * logged in for 6 months
 **/
db.users.find({
    $or: [
        { email: 'thompsonboone@zyple.com' },
        { first_name: /^thompsonboone@zyple.com/ig },
        { last_name: /^thompsonboone@zyple.com/ig }],
    last_connection_date: { $lte: '2024-01-31' }
});

function getFormattedDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let rawmm = today.getMonth() - 5; // Months start at 0!
    let rawdd = today.getDate();

    let dd, mm;

    if (rawdd < 10) dd = '0' + rawdd; else dd = `${rawdd}`;
    if (rawmm < 10) {
        mm = (rawmm == 0) ? '01' : `0${rawmm}`
    } else {
        mm = `${rawmm}`
    };

    const formattedToday = yyyy + '-' + mm + '-' + dd;
    return formattedToday;
}
/**What should be added to the collection so that the query is not slow? I would create an Index  */