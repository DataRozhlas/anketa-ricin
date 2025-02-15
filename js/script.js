﻿import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = "https://data.irozhlas.cz/anketa-ricin";
if (window.location.hostname === "localhost") {
  host = "http://localhost/anketa-ricin"
}

const qu1 = 'Přesvědčily vás tajné služby o tom, jak v kauze ricin jednaly?'
const qu2 = 'Prezident Zeman v úterý v souvislosti s kauzou ricin označil dvě ze tří tajných služeb za zbytečné. Jak se k jeho vyjádření stavíte?'

function printResps(obj) {
  if (obj.o1 === '') { obj.o1 = '<i>Bez odpovědi.</i>'}
  if (obj.o2 === '') { obj.o2 = '<i>Bez odpovědi.</i>'}
  return `<b>${qu1}</b><p>${obj.o1}</p><b>${qu2}</b><p>${obj.o2}</p>`
}

function onLoad(e) {
  const data = JSON.parse(e.target.response)
  render((
    <div id="anketa">
      {data.map(el => (
        <div className="respondent">
          <img className="portret" src={host + "/foto/" + el.f} alt={el.p} />
          <div className="bio">
            <div className="jmeno">{`${el.j} ${el.p}`}</div>
            <div className="vek">{el.s}</div>
          </div>
          <div className="odpoved" dangerouslySetInnerHTML={{ __html: printResps(el) }}></div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"))
}

const r = new XMLHttpRequest()
r.addEventListener("load", onLoad)
r.open("GET", host + "/data/data.json")
r.send()