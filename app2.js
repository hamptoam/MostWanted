
// app is the function called to start the entire application
function app(people){  
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    mainMenu(foundPerson, people);
    break;
    case 'no':
    // TODO: search by traits
    var foundPerson = searchByTraits(people);
    mainMenu(foundPerson, people);
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);


  var foundPerson = people.filter(function(person, data){
    if(person.firstName === firstName && person.lastName === lastName){
        return true;
    }
    else{
      return false;
    }
  });
 return foundPerson[0];
}

  // TODO: find the person using the name they entered
 


function searchByTraits(people){
    knowGender = promptFor("Do you know the person's gender? yes or no", chars);
    age = promptFor("What is the person's age?", chars);
    knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", chars);
    knowWeight = promptFor("Do you know the person's weight? yes or no", chars);
    knowOccupation = promptFor("Do you know the person's occupation? yes or no", chars);
   
  
        if (knowgender == "yes")
        {
            height = promptFor("Do you know the person's gender?", chars);
            personGender = people.filter(function(person) {
              if (person.gender == gender){
                return;
              } else {
                return false;
              }
            });
          }
        if(knowAge == yes)
        {
            
            personAge = personGender.filter(function(person){
             if(person.age == yes){
               return true;
             } else {
               return false;
             }
           });
         }
        if(knowEyeColor == "yes")
        {
          eyeColor = promptFor("What is the person's eyecolor?", chars.toLowerCase);
          personEyeColor = personAge.filter(function(person){
            if(person.eyeColor == color){
              return true;
            } else {
              return false;
            }
          });
        }      
       if(knowWeight == "yes") 
       {
            weight = promptFor("What is the person's weight?", chars.toLowerCase);
            personWeight = personEyeColor.filter(function(person){
            if(person.weight == weight){
              return true;
            } else {
              return false;
            }
          });
       }
      if(knowOccupation == yes)
      { 
            personOccupation = promptFor("What is the person's weight?", chars.toLowerCase);
            personfilter = personWeight.filter(function(person){
            if(person.occupation == occupation){
              return true;
            } else {
              return false;
            }
          });
        }
   
      //return person by 2 or more criteria
    }
  

function findAge(people){
 var birthday = searchByTraits.age; 
 var dob = people.filter(function(person){
   if(person.birthday == dob){
     return true;
    }
    else{
      return false;
    }
  })
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
 // personInfo += "Height:" + person.height; +"\n";
  //personInfo += "Weight" + person.weight; +"\n";
  //personInfo += "Age:" + person.age; +"\n";
 // personInfo += "Occupation:" + person.occupation; +"\n";
  //personInfo += "Eye Color:" + person.eyeColor; +"\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
