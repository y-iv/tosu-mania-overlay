# gosumemory-overlay
Etterna inspired gosumemory overlay, includes a judgement counter with map info & player info displayed.

![image](https://i.ibb.co/SJmzFb5/image.png)

**Note:**
Sometimes the difficulty of the map will overlap with the gameplay, if you want to prevent this then you have to edit overlayWidth in the gosumemory config.ini.

The star rating display may not be accurate if the nightcore mod is applied.


Step 1: Download gosumemory and set it up (https://github.com/l3lackShark/gosumemory).

Step 2: Paste the 2 folders inside the folder called static.

Step 3: Change the gameoverlay part of the config.ini to this:

![image](https://i.ibb.co/ssS0Br1/image-2024-06-23-231559938.png)

(If you are using the no judgement box, then make the overlayURL "http://localhost:24050/no_judgement_box/". Additionally you can also lower overlayheight to a much lower value.)

(also if you are using windowed, adjust the value in overlayScale accordingly)

To change the picture displayed on the bottom left, you have to paste your desired image in the avatar folder and rename it to "avatar.png" (square image).
