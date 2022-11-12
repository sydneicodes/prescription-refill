var ready = document.getElementsByClassName("ready")
var trash = document.getElementsByClassName("fa-trash-o");
let signed = false
let pads = document.getElementsByClassName("flex-row")
Array.from(pads).forEach(pad => {
  pad.addEventListener('click', ()=>{
    signed = true
  })
})
var canvas = document.getElementById("signature-pad");

       function resizeCanvas() {
           var ratio = Math.max(window.devicePixelRatio || 1, 1);
           canvas.width = canvas.offsetWidth * ratio;
           canvas.height = canvas.offsetHeight * ratio;
           canvas.getContext("2d").scale(ratio, ratio);
       }
       window.onresize = resizeCanvas;
       resizeCanvas();

       var signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(250,250,250)'
       });

       document.getElementById("clear").addEventListener('click', function(){
        signaturePad.clear();
       })




Array.from(ready).forEach(function(element) {
  element.addEventListener('click', function(){

    
    const _id = this.parentNode.getAttribute("id").trim()
    let warning = this.parentNode.childNodes[15]

    if(signed){
      warning = ''
      fetch('ready', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id
        })
      }).then(function (response) {
        window.location.reload()
      })
    }
    else{
      warning.innerText = 'ERR, cant prescribe without signature'
    }
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const _id = this.parentNode.getAttribute("id").trim()
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
