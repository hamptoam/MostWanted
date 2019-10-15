"use strict";

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

function searchByTraits(people) {

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
    return people.filter(function (person) {
        if (person.gender == gender) {
            console.log(person.firstName);
            return true;
        } else {
            return false;
        }
    });
}

function searchByAge(people, personage) {
    return people.filter(function (person) {
        var age = getAge(person);
        if (personage == age) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByEyeColor(people, color) {
    return people.filter(function (person) {
        if (person.eyeColor == color) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByWeight(people, weight) {
    return people.filter(function (person) {
        if (person.weight == weight) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByOccupation(people, occupation) {
    return people.filter(function (person) {
        if (person.occupation == occupation) {
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

    for (var i = 0; i < people.length; i++) {
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
        for (var i = 0; i < people.length; i++) {
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
    for (var i = 0; i < people.length; i++) {
        foundChildren = people.filter(function (childPerson) {
            if (parent.id === childPerson.parents[i]) {
                alert(childPerson.firstName + " " + childPerson.lastName);
                foundChildren.push(childPerson);
            }
        });
        if (foundChildren == null) {
            alert(parent.firstName + " " + "has no descendants");
            return mainMenu(foundPerson, people);
        }
        mainMenu(foundPerson, people);
        return foundChildren[i];
    }
}

function getDescendants(foundPerson, people) {
    var descendants = [];
    var parent = foundPerson;
     descendants = people.filter(function (descPerson) {
        for (var i = 0; i < people.length; i++) {
            if (parent.id === descPerson.parents[i]) {
                descendants.push(descPerson);
                 return getDescendants(descPerson, people);
            } else {
                return false;
            }
        }
        for (var i = 0; i < descendants.length; i++) {
            alert(person.firstName + " " + person.lastName);
        }
        mainMenu(foundPerson, people);
        return descendants[i];
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