"use strict";

function app(people) {

    var searchType = promptFor("Do you know the name of the person you are looking for? Enter yes or no", yesNo);
    switch (searchType) {
        case 'yes':
            var foundPerson = searchByName(people);
            mainMenu(foundPerson, people);
            break;
        case 'no':
            var foundPerson = filterByTraits(people);
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

    var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants' ? Type the option you want or 'restart' or 'quit'", chars).toLowerCase();
    if (displayOption !== "info" && displayOption !== "family" && displayFamily !== "descendants" && displayFamily !== "restart" && displayFamily !== "quit") {
        return displayOption;
    }
    switch (displayOption) {
        case "info":
            displayPerson(person, people);
            break;
        case "family":
            displayFamily(person, people);
            break;
        case "descendants":
            getDescendants(person, people);
            break;
        case "restart":
            app(people); // restart
            break;
        case "quit":
            return;
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

function filterByTraits(people) {
    alert("You can choose from 2 to up to 5 traits to filter the lists by");
    var traitGender = promptFor("Would you like to search by gender?", yesNo);
    var traitAge = promptFor("Would you like to search by age?", yesNo);
    var traitEyeColor = promptFor("Would you like to search by eyecolor?", yesNo);
    var traitWeight = promptFor("Would you like to search by weight?", yesNo);
    var traitOccupation = promptFor("Would you like to search by occupation?", yesNo);
    if (traitGender === "yes") {
        var gender = promptFor("What is their gender?", chars).toLowerCase();
        var people = searchByGender(people, gender);
    }
    if (traitAge === "yes") {
        var personAge = parseInt(promptFor("What is the person's age?", chars));
        people = searchByAge(people, personAge);
    }
    if (traitEyeColor === "yes") {
        var eyeColor = promptFor("What is the person's eyecolor?", chars).toLowerCase();
        people = searchByEyeColor(people, eyeColor);
    }
    if (traitWeight === "yes") {
        var weight = parseInt(promptFor("What is the person's weight?", chars));
        people = searchByWeight(people, weight);
    }
    if (traitOccupation === "yes") {
        var occupation = promptFor("What is the person's occupation?", chars).toLowerCase();
        people = searchByOccupation(people, occupation);
    }
    if (people.length > 1) {
        displayPeople(people);
    } else if (people.length === 1) {
        var foundPerson = people[0];
        return mainMenu(foundPerson, people);
    } else {
        alert("Couldnt find any results that match the search parameters");
        return app();
    }
}

function searchByGender(people, gender) {
    return people.filter(function (person) {
        if (person.gender === gender) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByAge(people, personage) {
    return people.filter(function (person) {
        var age = getAge(person);
        if (personage === age) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByEyeColor(people, color) {
    return people.filter(function (person) {
        if (person.eyeColor === color) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByWeight(people, weight) {
    return people.filter(function (person) {
        if (person.weight === weight) {
            return true;
        } else {
            return false;
        }
    });
}

function searchByOccupation(people, occupation) {
    return people.filter(function (person) {
        if (person.occupation === occupation) {
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

function findSiblings(foundPerson, people, foundSiblings = []) {
    foundSiblings = people.filter(function (sibling) {
        if (foundPerson.parents[0 && 1] === sibling.parents[0 && 1] && foundPerson.id !== sibling.currentSpouse && foundPerson.id !== sibling.id) {
            return true;
        } else {
            return false;
        }
    });
    if (foundSiblings.length === 0) {
        alert("No sibling listed in the system");
        return displayFamily(foundPerson, people);
    }
    var siblings = foundSiblings.forEach(function (sibling) {
        alert("Sibling: " + sibling.firstName + " " + sibling.lastName);
    });
    return displayFamily(foundPerson, siblings);
}

function findParents(foundPerson, people, foundParents = []) {
    foundParents = people.filter(function (parent) {
        if (foundPerson.parents[0] === parent.id || foundPerson.parents[1] === parent.id) {
            return true;
        } else {
            return false;
        }
    });
    if (foundParents.length === 0) {
        alert("No parents listed in system");
        return displayFamily(foundPerson, people);
    }
    foundParents.forEach(function (parent) {
        alert("Parent: " + parent.firstName + " " + parent.lastName);
    });
    return displayFamily(foundPerson, people);
}

function findSpouse(foundPerson, people, foundSpouse = []) {
    foundSpouse = people.filter(function (person) {
        if (foundPerson.id == person.currentSpouse) {
            return true;
        } else {
            return false;
        }
    });
    if (foundSpouse.length === 0) {
        alert("No spouse in system");
        return displayFamily(foundPerson, people)
    }
    foundSpouse.forEach(function (spouse) {
        alert("Spouse: " + spouse.firstName + " " + spouse.lastName);
    });
    return displayFamily(foundPerson, people);
}

function getDescendants(person, people, descendants = []) {
    descendants = people.filter(function (el) {
        if (person.id === el.parents[0] || person.id === el.parents[1]) {
            alert("Descendant: " + el.firstName + " " + el.lastName);
            return true;
        } else {
            return false;
        }
    });
    if (descendants.length === 0) {
        return descendants;
    } else {
        descendants.forEach(function (el) {
            return getDescendants(el, people, descendants);
        });
    }
    return displayFamily(person, descendants);
}

function displayFamily(person, people) {
    var whichFamily = promptFor("Would you like to see 'spouse', 'siblings', 'parents', or 'menu'?", chars).toLowerCase();
    if (whichFamily !== "spouse" && whichFamily !== "siblings" && whichFamily !== "parents" && whichFamily !== "menu") {
        return whichFamily;
    }
    switch (whichFamily) {
        case "spouse":
            findSpouse(person, people);
            return;
        case "siblings":
            findSiblings(person, people);
            return;
        case "parents":
            findParents(person, people);
            return;
        case "menu":
            return mainMenu(person, people);
        default:
            return app(person, people);
    }
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
    }
    while (!response || !valid(response));
    return response;
}

function yesNo(input) {
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
    return true;
}