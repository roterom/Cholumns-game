function Sounds(){
  
  //array for the penaltys in ModeCompetition (2 players)
  this.soundsBattle = [
    "a_fregar.m4a",
    "a_pique_portaaviones.m4a",
    "ay_caramba_carambita.m4a",
    "ay_tio_paco.m4a",
    "chupate_coyote.m4a",
    "cuidado_radiactivoman.m4a",
    "dale_marcha_atras.m4a",
    "dudi_tu_padre.m4a",
    "elmo_sabe.m4a",
    "eres_chuli.m4a",
    "excelente.m4a",
    "exijo_satisfaccion.m4a",
    "he_tenido_homer.m4a",
    "hijo_de_perrilla.m4a",
    "ja_ja.m4a",
    "me_aburro.m4a",
    "multiplicate_cero.m4a",
    "no_me_enfadado.m4a",
    "no_mireis_broma.m4a",
    "oye_vete_rusia.m4a",
    "que_parta_rayo.m4a",
    "si_corre_huevo.m4a",
    "simplifique_tio.m4a",
    "tu_nunca_aprenderas.m4a",
    "ugh_toqueis_cosas.m4a",
    "vamos_palmar.m4a",
    "yo_no_sido.m4a"
  ];

  //array for the game over y ModeCompetiton (2 players)
  this.soundsGameOver = [
    "ah_la_muerte.m4a",
    "con_el_llevara_nada.m4a",
    "dejame_vivir.m4a",
    "meto_cuchillo_tripas.m4a",
    "no_dejalo_matado.m4a",
    "no_hora_hundirse.m4a",
    "no_lloren_por_mi.m4a",
    "no_tocar_nada.m4a",
    "por_favor_matame.m4a",
    "quien_jaja_ultimo.m4a",
    "sacrifiquemoslo.m4a",
    "si_era_listo.m4a",
    "socorro_tungsteno.m4a"
  ];
}


Sounds.prototype.getPathBattle = function(){

  var track = Number.parseInt(Math.random() * this.soundsBattle.length); 

  return ("./assets/sound/battle/" + this.soundsBattle[track]);
};


Sounds.prototype.getPathGameOver = function(track){

  var track = Number.parseInt(Math.random() * this.soundsBattle.length); 
  
  return ("./assets/sound/game-over/" + this.soundsGameOver[track]);
};