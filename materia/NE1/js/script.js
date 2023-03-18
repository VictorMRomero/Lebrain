


let index =0;
let attempt = 0;
let score = 0;
let wrong = 0;
let totalQuestions = 10;

  // Mostrar la animación de carga
function showLoader() {
  document.getElementById("loader").style.display = "block";
}

// Ocultar la animación de carga
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
// Mostrar la animación de carga cuando la página se carga
window.addEventListener("load", function() {
  showLoader();
});

// Ocultar la animación de carga después de que la página se carga
window.addEventListener("load", function() {
   setTimeout(function() {
    hideLoader();
    document.getElementById("questionScreen").style.display = "block";
  }, 3000); 
});

let questions = quiz.sort(function(){
   return 0.5 - Math.random();
});
$(function(){
    
    // Timer code

    let totalTime = 200;  //200 seconds total
    let min = 0;
    let sec = 0;
    let counter = 0;

    let timer = setInterval( function(){
        counter++;
        min = Math.floor( (totalTime - counter) / 60) //calculating minutes
        sec = totalTime - (min * 60) - counter //calculating seconds

        // display on screen
        $(".timerBox span").text(min +" : "+sec)

        if(counter == totalTime)
        {
            alert("El tiempo terminó, presiona OK para ver el resultado");
            result();
            clearInterval(timer);
        }
    }, 1000); //Counter set for 1 sec interval
    // Timer code

    // Print Questions
    printQusetions(index);
});

// Function to Print Questions

function printQusetions(i){
    // console.log(quiz[i]);

    $(".questionBox").text(questions[i].question)
    $(".optionBox span").eq(0).text(questions[i].option[0])
    $(".optionBox span").eq(1).text(questions[i].option[1])
    $(".optionBox span").eq(2).text(questions[i].option[2])
    $(".optionBox span").eq(3).text(questions[i].option[3])
}

function generateRan(){
    var max = 4;
    var random = [];
    for(var i = 0;i<max ; i++){
        var temp = Math.floor(Math.random()*max);
        if(random.indexOf(temp) == -1){
            random.push(temp);
        }
        else
         i--;
    }
    return random;
}
// Function to Print Questions


// Function to check Answer

function checkAnswer(option){
    attempt++;

    let optionClicked = $(option).data("opt");
    if(optionClicked == questions[index].answer)
    {
        $(option).addClass("correct");
        score++;
    }
    else
    {
        $(option).addClass("wrong")
        wrong++;
    }
    $(".scoreBox span").text((score * 10))
    $(".optionBox span").attr("onclick", "") // prevent selecting a different answer
    
    setTimeout(function() {
        showNext();
    },1000);
}

// Function to check Answer

// Show next Question
let num = 1
function showNext(){
    if(index <= 8)
    {
        index++;
        num++;
        // console.log(num);
        printQusetions(index);
        $(".con button").eq(0).removeClass("disabled")
        $(".optionBox span").removeClass();
        $(".optionBox span").attr("onclick", "checkAnswer(this)")
        $(".count span").text(num)
    }
    else{
        setTimeout(function() {
            showResult(0);
        },500);
    }
}


function showResult(j){
    if(
        j == 1 && num < 10 && 
        !confirm("Aún no has terminado, presiona OK y te mostrara el resultado.")
    ){
        return;
    }
    result();
}
function result()
{
        // questionScreen.style.display = "none";
        $("#totalQuestion").text(totalQuestions)
        $("#questionScreen").hide()
        $(".scoreBoard span").text((score * 10))
        $("#resultScreen").show()
        $("#attemptQuestion").text(attempt)
        $("#correctQuestion").text(score)
        $("#wrongAnswers").text(wrong)
        // resultScreen.style.display = "block";
}
// Show Final Result