const Datacaixa = document.querySelector("#div_data")
const horaRoda = document.querySelector("#div_relogio")
const Som_alarme = document.getElementById("som_alarme")
const botaoAtivar = document.getElementById("botaoAtivar")
const botaoParar = document.getElementById("botaoDesativar")
const tmp_Alarme = document.getElementById("tmp_alarme")
const hora_Alarme = document.getElementById("hora_alarme")
const timer = document.getElementById("timer")

const alarme = new Audio("alarme/alarme1.mp3")
alarme.loop = -1

let ts_atual = null
let ts_alarme = null
let alarme_ativado = false
let alarme_tocando = false

botaoAtivar.addEventListener("click",(evt)=>{
    ts_atual = Date.now()
    ts_alarme = ts_atual + (tmp_Alarme.value*1000)
    alarme_ativado = true
    const dt_alarme = new Date(ts_alarme)
    hora_Alarme.innerHTML = "Hora do alarme:"+dt_alarme.getHours()+":"+dt_alarme.getMinutes()+":"+dt_alarme.getSeconds()
})
botaoParar.addEventListener("click",(evt)=>{
    alarme_ativado = false
    alarme_tocando = false
    hora_Alarme.innerHTML = "Hora do Alarme"
    alarme.pause()
    alarme.currentTime = 0
})

const dataHoje = new Date()
let dataD = dataHoje.getDate()
dataD = dataD<10?"0"+dataD:dataD
let dataM = dataHoje.getMonth()
dataM = dataM<10?"0"+dataM:dataM
let dataA = dataHoje.getFullYear()
dataA = dataA<10?"0"+dataA:dataA
Datacaixa.innerHTML = [dataD+"/"+dataM+"/"+dataA]

const MinutosTempo = () =>{
  const dataHoje = new Date()
  let horas = dataHoje.getHours()
  horas = horas<10?"0"+horas:horas
  let minutos = dataHoje.getMinutes()
  minutos = minutos<10?"0"+minutos:minutos
  let segundos = dataHoje.getSeconds()
  segundos = segundos<10?"0"+segundos:segundos
  horaRoda.innerHTML = [horas+":"+minutos+":"+segundos]
  if(alarme_ativado && !alarme_tocando){
    if(dataHoje.getTime() >= ts_alarme){
        alarme_tocando = true
        alarme.play()
        timer.classList.add("alarme")
    }
  }
  }
 const intervalo = setInterval(MinutosTempo,1000)