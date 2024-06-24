let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);


let infobox = document.getElementById("info_box");

let ratio = document.getElementById("ratio");
let unstable_rate = document.getElementById("unstable_rate");

let count_320 = document.getElementById("count_320");
let count_300 = document.getElementById("count_300");
let count_200 = document.getElementById("count_200");
let count_100 = document.getElementById("count_100");
let count_50 = document.getElementById("count_50");
let count_0 = document.getElementById("count_0");

let player = document.getElementById("player");
let star_rating = document.getElementById("star_rating");
let difficulty = document.getElementById("difficulty");
let map_name = document.getElementById("map_name");
let mapper = document.getElementById("mapper");

let state;


function display_section(){   
    infobox.style.opacity = 1;
}

socket.onmessage = event => {
    try {
        let data = JSON.parse(event.data);
        
        if (state !== data.menu.state){
            state = data.menu.state;
            
            if(state == 2){
                setTimeout(display_section, 1000);
            }
            else{
                infobox.style.opacity = 0;
            }
            
        }   
        unstable_rate.innerHTML = "UR: " + data.gameplay.hits.unstableRate.toFixed(2);

        if(data.gameplay.hits['300'] == 0 && data.gameplay.hits.geki == 0){
            ratio.innerHTML = "Ratio: 0";
        }else if(data.gameplay.hits['300'] == 0){
            ratio.innerHTML = "Ratio: ∞";
        }else{
            ratio.innerHTML = "Ratio: " + (data.gameplay.hits.geki / data.gameplay.hits['300']).toFixed(2);
        }

        count_320.innerHTML = "320: " + data.gameplay.hits.geki;
        count_300.innerHTML = "300: " + data.gameplay.hits['300'];
        count_200.innerHTML = "200: " + data.gameplay.hits.katu;
        count_100.innerHTML = "100: " + data.gameplay.hits['100'];
        count_50.innerHTML = "50: " + data.gameplay.hits['50'];
        count_0.innerHTML = "0: " + data.gameplay.hits['0'];

        if(parseFloat(data.menu.bm.stats.SR) >=10){
            difficulty.style.left = "115px";
        }
        else{
            difficulty.style.left = "100px";
        }

        star_rating.innerHTML = data.menu.bm.stats.SR.toFixed(2);
        player.innerHTML = data.gameplay.name
        difficulty.innerHTML = data.menu.bm.metadata.difficulty
        map_name.innerHTML = data.menu.bm.metadata.title
        mapper.innerHTML = "By: " + data.menu.bm.metadata.mapper
      	
  } catch (err) { console.log(err); };
};