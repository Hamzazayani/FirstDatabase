const express = require('express');
const app = express();
const port = 5000;
const connectdb = require('./config/connect');
const mongoose = require('mongoose');
const User=require('./model/user')
require('dotenv').config({path:'./config/.env'});





// Function to create many users using async/await
async function createUsers() {
  try {
    const arrayOfUsers = [
      { name: 'Hamza', age: 29 , favoriteFoods: ['Lablebi'] },
      { name: 'Alice', age: 25 , favoriteFoods: ['Pizza'] },
      { name: 'Mary', age: 12 , favoriteFoods: ['burritos'] },
   
    ];
    const users = await User.create(arrayOfUsers);

    console.log('Users created:', users);
  } catch (err) {
    console.error(err);
  }
}
// Function to find users by name
async function findbyname() {
  try {


    // Use the find method with User model to search for users with the given name
    const peopleWithGivenName = await User.find({ name: "Alice" });

console.log(peopleWithGivenName)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Function to find a user by their favorite food
async function findPersonByFood() {
  try {
  const user1= await User.findOne({ favoriteFoods: "Lablebi" });
  console.log(user1)
  } catch (err) {
    console.error(err);
    return null;
  }
}
// Function to find a user by their ID
async function findPersonById(Id) {
  try {
    const person = await User.findById(Id);
  console.log(person);
  } catch (err) {
    console.error(err);
  }}

// Function to update a person's favorite food
  async function classicUpdatePerson() {
    try {
      // Find a person by name, assuming "Alice" exists
      const personToUpdate = await User.findOne({ name: "Alice" });
  
      // Add "hamburger" to their favoriteFoods
      personToUpdate.favoriteFoods.push("hamburger");
  
      // Save the updated person
      await personToUpdate.save();
  
      console.log("Person updated:", personToUpdate);
    } catch (err) {
      console.error(err.message || "Person not found.");
    }
  }
// Function to update a person's age
  async function updatePersonAge() {
    try {
      const updatedPerson = await User.findOneAndUpdate(  { name:"Hamza"}, { age: 20  } );
  
      console.log("Person's age updated:", updatedPerson);
    } catch (err) {
      console.error(err.message || "An error occurred while updating the person's age.");
    }
  }

// Function to delete a person by their ID
  async function deletePersonById() {
    try {
      const deletedPerson = await User.findByIdAndRemove("651c51784fb5fedd45589b69");
  
      console.log(deletedPerson );
    } catch (err) {
      console.error(err.message || "An error occurred while deleting the person.");
    }
  }
// Function to delete people by name
  async function deletePeopleByName() {
    try {
      const result = await User.deleteMany({ name: 'Mary' });
      console.log(result);
    } catch (err) {
      console.error(err.message || "An error occurred while deleting people.");
    }
  }
  
// Function to find burrito lovers
  async function findBurritoLovers() {
    try {
      const burritoLovers = await User.find({ favoriteFoods: 'burritos' })
        .sort('name')
        .limit(2)
        .select('-age ') 
        .exec((err, user2)=> {
          if (err)  return handleError(err);
          console.log(user2);
        });
  
      console.log(burritoLovers);
  
    } catch (err) {
      console.log(err);
    }
  }
  




  









//findBurritoLovers() 
//deletePeopleByName("Mary")
//deletePersonById()
//updatePersonAge()
//classicUpdatePerson()
//findPersonById("651b097deb39f4798070ee70")
//findPersonByFood()
//createUsers();
//findbyname()
//connectdb()
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
})