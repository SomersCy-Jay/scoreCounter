'use strict';
const lanIP = `${window.location.hostname}:5000`;
console.log(lanIP);
const socket = io(lanIP);

let htmlHisString;
let aantal = 0;
let score1 = 0;
let score2 = 0;
let id1;
let id2;
let naamSpeler1;
let naamSpeler2;

//#region ***  Callback-Visualisation - show___         ***********
const showSpelers = function (jsonObject) {
  let htmlLijst = document.querySelector('.js-select-speler');
  let htmlLijst2 = document.querySelector('.js-select-speler2');
  let htmlstring = '';
  console.log(jsonObject);
  for (const i of jsonObject) {
    const naam = i.naam;
    const ID = i.id;
    htmlstring += `<option value="${ID}">${naam}</option>`;
  }

  htmlLijst.innerHTML = htmlstring;
  htmlLijst2.innerHTML = htmlstring;
};

const showMatchen = function (jsonObject) {
  console.log(jsonObject);
  let htmlWeergave = document.querySelector('.js-match');
  let htmlstring = `<tr>
    <th>ID</th>
    <th>Speler 1</th>
    <th>Speler 2</th>
    <th>Uitslag</th>
    <th>Verloop</th>
    <th class="c-match-delete">Verwijderen</th>
    
    </tr>`;

  for (const i of jsonObject) {
    const datum = i.datum;
    const ID = i.idwedstrijd;
    const SS1 = i.scoreSpeler1;
    const SS2 = i.scoreSpeler2;
    const speler1 = i.speler1;
    const speler2 = i.speler2;

    htmlstring += `
        <tr>
        <td>${ID}</td>
        <td>${speler1}</td>
        <td>${speler2}</td>
        <td>${SS1}-${SS2}</td>
        
        <td><a href="historiek_match.html?idwedstrijd=${ID}">Verloop</a></td>
        <td>
            <svg class="c-match-delete c-match__delete-symbol js-delete-match" data-matchid="${ID}"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                </path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        </td>
        </tr>`;
  }
  htmlWeergave.innerHTML = htmlstring;
  listenToClickDeleteMatch();
};

const showNamenVoorHistoriek = function (jsonObject) {
  let htmlWeergave = document.querySelector('.js-his');

  const speler1 = jsonObject.speler1;
  const speler2 = jsonObject.speler2;
  const ID = jsonObject.idwedstrijd;

  htmlHisString = `<tr>
    <th>Gescoord door</th>
    <th>Score ${speler1}</th>
    <th>Score ${speler2}</th>
    <th>snelheid (cm/s)</th>
    </tr>`;

  htmlWeergave.innerHTML = htmlHisString;
  getHistoriek(ID);
};

const showHistoriek = function (jsonObject) {
  console.log(jsonObject);
  let htmlWeergave = document.querySelector('.js-his');

  for (const i of jsonObject) {
    const naam = i.naam;
    const SS1 = i.scoreSpeler1;
    const SS2 = i.scoreSpeler2;
    const snelheid = i.snelheid;

    htmlHisString += `<tr>
        <td>${naam}</td>
        <td>${SS1}</td>
        <td>${SS2}</td>
        <td>${snelheid}</td>
        </tr>`;
  }
  htmlWeergave.innerHTML = htmlHisString;
};

const showSpelersOverzicht = function (jsonObject) {
  console.log(jsonObject);
  let htmlWeergave = document.querySelector('.js-overzicht-spelers');
  let htmlstring = `<tr>
    <th>ID</th>
    <th>Naam</th>
    <th>Verwijderen</th>
    </tr>`;
  for (const i of jsonObject) {
    const naam = i.naam;
    const ID = i.id;
    htmlstring += `<tr>
        <td>${ID}</td>
        <td>${naam}</td>
        <td><svg class="c-match__delete-symbol js-delete-speler" data-spelerid="${ID}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg></td>
    </tr>`;
  }
  htmlWeergave.innerHTML = htmlstring;
  listenToClickDeleteSpeler();
};

