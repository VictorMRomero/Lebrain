var oygCrosswordPuzzle = new oyCrosswordPuzzle(
    "5748185539682739085",
    "./oy-cword-1.0",
    "/a/a",
    "Crucigrama",
    "Instrucciones",
    [
        /*
        oyCrosswordClue(
            len,// length of the word in symnbols, i.e. for the word "Abstract" this will be 8
            clue,// the text of the word clue given to the user, i.e. for the word "Abstract" this will be "This factory creates an instance of several families of classes"
            answer,// thw word itself, i.e. "Abstract"; maybe be ommited, thus disabling the reveal function
            sign,// MD5 signature of the word itself with puzzle uid, i.e. for the word "Abstract" and uid "5748185539682739085" this will be "26f265b96e01081a5ef26a432eda9cff"
            dir,// word direction; 0 for horizontal and 1 for vertical
            xpos,// zero-based coordinate of the word on X axis, zero on the left, i.e. for the word "Abstract" this will be 12
            ypos// zero-based coordinate of the word on Y axis, zero at the top, i.e. for the word "Abstract" this will be 6
        )
        */
        //Colocar dentro de clue <span data-palabra='texto'>___________</span> si se quiere que se escriba la respuesta. También activar en oyMenu.js línea 537 a 552 (pistaCorrespondiente)
        new oyCrosswordClue(8, "Se refiere a los componentes físicos de un sistema informático", "hardware", "", 0, 0, 13),
        new oyCrosswordClue(13, "Se refiere a la cantidad de datos que un sistema puede procesar en un período de tiempo determinado.", "procesamiento", "", 0, 1, 18),
        new oyCrosswordClue(12, "Se refiere a la capacidad de un sistema para almacenar y acceder a datos.", "conectividad", "", 1, 2, 10),
        new oyCrosswordClue(13, "Factores relacionados con la propia naturaleza y estructura del terreno.", "escalabilidad", "", 0, 8, 4),
        new oyCrosswordClue(14, "Origina inestabilidad y est&aacute; asociado a la ausencia de cobertura vegetal.", "disponibilidad", "", 1, 8, 1),
        new oyCrosswordClue(15, "Factor externo que origina inestabilidad.", "infraestructura", "", 0, 14, 1),
        new oyCrosswordClue(13, "Factor interno que origina inestabilidad.", "visualizacion", "", 0, 15, 12),
        new oyCrosswordClue(9, "Factores que detonan la inestabilidad.", "seguridad", "", 1, 16, 0),
        new oyCrosswordClue(4, "Sin&oacute;nimo de deslizamiento.", "nube", "", 1, 23, 12),
        new oyCrosswordClue(14, "Herramienta que permite integrar y analizar informaci&oacute;n geogr&aacute;fica, permitiendo visualizar los datos obtenidos en un mapa a partir de la superposici&oacute;n de capas de informaci&oacute;n.", "almacenamiento", "", 1, 21, 4)
    ],
    40,//Al final se configura el tamaño de la cuadrícula
    35
);
/*
 //	here we configure puzzle options, callbacks and publisher information
 // publisher information
 //oygCrosswordPuzzle.publisherName = "por Adib";
 //oygCrosswordPuzzle.publisherURL = "http://www.google.com";
 // game exit URL
 //oygCrosswordPuzzle.leaveGameURL = "http://www.google.com";
 // this is how to turn off server support; score submission and action tracking will be disabled
 */
oygCrosswordPuzzle.canTalkToServer = false;

function retroalimentar(mensaje) {
    //document.getElementById("retroalimentacion").innerHTML = mensaje;
    console.log(mensaje);
}