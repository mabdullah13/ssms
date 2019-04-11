function colorForm(eId){
    
    //for easier to use jquery
    var eId = "#"+eId; 

    $(eId).blur( ()=>{
        $(eId).val()=="" ? $(eId).css("borderColor","red") : $(eId).css("borderColor","black");
    });    

    $(eId).focus( ()=>{
        $(eId).val()=="" ? $(eId).css("borderColor","black") : $(eId).css("borderColor","black");
    });   
}

colorForm("username");
colorForm("password");
colorForm("confirm");
colorForm("email");

function validateForm() {
    if ( !$("#username").val() || !$("#password").val() || !$("#confirm").val() || !$("#email").val() ) {
        alert("Looks that there was one of the following problems: "+"\n"
        + "-Please enter name." + "\n"
        + "-Please enter password." + "\n"
        + "-Please enter password(confirm)." + "\n"
        + "-Please enter email." + "\n");
        return false;
    }
    else if($("#password").val()!=$("#confirm").val()){
        alert("password must match password(confirm).");
        return false;
    }
    else if (!validateEmail( $("#email").val() )){
        alert("Please input valid email.")
        return false;
    }
    return true;
}

function validateEmail(email){
    var re = /^[A-Za-z0-9\._+]+@[A-Za-z]+\.(com|org|edu|net)$/;
    return re.test(String(email).toLowerCase());
}