const showH2H = function (jsonObject) {
  let aantalM1 = 0;
  let aantalM2 = 0;
  console.log(jsonObject);
  let htmlWeergave = document.querySelector('.js-overzicht-h2h');
  let htmlstring = `<tr>
    <th>Speler 1</th>
    <th>Speler 2</th>
    <th>Uitslag</th>
    </tr>`;

  if (jsonObject.length > 0) {
    for (let i of jsonObject) {
      let naam1 = i.naam1;
      let naam2 = i.naam2;
      let speler1 = i.speler1;
      let speler2 = i.speler2;
      let SS1 = i.scoreSpeler1;
      let SS2 = i.scoreSpeler2;

      if (id1 == speler1 && SS1 > SS2) {
        aantalM1 = aantalM1 + 1;
      } else if (id1 == speler2 && SS2 > SS1) {
        aantalM1 = aantalM1 + 1;
      } else if (id2 == speler1 && SS1 > SS2) {
        aantalM2 = aantalM2 + 1;
      } else if (id2 == speler2 && SS2 > SS1) {
        aantalM2 = aantalM2 + 1;
      }

      htmlstring += `<tr>
            <td>${naam1}</td>
            <td>${naam2}</td>
            <td>${SS1}-${SS2}</td>
            </tr>`;
    }
    console.log(aantalM1);
    console.log(aantalM2);

    document.querySelector('.js-h2h-spelers').innerHTML = `<table class="u-no-bb">
    <tr>
        <th>${naamSpeler1}</th>
        <th>${aantalM1}</th>
    </tr>
    <tr>
        <th>${naamSpeler2}</th>
        <th>${aantalM2}</th>
    </tr>
</table>`;

    htmlWeergave.innerHTML = htmlstring;
  } else {
    swal('Oeps!', ', Deze spelers hebben nog nooit een match tegen elkaar gespeeld!', 'error');
  }
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********
const callbackAddMatch = function (data) {
  console.log('Toevoegen succesvol');
};

const callbackAddPlayer = function (data) {
  console.log('Speler Toegevoegd!');
  swal('Succes!', ', Speler is succesvol toegevoegd!', 'success');
};

const callbackDeleteMatch = function (data) {
  console.log('Match succesvol verwijderd!');
  getMatchen();
};

const callbackDeleteSpeler = function (data) {
  console.log('Speler succesvol verwijderd!');
  getSpelersOverzicht();
};
//#endregion

//#region ***  Data Access - get___
const getSpelers = function () {
  handleData(`http://${lanIP}/api/v1/spelers`, showSpelers);
};

const getMatchen = function () {
  handleData(`http://${lanIP}/api/v1/gespeelde-matchen`, showMatchen);
};

const getHistoriek = function (ID) {
  handleData(`http://${lanIP}/api/v1/historiek/${ID}`, showHistoriek);
};

const getSpelersOverzicht = function () {
  handleData(`http://${lanIP}/api/v1/spelers`, showSpelersOverzicht);
};

const getNamenVoorHistoriek = function (ID) {
  handleData(`http://${lanIP}/api/v1/namen_match/${ID}`, showNamenVoorHistoriek);
};

const getH2H = function (speler1, speler2) {
  id1 = speler1;
  id2 = speler2;
  handleData(`http://${lanIP}/api/v1/H2H/${speler1}-${speler2}`, showH2H);
};
//#endregion

const veranderingScore = function (soort) {
  if (soort == 'speler 1 plus') {
    let SS1 = document.querySelector('.u-p-groot-rood');
    score1 = score1 + 1;
    SS1.innerHTML = score1;
    socket.emit('F2B_verandering_score', '1 ' + score1);
  } else if (soort == 'speler 1 min') {
    let SS1 = document.querySelector('.u-p-groot-rood');
    if (score1 > 0) {
      score1 = score1 - 1;
      SS1.innerHTML = score1;
      socket.emit('F2B_verandering_score', '1 ' + score1);
    }
  } else if (soort == 'speler 2 plus') {
    let SS2 = document.querySelector('.u-p-groot-blauw');
    score2 = score2 + 1;
    SS2.innerHTML = score2;
    socket.emit('F2B_verandering_score', '2 ' + score2);
  } else if (soort == 'speler 2 min') {
    let SS2 = document.querySelector('.u-p-groot-blauw');
    if (score2 > 0) {
      score2 = score2 - 1;
      SS2.innerHTML = score2;
      socket.emit('F2B_verandering_score', '2 ' + score2);
    }
  }
};

//#region ***  Event Listeners - listenTo___            ***********

const listenToSocketStart = function () {
  socket.on('connect', function () {
    console.log(`Verbonden met socket webserver`);
  });

  socket.on('B2F_ip', function (adres) {
    let htmlIP = document.querySelector('.js-ip');
    htmlIP.innerHTML = adres;
  });
};

const listenToSocket = function () {
  socket.on('B2F_verandering_score', function (jsonObject) {
    console.log(jsonObject);
    score1 = jsonObject.scoreSpeler1;
    score2 = jsonObject.scoreSpeler2;
    const snelheid = jsonObject.snelheid;
    let SS1 = document.querySelector('.u-p-groot-rood');
    let SS2 = document.querySelector('.u-p-groot-blauw');
    let htmlsnelheid = document.querySelector('.js-snelheid');

    SS1.innerHTML = score1;
    SS2.innerHTML = score2;
    htmlsnelheid.innerHTML = `${snelheid} cm/s`;
  });

  socket.on('B2F_badged', function () {
    aantal = aantal + 1;
    if (aantal % 2 == 0) {
      let htmlknoppen = document.querySelector('.js-buttons');
      htmlknoppen.classList.add('u-hide');
    } else {
      let htmlknoppen = document.querySelector('.js-buttons');
      htmlknoppen.classList.remove('u-hide');
    }
  });

  socket.on('B2F_gedaan', function () {
    swal(
      {
        title: 'De match is afgelopen!',
        text: 'U word binnen 3 seconden omgeleid naar de homepage.',
        timer: 3000,
        showConfirmButton: false,
      },
      function () {
        window.location.href = 'index.html';
      }
    );
  });
};

const listenToClickPlay = function () {
  const btn = document.querySelector('.js-match-start');
  btn.addEventListener('click', function () {
    let htmlLijst = document.querySelector('.js-select-speler');
    let htmlLijst2 = document.querySelector('.js-select-speler2');
    let htmlScorebord = document.querySelector('.js-scorebord');
    const speler1 = htmlLijst.options[htmlLijst.selectedIndex].text;
    const speler2 = htmlLijst2.options[htmlLijst2.selectedIndex].text;

    if (speler1 != speler2) {
      socket.emit('F2B_nieuweMatch');
      let htmlSpelersKiezen = document.querySelector('.js-select-spelers');
      htmlSpelersKiezen.classList.add('u-hide');
      let htmlScoreWeergeven = document.querySelector('.js-score-weergeven');
      htmlScoreWeergeven.classList.remove('u-hide');
      let htmlDisplay = document.querySelector('.js-display');
      htmlDisplay.classList.add('u-display--score');

      htmlScorebord.innerHTML = `<div class="o-layout__item u-1-of-2">
          <p class="u-ib">
              ${htmlLijst.options[htmlLijst.selectedIndex].text}
          </p>
          <p class="u-p-groot-rood">
              0
          </p>
      </div>
      <div class="o-layout__item u-1-of-2 o-layout--align-center">
          <p class="u-ib2">
              ${htmlLijst2.options[htmlLijst2.selectedIndex].text}
          </p>
          <p class="u-p-groot-blauw">
              0
          </p>
      </div>`;

      const body = JSON.stringify({
        speler1: document.querySelector('.js-select-speler').value,
        speler2: document.querySelector('.js-select-speler2').value,
      });

      handleData(`http://${lanIP}/api/v1/create-match`, callbackAddMatch, null, 'POST', body);
    } else {
      swal('Oeps!', 'U heeft per ongeluk 2 keer dezelfde speler gekozen!', 'error');
    }
  });
};

const listenToClickVeranderScore = function () {
  const btnSpeler1Plus = document.querySelector('.js-speler1Plus');
  btnSpeler1Plus.addEventListener('click', function () {
    console.log('Speler 1 +1');
    veranderingScore('speler 1 plus');
  });

  const btnSpeler1Min = document.querySelector('.js-speler1Min');
  btnSpeler1Min.addEventListener('click', function () {
    console.log('Speler 1 -1');
    veranderingScore('speler 1 min');
  });

  const btnSpeler2Plus = document.querySelector('.js-speler2Plus');
  btnSpeler2Plus.addEventListener('click', function () {
    console.log('Speler 2 +1');
    veranderingScore('speler 2 plus');
  });

  const btnSpeler2Min = document.querySelector('.js-speler2Min');
  btnSpeler2Min.addEventListener('click', function () {
    console.log('Speler 2 -1');
    veranderingScore('speler 2 min');
  });
};

const listenToClickToevoegen = function () {
  const btn = document.querySelector('.js-add-speler');
  btn.addEventListener('click', function () {
    const body = JSON.stringify({
      naam: document.querySelector('.js-add-naam').value,
    });

    handleData(`http://${lanIP}/api/v1/create-speler`, callbackAddPlayer, null, 'POST', body);
  });
};

const listenToClickDeleteMatch = function () {
  const buttons = document.querySelectorAll('.js-delete-match');
  for (const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-matchid');
      console.log(id);
      swal({ title: 'Deze match zal permanent verwijderd worden!', text: 'Weet u zeker dat u dit wilt doen?', showCancelButton: true, confirmButtonColor: '#DD6B55', confirmButtonText: 'Verwijder match', cancelButtonText: 'annuleren', closeOnConfirm: false, closeOnCancel: false }, function (isConfirm) {
        if (isConfirm) {
          handleData(`http://${lanIP}/api/v1/delete-match/${id}`, callbackDeleteMatch, null, 'DELETE');
          swal('Match verwijderd', 'De match is permanent verwijderd!', 'success');
        } else {
          swal('Geannuleerd', 'Match is niet verwijderd!', 'error');
        }
      });
    });
  }
};

