  //Tabien avaus
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

let kaikkitilaukset

//Taulukko Tullet tilaukset -kohtaan
fetch("https://www.cc.puv.fi/~asa/cgi-bin/fetchOrders.py")
  .then(res => res.text())
  .then(teksti => Tilaustaulukko(teksti));

function Tilaustaulukko(txt) {
  console.log(txt);
  let tiedot = JSON.parse(txt);
  kaikkitilaukset = tiedot;
  for(let i = 0; i < tiedot.length; i++) {
    let tilaus = tiedot[i];
    TaulukkoN(tilaus, i);
  }
  }
  
function TaulukkoN(element, index, indeksi) {
  let taulukko = document.getElementById("taulukko");
  taulukko.insertAdjacentHTML("beforebegin", `<tr>
                                                <td onclick='avaa(${index})' style='text-decoration-line: underline; cursor: default;'>${element.orderid}</td>
                                                <td>${element.customerid}</td>
                                                <td>${element.customer}</td>
                                                <td id='sortdate'>${element.deliverydate}</td>
                                              </tr>`);

  let tuotteet = element.products;
  for(let j = 0; j < tuotteet.length; j++) {  
   let tuote = tuotteet[j];
   TuoteTaulukko(tuote);
  }  
}

//Tuotetietojen tuominen taulukkoon
function TuoteTaulukko(element) {
let tuotetaulukko = document.getElementById("tuotetaulukko");
tuotetaulukko.insertAdjacentHTML("beforebegin", `<tr>
                                                  <td>${element.code}</td>
                                                  <td>${element.product}</td><td>${element.description}</td><td>${element.suppliercode}</td><td>${element.unit_price}</td><td>${element.shelf_pos}</td>
                                              </tr>`)
}

