"use strict";

function app(people) {

    var searchType = promptFor("Do you know the name of the person you are looking for? Enter yes or no", yesNo);
    switch (searchType) {
        case 'yes':
            var foundPerson = searchByName(people);
            mainMenu(foundPerson, people);
            break;
        case 'no':
            var foundPerson = oneOrMulti(people);
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

function oneOrMulti(people) {

    var filterList = [];

    var personOrPeople = promptFor("Would you like to search for 'one' person, or 'multi'?").toLowerCase();
    switch (personOrPeople) {
        case "one":
            searchForPerson(people);
            break;
        case "multi":
            filterByTraits(people);
            break;
    }
}

function filterByTraits(people) {

    var filterArray = [];
    var sortedArray = removeUniqueVariables.sortedArray;

    alert("You can choose from 2 to up to 5 traits to filter the lists by");
    var traitGender = promptFor("Would you like to search by gender?", yesNo);
    var traitAge = promptFor("Would you like to search by age?", yesNo);
    var traitEyeColor = promptFor("Would you like to search by eyecolor?", yesNo);
    var traitWeight = promptFor("Would you like to search by weight?", yesNo);
    var traitOccupation = promptFor("Would you like to search by occupation?", yesNo);

    if (traitGender === "yes") {
        var gender = promptFor("What is their gender?", chars).toLowerCase();
        var genderList = searchByGender(people, gender);
        filterArray.push(genderList);
    }
    if (traitAge === "yes") {
        var personage = promptFor("What is the person's age?", chars);
        var ageList = searchByAge(people, personage);
        filterArray.push(ageList);
    }
    if (traitEyeColor === "yes") {
        var personEyeColor = promptFor("What is the person's eyecolor?");
        var eyeColorList = searchByEyeColor(people, personEyeColor);
        filterArray.push(eyeColorList);
    }
    if (traitWeight === "yes") {
        var weight = promptFor("What is the person's weight?", chars).toLowerCase();
        var weightList = searchByWeight(people, weight);
        filterArray.push(weightList);
    }
    if (traitOccupation === "yes") {
        var occupation = promptFor("What is the person's occupation?", chars);
        var occupationList = searchByOccupation(people, occupation);
        filterArray.push(occupationList);
    }
    for(var i = 0; i < sortedArray.length; i++)
    {
        alert("Results: " + i.firstName + " " + i.lastName);
    }
    return app();
}

function removeUniqueVariables() {
    var reduceList = filterByTraits.filterArray;
    var sortedList = reduceList.slice().sort();

    var sortedArray = [];
    for (var i = 0; i < sortedList.length - 1; i++) {
        if (sortedList[i + 1] == sortedList[i]) {
            sortedArray.push(sortedList[i]);
        }
    }
    console.log(sortedArray);
    return sortedArray;
}

function searchForPerson(people) {

    var knowGender = promptFor("Do you know the person's gender? yes or no", yesNo);
    if (knowGender == "yes") {
        var gender = promptFor("What is their gender?", chars).toLowerCase();
        var genderList = searchByGender(people, gender);
        if (genderList.length == 1) {
            var foundPerson = genderList[0];
            return mainMenu(foundPerson);
        }
        var genderlist = promptFor("Would you like to see a list of people by this gender?", yesNo);
        if (genderlist === "yes") {
            for (var i = 0; i < genderList.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
        } else {
            return genderList;
        }
    }
    var knowAge = promptFor("Do you know the person's age?", yesNo);
    if (knowAge === "yes") {
        var personage = promptFor("What is the person's age?", chars);
        var ageList = searchByAge(people, personage);
        if (ageList.length == 1) {
            var foundPerson = ageList[0];
            return mainMenu(foundPerson);
        }
        var agelist = promptFor("Would you like to see a list of people by this age?", yesNo);
        if (agelist === "yes") {
            for (var i = 0; i < ageList.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
        } else {
            return ageList;
        }
    }
    var knowEyeColor = promptFor("Do you know the person's eyecolor? yes or no", yesNo);
    if (knowEyeColor == "yes") {
        var color = promptFor("What is the person's eyecolor?", chars).toLowerCase();
        var eyecolorList = searchByEyeColor(people, color);
        if (eyecolorList.length == 1) {
            var foundPerson = eyecolorList[0];
            return mainMenu(foundPerson);
        }
        var eyecolorlist = promptFor("Would you like to see a list of people by this eyecolor?", yesNo);
        if (eyecolorlist === "yes") {
            for (var i = 0; i < ageList.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
        } else {
            return eyecolorList;
        }
    }
    var knowWeight = promptFor("Do you know the person's weight? yes or no", yesNo);
    if (knowWeight == "yes") {
        var weight = promptFor("What is the person's weight?", chars).toLowerCase();
        var weightList = searchByWeight(people, weight);
        if (weightList.length == 1) {
            var foundPerson = weightList[0];
            return mainMenu(foundPerson);
        }

        var weightlist = promptFor("Would you like to see a list of people by this weight?", yesNo);
        if (weightlist === "yes") {
            for (var i = 0; i < weightList.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
        } else {
            return weightList;
        }
    }
    var knowOccupation = promptFor("Do you know the person's occupation? yes or no", yesNo);
    if (knowOccupation == "yes") {
        var occupation = promptFor("What is the person's occupation?", chars);
        var occupationList = searchByOccupation(people, occupation);
        if (occupationList.length == 1) {
            var foundPerson = peopleList[0];
            return mainMenu(foundPerson);
        }

        var occupationlist = promptFor("Would you like to see a list of people by this occupation?", yesNo);
        if (occupationlist === "yes") {
            for (var i = 0; i < occupationList.length; i++) {
                alert(i.firstName + " " + i.lastName);
            }
        } else {
            return occupationList;
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

function findSiblings(foundPerson, people, foundSiblings = []) {
    var foundSiblings = people.filter(function (sibling) {
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
    } while (!response || !valid(response));
    return response;
}

function yesNo(input) {
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
    return true;
}