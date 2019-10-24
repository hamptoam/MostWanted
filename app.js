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

function filterByTraits(people, filterArray = [], finalList = []) {
    alert("You can choose from 1 to up to 5 traits to filter the database by to find one or more people");
    var traitGender = promptFor("Would you like to search by gender?", yesNo);
    if (traitGender === "yes") {
        var gender = promptFor("What gender?", chars).toLowerCase();
        var genderList = searchByGender(people, gender);
        filterArray.push(genderList);
        if (traitAge === "no" && traitEyeColor === "no" && traitWeight === "no" && traitOccupation === "no") {
            genderList.forEach(function (person) {
                alert("Result: " + person.firstName + " " + person.lastName);
            });
            return app(people);
        }
    }
    var traitAge = promptFor("Would you like to search by age?", yesNo);
    if (traitAge === "yes") {
        var age = promptFor("What age?");
        var ageList = searchByAge(people, age);
        filterArray.push(ageList);
        if (traitGender === "no" && traitEyeColor === "no" && traitWeight === "no" && traitOccupation === "no") {
            ageList.forEach(function (person) {
                alert("Result: " + person.firstName + " " + person.lastName);
            });
            return app(people);
        }
    }
    var traitEyeColor = promptFor("Would you like to search by eyecolor?", yesNo);
    if (traitEyeColor === "yes") {
        var eyeColor = promptFor("What eyecolor?", chars).toLowerCase();
        var eyeColorList = searchByEyeColor(people, eyeColor);
        filterArray.push(eyeColorList);
        if (traitGender === "no" && traitAge === "no" && traitWeight === "no" && traitOccupation === "no") {
            eyeColorList.forEach(function (person) {
                alert("Result: " + person.firstName + " " + person.lastName);
            });
            return app(people);
        }
    }
    var traitWeight = promptFor("Would you like to search by weight?", yesNo);
    if (traitWeight === "yes") {
        var weight = promptFor("What weight?").parseInt();
        var weightList = searchByWeight(people, weight);
        filterArray.push(weightList);
        if (traitGender === "no" && traitAge === "no" && traitEyeColor === "no" && traitOccupation === "no") {
            weightList.forEach(function (person) {
                alert("Result: " + person.firstName + " " + person.lastName);
            });
            return app(people);
        }
    }
    var traitOccupation = promptFor("Would you like to search by occupation?", yesNo);
    if (traitOccupation === "yes") {
        var occupation = promptFor("What occupation?", chars).toLowerCase();
        var occupationList = searchByOccupation(people, occupation);
        filterArray.push(occupationList);
        if (traitGender === "no" && traitAge === "no" && traitEyeColor === "no" && traitWeight === "no") {
            occupationList.forEach(function (person) {
                alert("Result: " + person.firstName + " " + person.lastName);
            });
            return app(people);
        }
    }
     finalList = filterArray.filter(function (arrayperson) {
        if (person.id === id) {
            return true;
        } else {
            return false;
        }
    });
    if(finalList.length > 1)
    {
        finalList.forEach(function (person) {
            alert("Result: " + person.firstName + " " + person.lastName);
        });
    }
    if (finalList.length == 1) {
        var foundPerson = finalList[0];
        return mainMenu(foundPerson);
    }
    if(finalList.length == 0)
    {
        alert("No people found based on those specifications");
        return app();
    }
    return finalList;
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
        if (foundPerson.parents[0 || 1] === sibling.parents[0 || 1] && foundPerson.id !== sibling.currentSpouse && foundPerson.id !== sibling.id) {
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
        if (foundPerson.id === person.currentSpouse) {
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