const listenToClickDeleteSpeler = function () {
  const buttons = document.querySelectorAll('.js-delete-speler');
  for (const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-spelerid');
      swal({ title: 'Deze speler zal permanent verwijderd worden!', text: 'Weet u zeker dat u dit wilt doen?', showCancelButton: true, confirmButtonColor: '#DD6B55', confirmButtonText: 'Verwijder speler', cancelButtonText: 'annuleren', closeOnConfirm: false, closeOnCancel: false }, function (isConfirm) {
        if (isConfirm) {
          handleData(`http://${lanIP}/api/v1/delete-speler/${id}`, callbackDeleteSpeler, null, 'DELETE');
          swal('Speler verwijderd', 'De speler en zijn bijhorende matchen zijn permanent verwijderd!', 'success');
        } else {
          swal('Geannuleerd', 'Speler is niet verwijderd!', 'error');
        }
      });
    });
  }
};

const listenToClickH2H = function () {
  const btn = document.querySelector('.js-match-h2h');
  btn.addEventListener('click', function () {
    let htmlSpelersKiezen = document.querySelector('.js-h2h');
    htmlSpelersKiezen.classList.add('u-hide');
    let htmlh2hWeergeven = document.querySelector('.js-h2h-weergeven');
    htmlh2hWeergeven.classList.remove('u-hide');
    let htmlh2hSpelers = document.querySelector('.js-h2h-spelers');
    htmlh2hSpelers.classList.remove('u-hide');
    const speler1 = document.querySelector('.js-select-speler').value;
    const speler2 = document.querySelector('.js-select-speler2').value;

    naamSpeler1 = document.querySelector('.js-select-speler').options[document.querySelector('.js-select-speler').selectedIndex].text;
    naamSpeler2 = document.querySelector('.js-select-speler2').options[document.querySelector('.js-select-speler2').selectedIndex].text;

    // console.log(speler1);
    // console.log(speler2);
    getH2H(speler1, speler2);
  });
};

