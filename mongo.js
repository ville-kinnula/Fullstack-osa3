const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length===4 || process.argv.length>5) {
  console.log('To list all persons in the phonebook, give password as argument. To add a new person to the phonebook, give password, name and number as arguments.')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ville-fullstack:${password}@cluster0.l9ofm.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length===5) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save()
    .then(response => {
      console.log(`added ${response.name} number ${response.number} to phonebook`)

      mongoose.connection.close()
    })
    .catch(error => console.log(error))
}

if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

