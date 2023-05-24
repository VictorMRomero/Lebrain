const user = JSON.parse(localStorage.getItem('user'));
let idSubtemaActual = localStorage.getItem('idSubtema');
let idMateria = localStorage.getItem('idMateria');
let numSubtema = localStorage.getItem('numSubtema');
let todosSubtemas = JSON.parse(localStorage.getItem('subtemas'));
let idSigSubtema;

let timer;

if(todosSubtemas.subtemas[+numSubtema+1]){
  idSigSubtema = todosSubtemas.subtemas[+numSubtema+1]._id;
}



let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;
let malas = [];
let totalQuestions = 6;
let attempts = 1; // agregar variable attempts

//========================= Actualizar Usuario =============================================
const actualizarUsuario = () => {
fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`)
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error en la respuesta de la petición GET');
  }
  })
  .then(data => {
    
    localStorage.setItem('user', JSON.stringify(data));

    alert('Ya puedes pasar al siguiente tema');
    

    
    if(!idSigSubtema){
      window.location.href=`../certificado.html`;
    }else{
      window.location.href=`../negociosElectronicos1.html`;
    }


    })
  .catch(error => console.error(error));
}

//=============================== Actualizar Subtema =====================================================

const actualizarSubtema = () => {
  if(idSigSubtema){
    const subtemas = [{subtema: `${idSigSubtema}`, estado: true, calificacion: 0}];
    const materias = [{materia: `${idMateria}`, subtemas: subtemas}];
    const usuario = {materias: materias};
    
    const usuarioJSON = JSON.stringify(usuario);
    
    
    
    fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: usuarioJSON
    })//fetch
    .then(x => actualizarUsuario())
    .catch(error => {
      console.error('Ya tiene la materia registrada:', error);
      // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
      
    })
  }else{
    console.log('entro al else')
    actualizarUsuario();
  }
}

//=============================== Actualizar Subtema Hecho===============================================
const actualizarSubtemaHecho = (score) => {

  const subtemas = [{subtema: `${idSubtemaActual}`, estado: true, calificacion: score}];
  const materias = [{materia: `${idMateria}`, subtemas: subtemas}];
  const usuario = {materias: materias};

  const usuarioJSON = JSON.stringify(usuario);



  fetch(`https://lebrain.herokuapp.com/api/usuarios/${user.uid}`,{
    method: 'PUT',
    headers: {
        'Content-Type':'application/json'
    },
    body: usuarioJSON
})//fetch
.then(x => actualizarSubtema())
.catch(error => {
console.error('Ya tiene la materia registrada:', error);
  // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
})

  
  
  
}
//=============================== FIN Actualizar subtema==================================================
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
  }, 1000); 
});



let questions = quiz.sort(function(){
   return 0.5 - Math.random();
});
$(function(){
    
    // Codigo del Reloj

    let totalTime = 200;  //200 Segundos en total
    let min = 0;
    let sec = 0;
    let counter = 0;

    timer = setInterval( function(){
        counter++;
        min = Math.floor( (totalTime - counter) / 60) //Calculamos los minutos
        sec = totalTime - (min * 60) - counter //Calculamos los segundos

        // Se muestre en pantalla
        $(".timerBox span").text(min +" : "+sec)
        
        if(counter == totalTime)
        {
            alert("El tiempo terminó, presiona OK para ver el resultado");
            clearInterval(timer);
            //  result();
        }
    }, 1000); //Segundo de intervalo

    // Codigo del Reloj

    // Imprimimos preguntas
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
       
        malas.push(questions[index]);
        
    }
    $(".scoreBox span").text(Math.floor(score * (100/6)))
    $(".optionBox span").attr("onclick", "") // prevent selecting a different answer
    
    setTimeout(function() {
        showNext();
    },1000);
}

// Function to check Answer

// Show next Question
let num = 1
function showNext(){
    if(index <= 4)
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

        if (j == 1 && num < 10 && attempts == 1 && !confirm("Aún no has terminado, presiona OK y te mostrará el resultado.")) {
          return;
        } else if (j == 1 && num < 10 && attempts == 2 && !confirm("Aún no has terminado, presiona OK y te mostrará el resultado de tu segundo intento.")) {
          return;
        }
        clearInterval(timer);
        result();
}
function result()
{
  //questionScreen.style.display = "none";
  
  score = Math.floor(score * (100/6))

  $("#totalQuestion").text(totalQuestions)
  $("#questionScreen").hide()
  $(".scoreBoard span").text(score)
  $("#resultScreen").show()
  $("#attemptQuestion").text(attempt)
  $("#correctQuestion").text(Math.floor(score))
  $("#wrongAnswers").text(wrong)

  //resultScreen.style.display = "block";

  
  const siguiente = document.querySelector('.denegado');
  const ocultar = document.querySelector('.ocultar');
  

  attempts = localStorage.getItem('attempts')

  if (score <= 60 && attempts < 2) { // si puntaje menor a 6 y es el primer intento
    $(".mensaje span").text("Lo siento, tienes menos de 60 puntos. Tienes una segunda oportunidad.");
    siguiente.textContent = "Reintentar";
    attempts++; // aumentar el número de intentos
    localStorage.setItem('attempts', JSON.stringify(attempts));
    siguiente.addEventListener("click", () => {
      window.location.href = "questions.html";
    });

  } else if(score <= 60   && attempts >= 2){
    $(".mensaje span").text("Lo siento, tienes menos de 60 puntos. Y ya no tienes otra oportunidad");
    siguiente.textContent = "Verificar respuestas";
    attempts = 1;
    localStorage.setItem('attempts', JSON.stringify(attempts));
    siguiente.addEventListener("click", () => {
      
      localStorage.setItem('malas', JSON.stringify(malas));
      
      window.location.href = "../verificar.html";
    });
  } else if(score >= 60){
    $(".mensaje span").text("Fantastico, puedes avanzar al siguiente tema");
    siguiente.textContent = "Terminar";
    ocultar.style.display = 'none';
    siguiente.addEventListener("click", (e) => {
      e.preventDefault();
      actualizarSubtemaHecho(score);
    });
  }          
}


// Show Final Result





