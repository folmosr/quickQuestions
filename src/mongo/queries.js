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
    last_connection_date: { $lte: ISODate(getFormattedDate()) }
});

function getFormattedDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let rawmm = today.getMonth() - 5; // Months start at 0!
    let rawdd = today.getDate() + 1;

    let dd, mm;

    if (rawdd < 10) dd = '0' + rawdd; else dd = `${rawdd}`;
    if (rawmm < 10) {
        mm = (rawmm == 0) ? '01' : `0${rawmm}`
    } else {
        mm = `${rawmm}`
    };

    const formattedToday = yyyy + '-' + mm + '-' + dd + 'T00:00:00';
    return formattedToday;
}
/**What should be added to the collection so that the query is not slow? R = I would create an Index  */

/**
 * Exercice: MongoDb aggregate
 */
[

    {
        $match: {
            roles: "email"
        }
    },
    {
        $group:
        {
            _id: { $first: "$roles" },
            users: { $push: "$email" }
        }
    },
]

/**
 * MongoDb update
 */

// Update document ObjectId("5cd96d3ed5d3e20029627d4a"), modify only last_connection_date with current date
db.users.updateOne({ _id: ObjectId('5cd96d3ed5d3e20029627d4a') }, {
    $currentDate: {
        last_connection_date: true
    }
})
// Update document ObjectId("5cd96d3ed5d3e20029627d4a"), add a role admin
db.users.updateOne({ _id: ObjectId('5cd96d3ed5d3e20029627d4a') },
    {
        $push: {
            roles: "admin"
        },
    })
// Update document ObjectId("5cd96d3ed5d3e20029627d4a"), modify addresses with zip 75001 and replace city with Paris 1
db.users.updateOne({ _id: ObjectId('5cd96d3ed5d3e20029627d4a') },
    {
        $set: {
            "address.$.zip": 75001,
            "address.$.city": "Paris 1"
        },
    })