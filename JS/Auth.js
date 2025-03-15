document.getElementById('submit').addEventListener('click' , ()=>{

    let useName = document.getElementById('userName').value ;
    let userPass = document.getElementById('userPass').value ;

    if(!useName || !userPass){
        alert("Please Provide Your Name and Password")
    }
    if(useName && userPass){
        if(userPass !== '123456'){
            alert("Incorrect Password!. Contact admin to get your Login Code.")
        }
        else{
            document.getElementById('logInHero').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            showAlert(useName)
        }
    }

})

document.getElementById('logOut').addEventListener('click' , () =>{
    document.getElementById('main').style.display = 'none'
    document.getElementById('logInHero').style.display = 'block'
    showAlertLogOut()
})


function showAlert(useName) {
    Swal.fire({
      title: "অভিনন্দন!",
      text: `Hey ${useName},
      চল আজকে নতুন কিছু শেখা যাক `,
      icon: "success",
      confirmButtonText: "OK",
    });
}
function showAlertLogOut() {
    Swal.fire({
        title: "লগআউট সফল!",
        text: "আপনি সফলভাবে লগআউট করেছেন। আবার দেখা হবে!",
        icon: "info",
        confirmButtonText: "OK",
    });
}