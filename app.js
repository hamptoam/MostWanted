"use strict";

function app(people) {

    var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
    if (searchType != "yes" || "no") {
        alert("Please type in Yes or No");
        return searchType;
    }
    switch (searchType) {
        case 'yes':
            var foundPerson = searchByName(people);
            mainMenu(foundPerson, people);
            break;
        case 'no':
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

    var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'siblings', 'spouse' , 'children' or 'grandchildren' ? Type the option you want or 'restart' or 'quit'");

    switch (displayOption) {
        case "info":
            displayPerson(person, people);
            break;
        case "spouse":
            findSpouse(person, people);
            break;
        case "siblings":
            findSiblings(person, people);
            break;
        case "children":
            findChildren(person, people);
            break;
        case "grandchildren":
            getDescendants(person, people);
            break;
        case "restart":
            app(people); // restart
            break;

        case "quit":
            return;
        default:

            return mainMenu(person, people);
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

function searchBySingleTrait(people) {
    var displayTrait = alert("What trait would you like to search by? Gender, Age, EyeColor, Weight or Occupation?").toLowerCase();

    switch (displayTrait) {

        case "gender":
            var gender = promptFor("What is their gender?").toLowerCase();
            searchByGender(gender);
            var genderArray = searchByGender.genderArray;
            for (var i = 0; i < genderArray.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
            break;
        case "age":
            var age = promptFor("What is their age?").toLowerCase();
            searchByAge(age);
            var ageArray = searchByAge.ageArray;
            for (var i = 0; i < ageArray.length; i++); {
                alert(i.firstName + " " + i.lastName);
            }
            break;
        case "eyecolor":
            var eyeColor = promptFor("What is their eyecolor?").toLowerCase();
            searchByEyeColor(eyeColor);
            var eyeColorArray = searchByEyeColor.eyeColorArray;
            for (var i = 0; i < eyeColorArray.length; i++); {
                alert(i.firstName + " " + i.lastName);
            }
            break;
        case "weight":
            var weight = promptFor("What is their weight?", chars).toLowerCase();
            searchByWeight(weight);
            var weightArray = searchByWeight.weightArray;
            for (var i = 0; i < weightArray.length; i++); {
                alert(i.firstName + " " + i.lastName);
            }
            break;
        case "occcupation":
            var occupation = promptFor("What is their occupation?").toLowerCase();
            searchByOccupation(occupation);
            var occupationArray = searchByOccupation.occupationArray;
            for (var i = 0; i < occupationArray.length; i++); {
                alert(i.firstName + " " + i.lastName);
            }
            break;
    }
    return app(people);
}

function twoToFiveTraits(people) {
    var searchFor = promptFor("Do you want to search for one person or multiple? 2 - 5").toLowerCase();
    if (searchFor !== "2" || "3" || "4" || "5") {
        alert("Please type in a number betweeen 2 and 5");
        return searchFor;
    }
    switch (searchFor) {
    case "2":
        var twoTraits = promptFor("What traits would you like to search by? Gender, eyeColor, age, weight, or occupation?").toLowerCase();
        if (twoTraits !== "gender" || "eyecolor" || "age" || "weight" || "occupation") {
            return twoTraits;
        }
        if (twoTraits == "gender" && "eyecolor") {
          
            
        }
        if (twoTraits == "gender" && "age") {
          
            
        }
        if (twoTraits == "gender" && "weight") {
          
            
        }
        if (twoTraits == "gender" && " occupation") {
          
            
        }
    }
}

function searchForPerson(people) {

    var knowGender = promptFor("Do you know the person's gender? yes or no", yesNo);
    if (knowGender == "yes") {
        var gender = promptFor("What is their gender?", chars).toLowerCase();
        var peopleList = searchByGender(people, gender);
        if (peopleList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }
    }
    var knowAge = promptFor("Do you know the person's age?", yesNo);
    if (knowAge == "yes") {
        var personage = promptFor("What is the person's age?", chars);
        var peopleList = searchByAge(people, personage);
        if (peopleList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }
    }
    var knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", yesNo);
    if (knowEyeColor == "yes") {
        var color = promptFor("What is the person's eyecolor?", chars).toLowerCase();
        var peopleList = searchByEyeColor(people, color);
        if (peopleList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }
    }
    var knowWeight = promptFor("Do you know the person's weight? yes or no", yesNo);
    if (knowWeight == "yes") {
        var weight = promptFor("What is the person's weight?", chars).toLowerCase();
        var peopleList = searchByWeight(people, weight);
        if (peopleList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }
    }
    var knowOccupation = promptFor("Do you know the person's occupation? yes or no", yesNo);
    if (knowOccupation == "yes") {
        var occupation = promptFor("What is the person's occupation?", chars);
        var peopleList = searchByOccupation(people, occupation);
        if (peopleList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }
    }
}

function searchByGender(people, gender) {
    var genderArray = [];
    return people.filter(function (person) {
        if (person.gender == gender) {
            genderArray.push(person);
            return true;
        } else {
            return false;
        }
    });
}

function searchByAge(people, personage) {
    var ageArray = [];
    return people.filter(function (person) {
        var age = getAge(person);
        if (personage == age) {
            ageArray.push(person);
            return true;
        } else {
            return false;
        }
    });
}


function searchByEyeColor(people, color) {
    var eyeColorArray = [];
    return people.filter(function (person) {
        if (person.eyeColor == color) {
            eyeColorArray.push(person);
            return true;
        } else {
            return false;
        }
    });
}

function searchByWeight(people, weight) {
    var weightArray = [];
    return people.filter(function (person) {
        if (person.weight == weight) {
            weightArray.push(person);
            return true;
        } else {
            return false;
        }
    });
}

function searchByOccupation(people, occupation) {
    var occupationArray = [];
    return people.filter(function (person) {
        if (person.occupation == occupation) {
            occupationArray.push(person);
            return true;
        } else {
            return false;
        }
    });
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
    var findSiblings = [];
    var person = foundPerson;

    for (var person = 0; person < people.length; person++) {
        findSiblings = people.filter(function (siblingPerson) {
            if (person.parents[0 || 1] === siblingPerson.parents[0 || 1]) {
                alert("Sibling : " + siblingPerson.firstName + " " + siblingPerson.lastName);
                findSiblings.push(siblingPerson);
            }
        });
        return findSiblings;
    }
    mainMenu(foundPerson, people);
}

function findSpouse(foundPerson, people) {
    var spouseId = foundPerson.currentSpouse;
    var partner = people.filter(function (person) {
        for (var person = 0; person < people.length; person++) {
            if (person.id === spouseId) {
                alert("Spouse is " + " " + person.firstName + " " + person.lastName);
                return mainMenu(foundPerson, people);
            } else {
                return false;
            }
        }
    });
}

function findChildren(foundPerson, people) {
    var foundChildren = [];
    var parent = foundPerson;
    for (var person = 0; person < people.length; person++) {
        foundChildren = people.filter(function (childPerson) {
            if (parent.id === childPerson.parents[person]) {
                alert(childPerson.firstName + " " + childPerson.lastName);
                foundChildren.push(childPerson);
            }
        });
        if (foundChildren == null) {
            alert(parent.firstName + " " + "has no descendants");
            return mainMenu(foundPerson, people);
        }
        mainMenu(foundPerson, people);
        return foundChildren[person];
    }
}

function getDescendants(foundPerson, people) {
    var descendants = [];
    var parent = foundPerson;
    descendants = people.filter(function (descPerson) {
        for (var person = 0; person < people.length; person++) {
            if (parent.id === descPerson.parents[person]) {
                descendants.push(descPerson);
                return getDescendants(descPerson, people);
            } else {
                return false;
            }
        }
        for (var person = 0; person < descendants.length; person++) {
            alert(person.firstName + " " + person.lastName);
        }
        mainMenu(foundPerson, people);
        return descendants[person];
    });
}

function displayPeople(people) {
    alert(people.map(function (person) {
        return person.firstName + " " + person.lastName;
    }).join("\n"));
}

function displayPerson(person) {
    var personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Height:" + person.height + "\n";
    personInfo += "Weight" + person.weight + "\n";
    personInfo += "Date of Birth:" + person.dob + "\n";
    personInfo += "Occupation:" + person.occupation + "\n";
    personInfo += "Eye Color:" + person.eyeColor + "\n";
    personInfo += "Spouse: " + person.currentSpouse + "\n";
    alert(personInfo);
    return (personInfo);
}

function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}

function yesNo(input) {
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
    return true;
}