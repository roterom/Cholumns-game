function Sounds(){
  this.sounds = [
    'boo.m4a',
    'ibuki.m4a',
    'kabuki-yoo.m4a',
    'koto.m4a',
    'scream.m4a'
  ];
}

Sounds.prototype.play = function(track){
  new Audio("assets/sound/" + this.sounds[track]).play();
};