const listenToClickPowerOff = function () {
  const btns = document.querySelectorAll('.js-poweroff');
  for (let btn of btns) {
    btn.addEventListener('click', function () {
      console.log(btn);
      socket.emit('F2B_poweroff');
    });
  }
};
//#endregion

const init = function () {
  // Get some DOM, we created empty earlier.
  listenToSocket();

  let htmlIndex = document.querySelector('.js-index');
  let htmlSelectSpelers = document.querySelector('.js-select-spelers');
  let htmlMatchen = document.querySelector('.js-matchen');
  let htmlHistoriek = document.querySelector('.js-historiek');
  let htmlSpelers = document.querySelector('.js-spelers');
  let htmlSpelerToevoegen = document.querySelector('.js-speler-toevoegen');
  let htmlh2h = document.querySelector('.js-h2h');

  if (htmlSelectSpelers) {
    console.log('spelers selecteren');
    getSpelers();
    listenToClickPlay();
    listenToClickVeranderScore();
  } else if (htmlh2h) {
    console.log('Head 2 Head');
    getSpelers();
    listenToClickH2H();
  } else if (htmlMatchen) {
    console.log('matchen weergeven');
    getMatchen();
  } else if (htmlHistoriek) {
    console.log('Historie van de match weergeven');
    let urlParams = new URLSearchParams(window.location.search);
    let idwedstrijd = urlParams.get('idwedstrijd');
    if (idwedstrijd) {
      console.log(idwedstrijd);
      getNamenVoorHistoriek(idwedstrijd);
      //getHistoriek(idwedstrijd);
    }
  } else if (htmlSpelers) {
    getSpelersOverzicht();
  } else if (htmlSpelerToevoegen) {
    listenToClickToevoegen();
  } else if (htmlIndex) {
    listenToSocketStart();
    listenToClickPowerOff();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');
  init();
});