//Hakukentän filtteröinti
function filterAll() {
  myFunction("tilaukset");
  filterP("tuotteet");
}
//Tilausluettelon filtteröinti
function myFunction() { 
  let input, filter, table, tr, i, txtValue;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("tilaukset");
  tr = table.getElementsByTagName("tr");

  // Loop
  for (i = 0; i < tr.length; i++) {
    let tdOrderid = tr[i].getElementsByTagName("td")[0];
    let tdCustomerid = tr[i].getElementsByTagName("td")[1];
    let tdCustomer = tr[i].getElementsByTagName("td")[2];
    if (tdOrderid || tdCustomerid || tdCustomer) {
      txtValue = tdOrderid.textContent || tdOrderid.innerText;
      txtValue2 = tdCustomerid.textContent || tdCustomerid.innerText;
      txtValue3 = tdCustomer.textContent || tdCustomer.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1 || txtValue3.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
//Tuoteluettelon filtteröinti - sama kuin tilaus
function filterP() {
  let input, filter, table, tr, i, txtValue;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("tuotteet");
  tr = table.getElementsByTagName("tr");

  // Loop
  for (i = 0; i < tr.length; i++) {
    let tdCode = tr[i].getElementsByTagName("td")[0];
    let tdProduct = tr[i].getElementsByTagName("td")[1];
    if (tdCode || tdProduct) {
      txtValue = tdCode.textContent || tdCode.innerText;
      txtValue2 = tdProduct.textContent || tdProduct.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

//Tilaus taulukon toimituspäivämäärien rajaaminen
function sortDate() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tilaukset");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[3];
      y = rows[i + 1].getElementsByTagName("td")[3];
      let date = x.innerHTML;
      let date2 = y.innerHTML;
      const MyArray = date.split("-");
      const MyArray2 = date2.split("-");
      let delivdate = new Date(MyArray[2], MyArray[1], MyArray[0]);
      let delivdate2 = new Date(MyArray2[2], MyArray2[1], MyArray2[0])
      if ((delivdate) > (delivdate2)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//Top button
function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrolltop.style.display = "block";
    scrolltop4.style.display = "block";
  } else {
    scrolltop.style.display = "none";
    scrolltop4.style.display = "none";
  }
}

function meneTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Tilausnäkymän avaaminen
function avaa(index, element) {
  document.getElementById("tilaukset").style.display = "none";
  document.getElementById("tilaukset").style.position = "none";
  document.getElementById("mySearch").style.display = "none";
  document.getElementById("kerailyValmis").style.display = "none";
  document.getElementById("printB").style.display = "none";

  document.getElementById("backB").style.display = "block";
  document.getElementById("keraily").style.display ="block";
  document.getElementsByClassName("box")[0].style.display = "block";

  document.getElementsByClassName("box")[1].style.display = "none";
  document.getElementsByClassName("box")[2].style.display = "none";
  console.log(index);
  console.log(kaikkitilaukset[index]);
  console.log(kaikkitilaukset[index].products); 
  //document.getElementById("tilausNaytto").innerHTML = "";
  //document.getElementById("tulleettuotteet").innerHTML ="";
  
  let tilaustaulukko = document.getElementById("tilausN");
  tilaustaulukko.insertAdjacentHTML("afterbegin", `<tr><td>Customer ID : ${kaikkitilaukset[index].customerid}</td></tr><tr><td>Customer : ${kaikkitilaukset[index].customer}</td></tr><tr><td>Invoice Address : ${kaikkitilaukset[index].invaddr}</td></tr><tr><td>Delivery Address : ${kaikkitilaukset[index].delivaddr}</td></tr><tr><td>Delivery Date : ${kaikkitilaukset[index].deliverydate}</td></tr>`);
  let tilaustaulukko2 = document.getElementById("tilausN2");
  tilaustaulukko2.insertAdjacentHTML("afterbegin", `<tr><td>Sales Person : ${kaikkitilaukset[index].respsalesperson}</td></tr><tr><td>Order ID : ${kaikkitilaukset[index].orderid}</td></tr>`);
  let tilaustaulukko3 = document.getElementById("tilausN3");
  tilaustaulukko3.insertAdjacentHTML("beforeend", `<tr><td>${kaikkitilaukset[index].comment}</td></tr>`);
  let tilaustaulukko4 = document.getElementById("tilausN4");
  tilaustaulukko4.insertAdjacentHTML("afterbegin", `<tr><td>Total : ${kaikkitilaukset[index].totalprice} €</td></tr>`);

  let valmistilaus = document.getElementById("valmistilaus");
  valmistilaus.insertAdjacentHTML("afterbegin", `<tr><td>Customer ID : ${kaikkitilaukset[index].customerid}</td></tr><tr><td>Customer : ${kaikkitilaukset[index].customer}</td></tr><tr><td>Invoice Address : ${kaikkitilaukset[index].invaddr}</td></tr><tr><td>Delivery Address : ${kaikkitilaukset[index].delivaddr}</td></tr><tr><td>Delivery Date : ${kaikkitilaukset[index].deliverydate}</td></tr>`);
  let valmistilaus2 = document.getElementById("valmistilaus2");
  valmistilaus2.insertAdjacentHTML("afterbegin", `<tr><td>Sales Person : ${kaikkitilaukset[index].respsalesperson}</td></tr><tr><td>Order ID : ${kaikkitilaukset[index].orderid}</td></tr>`);
  let valmistilaus3 = document.getElementById("valmistilaus3");
  valmistilaus3.insertAdjacentHTML("afterbegin", `<tr><td>Total : ${kaikkitilaukset[index].totalprice} €</td></tr>`);


//Tilausnäkymän tuotteet
let tuotetiedot = kaikkitilaukset[index].products;
  for(i = 0; i < tuotetiedot.length; i++) {
    let tuoteT = tuotetiedot[i];
    console.log(tuoteT);
    showP(tuoteT);
  }
};
function showP(element) {
let tilausTT = document.getElementById("tilatutT");
tilausTT.insertAdjacentHTML("beforeend",`<tr><td>${element.code}</td><td>${element.product}</td><td>${element.qty}</td><td>${element.unit_price}</td></tr>`);

let kerailytaulukko = document.getElementById("kerailyT");
kerailytaulukko.insertAdjacentHTML("beforeend",`<tr><td><input type="checkbox" id="kerailycheck"></td><td>${element.code}</td><td>${element.product}</td><td>${element.qty}</td></tr>`)

let valmisT = document.getElementById("valmistuote");
valmisT.insertAdjacentHTML("beforeend",`<tr><td>${element.code}</td><td>${element.product}</td><td>${element.qty}</td><td>${element.unit_price}</td></tr>`);
}

//Tilausnäkymästä takaisin valikkoon
function back() {
  document.getElementById("tilaukset").style.display = "block";
  document.getElementById("tilaukset").style.position = "relative";
  document.getElementById("mySearch").style.display = "block";

  document.getElementsByClassName("box")[0].style.display = "none";
  document.getElementsByClassName("box")[1].style.display = "none";
  document.getElementsByClassName("box")[2].style.display = "none";

  document.getElementById("backB").style.display = "none";
  document.getElementById("keraily").style.display ="none"
  document.getElementById("kerailyValmis").style.display = "none";
  document.getElementById("printB").style.display = "none";

  document.getElementById("tilausN").innerHTML = "";
  document.getElementById("tilausN2").innerHTML = "";
  document.getElementById("tilausN3").innerHTML = "<tr><th>Client's Comment</th><tr>";
  document.getElementById("tilausN4").innerHTML = "";
  document.getElementById("tilatutT").innerHTML = "<tr><th>Code</th><th>Product</th><th>Quantity</th><th>Unit Price</th></tr>";
  document.getElementById("kerailyT").innerHTML = "";
  document.getElementById("valmistuote").innerHTML = "<tr><th>Code</th><th>Product</th><th>Quantity</th><th>Unit Price</th></tr>";
  document.getElementById("valmistilaus").innerHTML = "";
  document.getElementById("valmistilaus2").innerHTML = "";
  document.getElementById("valmistilaus3").innerHTML = "";

  let txtarea = document.getElementById("kommentti");
  let btn = document.getElementById("backB");
  btn.addEventListener('click', function handleButtonClick() {
    txtarea.value = "";
  });

};
//Keräilytilaan siirtyminen
function keraily() {
  document.getElementById("tilaukset").style.display = "none";
  document.getElementById("backB").style.display = "none";
  document.getElementById("keraily").style.display = "none";
  document.getElementById("mySearch").style.display = "none";
  document.getElementById("printB").style.display = "none";

  document.getElementsByClassName("box")[0].style.display = "none";
  document.getElementsByClassName("box")[2].style.display = "none";

  document.getElementsByClassName("box")[1].style.display = "block";
  document.getElementById("kerailyValmis").style.display = "block";

  document.getElementById("tilausN").innerHTML = "";
  document.getElementById("tilatutT").innerHTML = "";

  document.getElementById("kerailycheck").required = true;

};

//Kun keräily on valmis -> Asiakasnäkymään siirtyminen & tulostus
function valmis() {
  document.getElementById("printB").style.display = "block";
  document.getElementById("asiakasN").style.display = "block";
  document.getElementById("backB").style.display = "block";

  document.getElementById("kerailytila").style.display = "none";
  document.getElementById("tilaukset").style.display = "none";
  document.getElementById("keraily").style.display = "none";
  document.getElementById("mySearch").style.display = "none";

  document.getElementsByClassName("box")[0].style.display = "none";
  document.getElementsByClassName("box")[1].style.display = "none";

  document.getElementById("kerailyValmis").style.display = "none";


  let kommentti = document.getElementById("kommentti").value;
  document.getElementById("kommentti1").innerHTML = "<strong>Collector's Comment : </strong>" + kommentti;
  if (kommentti == 0) {
    document.getElementById("kommentti1").innerHTML = ""}

}

//Tulostaminen
function printTab() {
  let tabToPrint = document.getElementById("asiakasN");
  newWin = window.open("");
  newWin.document.write(tabToPrint.outerHTML);
  newWin.print();
  newWin.close();
}

//Kirjaudu ulos
function KirjauduUlos() {
  location.replace("https://www.cc.puv.fi/~e2101454/carporting-sign_in.html");
}