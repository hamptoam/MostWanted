"use srtict";

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
      searchByGender(people);
      break;
    default:
      app(people); // restart app
      break;
  }
}

function mainMenu(foundPerson, people) {
  var person = foundPerson;
  if (!person) {
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'spouse', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person, people);
      break;
    case "family":
      findSpouse(person, people);
      findSiblings(person, people);
      break;
    case "descendants":
      findChildren(person, people);
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

  var foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      alert("No one with that name in our system");
      return false;
    }
  });
  var person = foundPerson[0];
  return mainMenu(person);
}

function searchByGender(people) {
  var knowGender = promptFor("Do you know the person's gender? yes or no", yesNo).toLowerCase();
  if (knowGender == "yes") {
    var gender = promptFor("What is their gender?", chars).toLowerCase();
    personGender = people.filter(function (person) {
      if (person.gender === gender) {
        return true;
      } else {
        alert("Not applicable");
        return false;
      }
    });
  }
  if (personGender.length == 1) {
    var foundPerson = personGender[i];
    mainMenu(foundPerson, people);
  } else {
    searchbyEyeColor(personGender);
  }
  return personGender;
}

function searchbyEyeColor(people) {
  var people = searchByGender.personGender;
  var knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", yesNo).toLowerCase();
  if (knowEyeColor == "yes") {
    color = promptFor("What is the person's eyecolor?", chars).toLowerCase();
    personEyeColor = people.filter(function (person) {
      if (person.eyeColor == color) {
        return true;
      } else {
        alert("No one with that eye color in our system");
        return false;
      }
    });
  }
  if (personEyeColor.length == 1) {
    var foundPerson = personEyeColor[i];
    mainMenu(foundPerson, people);
  } else {
    searchByAge(personEyeColor);
  }
  return personEyeColor;
}

function searchByAge(people) {
  var people = searchByEyeColor.personEyeColor;
  var peoplebyAge = [];
  var knowAge = promptFor("Do you know the person's age?").toLowerCase();
  if (knowAge == "yes") {
    age = promptFor("What is their age?");
    for (var i = 0; i < people.length; i++) {
      var birthDate = new Date(person.dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    if (person.age == knowAge)
    {
      console.log(person);
      peoplebyAge.push(person);
      if(peoplebyAge.length == 1)
      {
        var foundPerson = peopleByAge[0];
        return mainMenu(foundPerson, people);
      }
    }
  } else {
    searchByWeight();
  }
}

/*function getAge(age, person) {
  var personAge = searchByAge.age;
  var today = new Date();
  for (var i = 0; i < people.length; i++) {
    var birthDate = new Date(person.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (person.age == personAge) {
      console.log(person);
    }
    return age;
  }
} */

function searchByWeight(people) {
  var people = searchByAge.personAge;
  var knowWeight = promptFor("Do you know the person's weight? yes or no", yesNo).toLowerCase();
  if (knowWeight == "yes") {
    weight = promptFor("What is the person's weight?", chars).toLowerCase();
    personWeight = people.filter(function (person) {
      if (person.weight == weight) {
        return true;
      } else {
        alert("No one with that weight in system");
        return false;
      }
    });
    if (personWeight.length == 1) {
      var foundPerson = personWeight[0];
      mainMenu(foundPerson, people);
    } else {
      searchByOccupation(personWeight);
    }
  }
}

function searchByOccupation(people) {
  var knowOccupation = promptFor("Do you know the person's occupation? yes or no", yesNo).toLowerCase();
  if (knowOccupation == "yes") {
    occupation = promptFor("What is the person's occupation?", chars);
    personOccupation = people.filter(function (person) {
      if (person.occupation == occupation) {
        return true;
      } else {
        alert("No one with that occupation in our system");
        return false;
      }
    });
    if (personOccupation.length == 1) {
      var foundPerson = personOccupation[0];
      mainMenu(foundPerson, people);
    }
    return personOccupation;
  }
}

function findSiblings(foundPerson, people) {
  var parentId = people.parents;
  var personParents = foundPerson;
  var siblings = [];

  for (var i = 0; i < people.length; i++) {
    var sibling = people.filter(function (person) {
      if (personParents.parents === parentId) {
        siblings.push(sibling);
        return true;
      }
      if (sibling === null) {
        alert(foundPerson.firstName + "has no siblings");
        return mainMenu(foundPerson);
      }
      for (var i = 0; i < siblings.length; i++) {
        alert(sibling.firstName + " " + sibling.lastName);
      }
    });
  }
}

function findSpouse(foundPerson, people) {
  // "use strict" ; person = searchByTraits(foundPerson);
  var spouseId = foundPerson.currentSpouse;
  var partner = people.filter(function (person) {
    for (var i = 0; i < people.length; i++) {
      if (person.id === spouseId) {
        alert("Spouse is " + " " + person.firstName + " " + person.lastName);
        return partner;
      }
      if (spouseId == null) {
        alert(foundPerson.firstName + " " + "has no spouse");
        return mainMenu(foundPerson);
      }
    }
  });
}

function findChildren(foundPerson, people) {
  var foundChildren = [];
  var parent = foundPerson;
  for (var i = 0; i < people.length; i++) {
    foundChildren = people.filter(function (childPerson) {
      if (parent.id === childPerson.parents[i]) {
        alert("Children: " + " " + childPerson.firstName + " " + childPerson.lastName);
        foundChildren.push(childPerson);
        return true;
      } else {
        alert("Person has no children");
        return false;
      }
    });
  }
}

/*function getDescendants(foundPerson, people)
{
  for (var i = 0; i < foundChildren.length; i++) {
    return findChildren(childPerson, foundChildren[i]);
  }
  if (childPerson == null) {
    alert("Person has no grandchildren");
  } else {
    alert("GrandChild: " + childPerson.firstName + " " + childPerson.lastName);
  }
} */

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
  personInfo += "Spouse: " + person.currentSpouse + "\n";
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

/*
    var people = personGender;
    if (people.length == 1) {
      var foundPerson = personGender[0];
      displayPerson(foundPerson);
      return foundPerson;
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
      return foundPerson;
    }
  } else {
    return false;
  }

    var people = personEyeColor;
    if (people.length == 1) {
      var foundPerson = people[0];
      displayPerson(foundPerson);
      return foundPerson;
    }
  }
    var people = personWeight;
    if (personWeight.length == 1) {
      var foundPerson = people[0];
      displayPerson(foundPerson);
      return foundPerson;
    }
  }

    var people = personOccupation;
    if (people.length == 1) {
      var foundPerson = people[0];
      displayPerson(foundPerson);
      return foundPerson;
    }
  }
}
*/