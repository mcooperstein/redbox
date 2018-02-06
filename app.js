setTimeout(function () {
    $("h1").css({
        "font-size": "48px",
        "background-color": "yellow",
        "padding": "50px",
        "margin": 0
    })
}, 2000)

/*var movies = read('films.txt').split("\n");
console.log(movies);*/

//fetch('films.txt').then(response => response.text()).then(text => console.log(text));

/*var fs = require("fs");
fs.readFile("./films.txt", function (text) {
    var textByLine = text.split("\n")
})*/

/*function createArr(file) {
    var arr = read(file).split("\n");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim()
    }
    return arr;
}
var movies = createArr("films.txt")*/

var films = ["The Shawshank Redemption\nThe Godfather\nThe Godfather: Part II\nPulp Fiction\nThe Good, the Bad and the Ugly\n12 Angry Men\nSchindler's List\nThe Dark Knight\nThe Lord of the Rings: The Return of the King\nFight Club\nStar Wars: Episode V - The Empire Strikes Back\nOne Flew Over the Cuckoo's Nest\nThe Lord of the Rings: The Fellowship of the Ring\nInception\nGoodfellas\nStar Wars\nSeven Samurai\nThe Matrix\nForrest Gump\nCity of God"]
var myBlob = new Blob(films)
var movies = new FileReader();
var moviesArr;

function List() {
    this.list = [];
    this.position = 0;
    this.listSize = 0;
}

//return current position in list
List.prototype.currPos = function () {
    return this.position;
};

//clear all elements in the list
List.prototype.clear = function () {
    /*this.list = [];
    this.position = 0;
    this.listSize = 0;*/
    this.list.length = this.position = 0;
};


// insert element after specified target element in the list
List.prototype.insertAfter = function (after, element) {
    var target = this.find(after);
    if (target > -1) {
        this.list.splice(target + 1, 0, element);
        this.listSize++;
        return true;
    }
};

// insert element before specified target element in the list
List.prototype.insertBefore = function (before, element) {
    var target = this.find(before);
    if (target > 0) {
        this.list.splice(target, 0, element);
        this.listSize++;
        return true;
    }
}

//add element at the end of the list and incremenet listSize by 1
List.prototype.append = function (element) {
    this.list[this.listSize++] = element;
}

//remove specified element in the list
List.prototype.remove = function (element) {
    var target = this.find(element);
    if (target > -1) {
        this.list.splice(target, 1);
        this.listSize--;
        return true;
    }
}

//returns the number of elements in the list
List.prototype.length = function () {
    return this.listSize;
}

// checks to see if list is empty
List.prototype.isEmpty = function () {
    if (this.listSize < 1) {
        return true;
    } else {
        return false;
    }
}

// find and return element's position in the list
List.prototype.find = function (element) {
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i] == element) {
            return i;
        }
    }
    return -1;
}

// check to see if element is in the list
List.prototype.contains = function (element) {
    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i] == element) {
            //return true;
            alert(element + " is in the list of movies")
            return true;
        }
    }
    //return false;
    alert(element + " is NOT in the list of movies")
    return false;
}

// move current position to the front of the list
List.prototype.head = function () {
    this.position = 0;
}

// move current position to end of list
List.prototype.tail = function () {
    this.position = this.listSize;
}

// set current position on step left/back in the list (if not at the first element)
List.prototype.prev = function () {
    if (this.position !== 0) {
        this.position--;
    }
}

//Set current position on step right in the list (if not at end of list)
List.prototype.next = function () {
    if (this.position !== (this.listSize - 1)) {
        this.position++;
    }
}

//move current position to specified position
List.prototype.moveTo = function (position) {
    if (position >= 0 && position <= (this.listSize - 1)) {
        this.position = position;
    }
}

// return string representation of the list
List.prototype.toString = function () {
    return this.list.toString();
}

//
List.prototype.getElement = function () {
    return this.list[this.position];
}

var movieList = new List();
var customers = new List();
$("#listOfMovies").hide();
movies.readAsText(myBlob);
setTimeout(function () {
    //console.log(movies.result);
    //createArr();
    generateMovieList();
}, 1000)

/*function createArr() {
    moviesArr = movies.result.split("\n");
    //console.log(moviesArr);
}*/

function generateMovieList() {
    moviesArr = movies.result.split("\n");
    for (var i = 0; i < moviesArr.length; i++) {
        $("ol").append("<li>" + moviesArr[i] + "</li>");
        movieList.append(moviesArr[i]);
    }
    console.log(movieList);
}

function showMovies() {
    $("ol").empty();
    for (var i = 0; i < moviesArr.length; i++) {
        $("ol").append("<li>" + moviesArr[i] + "</li>");
    }
}

//show list of movies
$("#btn1").click(function () {
    showMovies();
    $("#listOfMovies").show();
});
//search to see if movie is in list
$("#btn4").click(function () {
    var userSearch = $("#search").val();
    movieList.contains(userSearch);
});
//requires password to be able to add movie to list
$("#add").click(function () {
    var password = prompt("Enter the validation/permission code");
    if (password == 1234) {
        $('#btn5').prop("disabled", false);
    }
});
//add movie to list
$("#btn5").click(function () {
    var userAdd = $("#add").val();
    if (userAdd.length > 0) {
        movieList.append(userAdd);
        moviesArr.push(userAdd);
        console.log(movieList);
        if ($("ol").show()) {
            showMovies();
        }
        $("#add").val("");
    }

});
//remove movie from list
$("#btn2").click(function () {
    $("#listOfMovies").show();
    setTimeout(function () {
        var checkOut = prompt("Enter the number of the movie you would like to check out");
        if ($("ol li:nth-child(" + checkOut + ")").hasClass("white")) {
            alert("That movie is currently checked out/unavailable")
        } else {
            $("ol li:nth-child(" + checkOut + ")").addClass("white");
            var nameOfMovie = $("ol li:nth-child(" + checkOut + ")").html();
            movieList.remove(nameOfMovie);
            console.log(movieList);
        }
    }, 250)
});
//insert movie back into list
$("#btn3").click(function () {
    $("#listOfMovies").show();
    setTimeout(function () {
        var returning = prompt("Enter the number of the movie that you are returning");
        if ($("ol li:nth-child(" + returning + ")").hasClass("white")) {
            var nameOfMovieReturned = $("ol li:nth-child(" + returning + ")").html();
            var after = $("ol li:nth-child(" + (returning - 1) + ")").html();
            movieList.insertAfter(after, nameOfMovieReturned);
            $("ol li:nth-child(" + returning + ")").removeClass("white");
        } else {
            alert("Error: That movie is already in stock");
        }
        console.log(movieList);
    }, 250)

});
