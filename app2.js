function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
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

function mainMenu(person, people) {

  if (!person) {
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":

      break;
    case "descendants":

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

function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);


  var foundPerson = people.filter(function (person, data) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson[0];
}

function searchByTraits(people) {

  knowGender = promptFor("Do you know the person's gender? yes or no", yesNo);
  knowAge = promptFor("Do you know the person's age?", yesNo);
  knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", yesNo);
  knowWeight = promptFor("Do you know the person's weight? yes or no", yesNo);
  knowOccupation = promptFor("Do you know the person's occupation? yes or no", yesNo);
 
  if (knowGender == "yes") {
    gender = promptFor("What is their gender?", chars).toLowerCase();

    personGender = people.filter(function (person) {
      if (person.gender == gender) {
        console.log(person.firstName);
        return true;
      } else {
        return false;
      }
    });
    var people = personGender;
    if (people.length == 1) {
      foundPerson = personGender[0];
      console.log(foundPerson);
      displayPerson(foundPerson);
    }
  }
  if (knowAge == "yes") {
    var input = promptFor("What is the person's age?", chars);
    personAge = people.filter(function (person) {
      var age = getAge(person);
      if (input == age) {
        alert(age);
        return true;
      } else {
        return false;
      }
    });
    var people = personAge;
    if (people.length == 1) {
      var foundPerson = people[0];
    }
  }   else {
  return false;
  }
  if (knowEyeColor == "yes") {
    color = promptFor("What is the person's eyecolor?", chars).toLowerCase();
    personEyeColor = people.filter(function (person) {
      if (person.eyeColor == color) {
        console.log(person.firstName);
        return true;
      } else {
        return false;
      }
    });
    var people = personEyeColor;
    if (people.length == 1) {
      foundPerson = people[0];
      console.log(foundperson);
      displayPerson(foundPerson);
    }
  }
  if (knowWeight == "yes") {
    weight = promptFor("What is the person's weight?", chars).toLowerCase();
    personWeight = people.filter(function (person) {
      if (person.weight == weight) {
        console.log(person.firstName);
        return true;
      } else {
        return false;
      }
    });
    var people = personWeight;
    if (personWeight.length == 1) {
      var foundPerson = people[0];
      /*foundPerson.dob;
      GetAge(foundPerson.dob) */
      console.log(foundPerson);
      return (foundPerson);
    }
  }
  if (knowOccupation == "yes") {
    occupation = promptFor("What is the person's weight?", chars);
    personOccupation = people.filter(function (person) {
      if (person.occupation == occupation) {
        console.log(person.firstName);
        return true;
      } else {
        return false;
      }
    });
    var people = personOccupation;
    if (people.length == 1) {
      foundPerson = people[0];
      console.log(foundPerson);
      return (foundPerson);
    }
  }
  if (foundPerson == null) {
    return mainMenu(person, people);
  }
  return foundPerson;
}

function getAge(person) {
  var today = new Date();
  var birthDate = new Date(person.dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  console.log(age);
  return age;
}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Height:" + person.height + "\n";
  personInfo += "Weight" + person.weight + "\n";
  personInfo += "Date of Birth:" + person.dob + "\n";
  personInfo += "Occupation:" + person.occupation + "\n";
  personInfo += "Eye Color:" + person.eyeColor + "\n";
  alert(personInfo);
  return (personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
