let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);


let infobox = document.getElementById("info_box");

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