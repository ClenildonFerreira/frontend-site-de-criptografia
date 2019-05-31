$(document).ready(function(){

// Enviar para o topo ao dar refresh
// window.onbeforeunload = function() {window.scrollTo(0,0);}


  function nova_chave(val,matriz,matriz_inversa){
    chave.push(
      { val: val, matriz: matriz, matriz_inversa: matriz_inversa }
    );
  };

// Mudar valor do select por botões///////////////////
  $('.select-change-cod').click(function(){
      $('#select-cod').val($(this).data('val')).trigger('change');
  })

  $('.select-change-cod').on('click', function(){
    $('.select-change-cod').removeClass('selected');
    $(this).addClass('selected');
});

$('.select-change-decod').click(function(){
    $('#select-decod').val($(this).data('val')).trigger('change');
})

$('.select-change-decod').on('click', function(){
  $('.select-change-decod').removeClass('selected');
  $(this).addClass('selected');
});
///////////////////////////////////////////////////////



  var chave = [];
  nova_chave("AZUL",[[65,90],[85,76]],[[(-38/1355),(9/271)],[(17/542),(-13/542)]]);
  nova_chave("VIDA",[[86,73],[68,65]],[[(65/626),(-73/626)],[(-34/313),(43/313)]]);
  nova_chave("NOVE",[[78,79],[86,69]],[[(-69/1412),(79/1412)],[(43/706),(-39/706)]]);

  jQuery.each( chave, function(i, val) {
    $("select").append("<option value='" + chave[i].val + "'>" + chave[i].val + "</option>");
  })



  ///////

  $(".btn-codificar").on("click", function(){


if(

  $("#codificacao select option:selected").val() == "NADA"||
  $("#entradamensagem").val() == "" || $("#entradamensagem").val().length <= 4 || $("#entradamensagem").val().length > 40 ){
    $('#Modal-aviso1').modal('toggle');

  } else {

$("#resposta-cod").show();

    $(".m-linha1").empty();
    $(".m-linha2").empty();
    $(".c-linha1").empty();
    $(".c-linha2").empty();


  $('html, body').animate({
    scrollTop: $("#anchor-cod").position().top-60
  }, 500);


  	var mensagem = $("#codificacao textarea");
  	var letras = mensagem.val().split("");
    var matriz_m = [];

    for(i = 0; i < letras.length; i++){
    	var keycode = letras[i].charCodeAt(0);
    	matriz_m.push(keycode);
    }

    if(matriz_m.length % 2 == 0){
    	var matriz_m_l1 = matriz_m.slice(0, matriz_m.length/2);
    	var matriz_m_l2 = matriz_m.slice(matriz_m.length/2, matriz_m.length);
    } else {
    	var matriz_m_l1 = matriz_m.slice(0, matriz_m.length/2 + 1);
    	var matriz_m_l2 = matriz_m.slice(matriz_m.length/2 + 1, matriz_m.length);
      matriz_m_l2.push(32);
    }

    $(".matriz-mensagem").text("Matriz M = [" + matriz_m + "]");

    var chave_selecionada = $("#codificacao select option:selected").val();
    $(".chave").text(chave_selecionada);

//INSERÇÃO EM TABELA
    for(i = 0; i < matriz_m_l1.length; i++){
  	$(".m-linha1").append("<td class='td-matriz'>" + matriz_m_l1[i] + "</td>");
  }
  for(i = 0; i < matriz_m_l2.length; i++){
  	$(".m-linha2").append("<td class='td-matriz'>" + matriz_m_l2[i] + "</td>");
  }


//
    for(i = 0; i < chave.length; i++){
    	if(chave_selecionada == chave[i].val){
      	var chave_valida = chave[i];
        var matriz_n_l1 = [];
        var matriz_n_l2 = [];
        for(i = 0; i < matriz_m_l1.length; i++){
          var numero = chave_valida.matriz[0][0] * matriz_m_l1[i] + chave_valida.matriz[0][1] * matriz_m_l2[i];
          matriz_n_l1.push(" " + numero);
      	}
        for(i = 0; i < matriz_m_l2.length; i++){
          var numero = chave_valida.matriz[1][0] * matriz_m_l1[i] + chave_valida.matriz[1][1] * matriz_m_l2[i];
          matriz_n_l2.push(" " + numero);
        }
      }
    };

////MOSTRAR MATRIZ CHAVE///////////
$(".chave-azul").hide();
$(".chave-vida").hide();
$(".chave-nove").hide();

    if(chave_selecionada == "AZUL"){
      $(".chave-azul").show();
    }

    if(chave_selecionada == "VIDA"){
      $(".chave-vida").show();
    }

    if(chave_selecionada == "NOVE"){
      $(".chave-nove").show();
    }
//////////////////////


    //INSERÇÃO EM TABELA
        for(i = 0; i < matriz_n_l1.length; i++){
      	$(".c-linha1").append("<td class='td-matriz'>" + matriz_n_l1[i] + "</td>");
      }
      for(i = 0; i < matriz_n_l2.length; i++){
      	$(".c-linha2").append("<td class='td-matriz'>" + matriz_n_l2[i] + "</td>");
      }


    var matriz_n = $.merge(matriz_n_l1, matriz_n_l2);
    $(".mensagem-codificada").text(matriz_n);
    $("textarea.mensagem-codificada").attr("value", matriz_n);

    //COPIAR PARA DECODIFICACAO
    $(".btn-copiar").on("click", function(){

      // $("#pg-cod").hide();
      $("#pg-decod").show();
      $("#decodificacao textarea").text(matriz_n);

      $('html, body').animate({
        scrollTop: $("#pg-decod").position().top-60
      }, 500);
    })

    ///COPIAR PARA AREA DE TRANSFERENCIA
    ///
    // function copyTextToClipboard(text) {
    //   var textArea = document.createElement("textarea");
    //
    //   textArea.style.position = 'fixed';
    //   textArea.style.top = 0;
    //   textArea.style.left = 0;
    //   textArea.style.width = '2em';
    //   textArea.style.height = '2em';
    //   textArea.style.padding = 0;
    //   textArea.style.border = 'none';
    //   textArea.style.outline = 'none';
    //   textArea.style.boxShadow = 'none';
    //   textArea.style.background = 'transparent';
    //   textArea.value = text;
    //
    //   document.body.appendChild(textArea);
    //   textArea.select();
    //
    //   try {
    //     var successful = document.execCommand('copy');
    //     var msg = successful ? 'successful' : 'unsuccessful';
    //   } catch (err) {
    //     window.prompt("Copie para área de transferência: Ctrl+C e tecle Enter", text);
    //   }
    //
    //   document.body.removeChild(textArea);
    // }
    //

    //function myFunction() {
    //  var copyText = document.getElementById("#copy");
    //  copyText.select();
    //  document.execCommand("Copy");
    //  alert(copyText.text);
    //}

}

/////////////////////
  })

  /////

//////////////////
///DECODIFICACAO//
//////////////////
  $(".btn-decodificar").on("click", function(){

    if(
      $("#decodificacao select option:selected").val() == "NADA"||
      $("#entradacodigo").val() == "")

      {
        $('#Modal-aviso1').modal('toggle');
      } else {


    $(".c2-linha1").empty();
    $(".c2-linha2").empty();
    $(".d-linha1").empty();
    $(".d-linha2").empty();

    $("#resposta-decod").show();

    $('html, body').animate({
      scrollTop: $("#anchor-decod").position().top-60
    }, 500);

  	var $matriz_m = $("#decodificacao textarea").val();
    var $matriz_n = $matriz_m.split(',');
    $(".codigo").text("Matriz M codificada = [" + $matriz_n + "]");

    var $matriz_n_l1 = $matriz_n.slice(0, $matriz_n.length/2);
    var $matriz_n_l2 = $matriz_n.slice($matriz_n.length/2, $matriz_n.length);

    var cchave_selecionada = $("#decodificacao select option:selected").val();
    $(".chave-decodifica").text("Chave escolhida: " + cchave_selecionada);

    for(i = 0; i < chave.length; i++){

    	if(cchave_selecionada == chave[i].val){

      	var chave_valida = chave[i];
        var $matriz_d_l1 = [];
        var $matriz_d_l2 = [];

        for(i = 0; i < $matriz_n_l1.length; i++){
          var numero = chave_valida.matriz_inversa[0][0] * $matriz_n_l1[i] + chave_valida.matriz_inversa[0][1] * $matriz_n_l2[i];
          $matriz_d_l1.push(Math.round(numero));
      	}
        for(i = 0; i < $matriz_n_l2.length; i++){
          var numero = chave_valida.matriz_inversa[1][0] * $matriz_n_l1[i] + chave_valida.matriz_inversa[1][1] * $matriz_n_l2[i];
          $matriz_d_l2.push(Math.round(numero));
        }

      }

    };

    ////MOSTRAR MATRIZ ESCOLHIDA///////////
    $(".cchave-azul").hide();
    $(".cchave-vida").hide();
    $(".cchave-nove").hide();

        if(cchave_selecionada == "AZUL"){
          $(".cchave-azul").show();
        }

        if(cchave_selecionada == "VIDA"){
          $(".cchave-vida").show();
        }

        if(cchave_selecionada == "NOVE"){
          $(".cchave-nove").show();
        }
    //////////////////////


//INSERÇÃO EM TABELA
  for(i = 0; i < $matriz_n_l1.length; i++){
  	$(".c2-linha1").append("<td class='td-matriz'>" + $matriz_n_l1[i] + "</td>");
  }
  for(i = 0; i < $matriz_n_l2.length; i++){
  	$(".c2-linha2").append("<td class='td-matriz'>" + $matriz_n_l2[i] + "</td>");
  }

  for(i = 0; i < $matriz_d_l1.length; i++){
    $(".d-linha1").append("<td class='td-matriz'>" + $matriz_d_l1[i] + "</td>");
  }
  for(i = 0; i < $matriz_d_l2.length; i++){
    $(".d-linha2").append("<td class='td-matriz'>" + $matriz_d_l2[i] + "</td>");
  }


//
    var $matriz_d = $matriz_d_l1.concat($matriz_d_l2);
    $(".numeros-decodificados").text("Matriz M = [" + $matriz_d + "]");

    $(".final").empty();
    for(i = 0; i < $matriz_d.length; i++){
    	var letra_decodificada = String.fromCharCode( parseInt($matriz_d[i]) );
      $(".final").append(letra_decodificada);


    }
}
  });

  //////

/////CONTAGEM CARACTERES
  $(document).on("input", "#codificacao textarea", function () {
    var limite = 40;
    var caracteresDigitados = $(this).val().length;
    var caracteresRestantes = limite - caracteresDigitados;
    $(".caracteres").text(caracteresRestantes);
  });

/////RECARREGAR PAGINA

$(".btn-de-novo").on("click", function(){
  if(location.href == "https://apps.univesp.br/matrizes-e-criptografia/#pg-decod"){
    window.location.assign("https://apps.univesp.br/matrizes-e-criptografia/");
  } else {
    window.location.reload(false);
  }
});


/////LINK DIRETO DECODIFICACAO
  if(location.href == "index.html#pg-decod"){
    $("#pg-cod").hide();
    $("#pg-decod").show();
  }

new ClipboardJS('#copiar-mensagem');

})
