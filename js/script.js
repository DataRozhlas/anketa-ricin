import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = "https://data.irozhlas.cz/anketa-ricin";
if (window.location.hostname === "localhost") {
  host = "http://localhost/anketa-ricin";
}

const qu1 = 'Cožeto?'
const qu2 = 'Fakt?'

function printResps(obj) {
  return `<b>${qu1}</b><p>${obj.o1}</p><b>${qu2}</b><p>${obj.o2}</p>`
}

function onLoad(e) {
  const data = JSON.parse(e.target.response);
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
  ), document.getElementById("anketa-wrapper"));
}

const r = new XMLHttpRequest();
r.addEventListener("load", onLoad);
r.open("GET", host + "/data/data.json");
r.send();

makeChart();
