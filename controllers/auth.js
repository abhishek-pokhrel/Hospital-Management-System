const mysql = require('mysql');
const bcrypt = require('bcryptjs');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

exports.register = (req, res)=>{
    console.log(req.body);
    const {firstName, lastName, address, phoneNumber, email, password} = req.body;
    connection.query('SELECT email from patients WHERE email = ?', [email], async (error, results)=>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'Account already exists!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        connection.query('INSERT INTO patients SET ?', {first_name: firstName, last_name: lastName, address: address, phone_number: phoneNumber, email: email, password: hashedPassword}, (error, results)=>{
            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'Account Created'
                });
            }
        })

    })
}

exports.login = (req, res)=>{
    console.log('login fnc is working');
}
exports.logout = (req, res)=>{
    console.log('logout fnc is working');
}