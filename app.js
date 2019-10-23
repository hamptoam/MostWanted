"use strict";

function app(people) {

    var personOrPeople = promptFor("Would you like to view lists of people by traits?", yesNo);
    if (personOrPeople === "yes") {
        getLists(people);
    }
    if (personOrPeople === "no") {
        var searchType = promptFor("Do you know the name of the person you are looking for? Enter yes or no", yesNo);
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
}

function mainMenu(foundPerson, people) {
    var person = foundPerson;
    if (!person) {
        alert("Could not find that individual.");
        return app(people);
    }

    var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants' ? Type the option you want or 'restart' or 'quit'");

    switch (displayOption) {
        case "info":
            displayPerson(person, people);
            break;
        case "family":
            findSpouse(person, people);
            findSiblings(person, people);
            findParents(person, people);
            break;
        case "descendants":
            getDescendants(person, people);
            break;
        case "restart":
            app(people); // restart
            break;
        case "quit":
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
    var foundSiblings = people.filter(function (person) {
        if (foundPerson.parents.length === 0) {
            return false;
        }
        if (foundPerson.parents[0 || 1] === person.parents[0 || 1] && foundPerson.id !== person.id) {
            return true;
        } else {
            return false;
        }
    });
    if (foundSiblings.length === 0) {
        alert("No sibling listed in the system");
    }
    for (var i = 0; i < foundSiblings.length; i++) {
        alert("Siblings: " + person.firstName + " " + person.lastName);
    }
    return mainMenu(foundPerson, people);
}

function findParents(foundPerson, people) {
    var parents = people.filter(function (person) {
        if (foundPerson.parents[0 || 1] === person.id) {
            return true;
        } else {
            return false;
        }
    });
    if (parents.length == 0) {
        alert("No parents listed in system");
    }
    for (var i = 0; i < parents.length; i++) {
        alert("Parent(s):" + " " + person.firstName + " " + person.lastName);
    }
    return mainMenu(foundPerson, people);
}

function findSpouse(foundPerson, people) {
    var spouseId = foundPerson.currentSpouse;
    var partner = people.filter(function (person) {
        if (spouseId === person.id) {
            return true;
        } else {
            return false;
        }
    });
    if (partner.length === 0) {
        alert("No spouse in system");
    }
    for(var i = 0; i < partner.length; i++) {
        alert("Spouse is" + " " + person.firstName + " " + person.lastName);
    }
    return mainMenu(foundPerson, people);
}

function findChildren(foundPerson, people) {
    var parent = foundPerson;
    var foundChildren = people.filter(function (childPerson) {
        if (parent.id === childPerson.parents[i]) {
            alert(childPerson.firstName + " " + childPerson.lastName);
            foundChildren.push(childPerson);
        }
    });
    if (foundChildren.length === 0) {
        alert(parent.firstName + " " + "has no descendants");
        return mainMenu(foundPerson, people);
    }
    mainMenu(foundPerson, people);
    return foundChildren[i];
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

function searchByTrait(people) {
    var singleTrait = promptFor("Which trait would you like to filter by?").toLowerCase();
    if (singleTrait === "gender") {
        var gender = promptFor("What gender?").toLowerCase();
        searchByGender(people, gender);
        var genderArray = searchByGender.genderArray;

        var trait = gender;
        var array = genderArray;
        return array, trait;

    }
    if (singleTrait === "eyecolor" || "eye color") {
        var eyeColor = promptFor("What eyecolor?").toLowerCase();
        searchByEyeColor(people, eyeColor);
        var eyeColorArray = searchByEyeColor.eyeColorArray;

        var trait = eyeColor;
        var array = eyeColorArray;
        return array, trait;
    }
    if (singleTrait === "age") {
        var personage = promptFor("What age?");
        searchByAge(people, personage);
        var ageArray = searchByAge.ageArray;

        var trait = personage;
        var array = ageArray;
        return array, trait;
    }
    if (singleTrait === "weight") {
        var weight = promptFor("What weight?");
        searchByWeight(people, weight);
        var weightArray = searchByWeight.weightArray;

        var trait = weight;
        var array = weightArray;
        return array, trait;

    }
    if (singleTrait === "occupation") {
        var occupation = promptFor("What occupation?");
        searchByOccupation(people, occupation);
        var occupationArray = searchByWeight.occupationArray;

        var trait = occupation;
        var array = occupationArray;
        return array, trait;
    }
    if (singleTrait !== "gender" || "eyecolor" || "eye color" || "age" || "weight" || "occupation") {
        return searchByTrait(people);
    }
}


/*
function genderList() {
    var gender = promptFor("Which gender would you like to filter by?").toLowerCase();
    var genderArray = searchByGender(gender);
    for (var i = 0; i < genderArray.length; i++) {
        alert(i.firstName + " " + i.lastName);
    }
}

function ageList() {
    var age = promptFor("Which age would you like to filter by?").toLowerCase();
    var ageArray = searchByAge(age);
    for (var i = 0; i < ageArray.length; i++); {
        alert(i.firstName + " " + i.lastName);
    }
}

  function eyeColorList() {
    var eyeColor = promptFor("What eye color would you like to filter by?").toLowerCase();
    var eyeColorArray = searchByEyeColor(eyeColor);
    for (var i = 0; i < eyeColorArray.length; i++); {
        alert(i.firstName + " " + i.lastName);
    }
}

function weightList() {
    var weight = promptFor("What weight would you like to filter by?").toLowerCase();
    var weightArray = searchByWeight(weight);
    for (var i = 0; i < weightArray.length; i++); {
        alert(i.firstName + " " + i.lastName);
    }
}

function occupationList() {
    var occupation = promptFor("What occupation would you like to filter by?").toLowerCase();
    var occupationArray = searchByOccupation(app, occupation);
    for (var i = 0; i < occupationArray.length; i++); {
        alert(i.firstName + " " + i.lastName);
    }
}
*/