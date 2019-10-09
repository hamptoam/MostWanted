//when I use use strict statement I get an error saying too many errors. Oops.
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

  var foundPerson = people.filter(function (person, data) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      alert("No one with that name in our system");
      return false;
    }
  });
  return foundPerson[0];
}

function searchByTraits() {
  knowGender = promptFor("Do you know the person's gender? yes or no", yesNo);
  knowAge = promptFor("Do you know the person's age?", yesNo);
  knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", yesNo);
  knowWeight = promptFor("Do you know the person's weight? yes or no", yesNo);
  knowOccupation = promptFor("Do you know the person's occupation? yes or no", yesNo);
}

function searchByGender(people) {
  if (knowGender == "yes") {
    gender = promptFor("What is their gender?", chars).toLowerCase();
    personGender = people.filter(function (person) {
      if (person.gender == gender) {
        return true;
      } else {
        alert("Not applicable");
        return false;
      }
    });
  }
}

function searchbyEyeColor(people) {
  var knowEyeColor = searchByTraits.knowEyeColor;
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
}

function searchByWeight(people) {
  var knowWeight = searchByTraits.knowWeight;
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
  }
}

function searchByOccupation(people) {
  var knowOccupation = searchByTraits.knowOccupation;
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
  }
}

function filterTraits(people){

var sortedPeople = searchByGender(personGender);
var sortedPeople = searchbyEyeColor(personEyeColor);
var sortedPeople = searchByAge(personAge);
var sortedPeople = searchByWeight(personWeight);
var sortedPeople = searchByOccupation(personOccupation);

  if (sortedPeople.length == 1)
  {
    return sortedPeople[0]; 
  } else {
    alert("No match found");
  }
}

function getAge(person) {
  var today = new Date();
  var birthDate = new Date(person.dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
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
      }
    );
    foreach (sibling in siblings)
    {
      alert(sibling.firstName + " " + sibling.lastName);
    }
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