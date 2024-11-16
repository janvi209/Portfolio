function Kirjaudu() {
    let ktunnus = "pov@carporting.fi";
    let salasana = 1234;
    let kirjtunnus = document.getElementById("tunnus").value;
    let kirjsalasana = document.getElementById("salsana").value;
    if (ktunnus == kirjtunnus && salasana == kirjsalasana) {
        location.replace("https://www.cc.puv.fi/~e2101454/Carporting.html");
    } else {
        document.getElementById("etukom").style.display = "block";
    }    
}