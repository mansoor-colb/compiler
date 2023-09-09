$(document).ready(function () {
    var fork,usrid='',langgg,inpot,fiame,fileid;
    if(!(localStorage.getItem('webcom'))){
        window.location.href='login.html'

    }

    function lang() {
        $.ajax({
            url:"http://localhost:8770/langsel",
            type:"post",
            dataType: "json",
            data: { 
            },
           
            success: function(res){
                if(res.data==1){
                   console.log(res.itm);
                   $(".dropdown-menu").html("")
                  for(let i of res.itm){
                    // let a=new String(i.id)
                    // console.log(a.dataType)
                    $(".dropdown-menu").append(`<a class="dropdown-item" id="langanchor" data-lid="${i.id}"onclick="lans('${i.id}','${i.name}')" >${i.name}</a>`)
    
                  }
                    
                    
                    
                }
                else if(res.data==99){
                    alert("some error occured")
                    
                }
            }
            
        })
      }
    let query =window.location.search
    let url =new URLSearchParams(query)
    let val=url.get('uid')
    let glbfile;
    
    if(val){
        // alert(val);
        $.ajax({
            url:"http://localhost:8770/presaved",
            type:"post",
            dataType: "json",
            data: { uid:val
            },
           
            success: function(res){
                if(res.data==1){
                   console.log(res.itm);
                   $("#srccode").val(res.cont);
                   let langg=res.itm[0].language.split("-")[0];
                
                glbfile=res.itm[0].file_name;
                
                   $("#langsel").html(`${langg}`)
                   $("#langsel").data("lid",res.itm[0].language.split("-")[1])
                   $("#inppts").val(res.itm[0].input.input);
                   lang();
                   if(res.itm[0].user_id==localStorage.getItem("webcom")){
                    $("#upd").css({"display":"inline-block"});
                   }
                   else{
                    $("#frk").css({"display":"inline-block"});

                    var uid=''
          var digits='1234567890'
          
          for (let j = 0; j < 7; j++) {
              uid += digits[Math.floor(Math.random() * 10)];
            }
                  
                        usrid= localStorage.getItem("webcom");
                        fileid= uid,
                      fiame= res.itm[0].file_name;
                     langgg= res.itm[0].language;
                     inpot=res.itm[0].input.input
                      
                   }
                   
                  
                    
                    
                    
                }
                else if(res.data==0){
                    alert("some error occured")
                    
                }
            }
            
        })


    }
    else{
        $("#sv").css({"display":"inline-block"});
        lang();
    }


    $("#frk").on("click",function(){
        // alert(fork.user_id);
        $.ajax({
            url:"http://localhost:8770/fork",
            type:"post",
            dataType: "json",
            data: { userd:usrid,language:langgg,fid:fileid,file_name:fiame,input:inpot.input,cont:$("#srccode").val()
            },
           
            success: function(res){
                if(res.data==1){
                    alert("Forked successfully");
                    window.location.href="myproject.html";
                    
                    
                    
                }
                else if(res.data==0){
                    alert("some error occured");
                    
                }
                else if(res.data==99){
                    alert("err")
                }
            }
            
        })

    })  


 
 $("#upd").on("click",function(){
    var filename=glbfile;
    var uiid=localStorage.getItem("webcom");
    var langid=$("#langsel").data("lid");
    var lang=$("#langsel").html();
    if(lang=="Select Language"){
        alert("please select language");
        return;

    }
    lang=lang+"-"+langid;
    var inp=$("#inppts").val();
    // arr=inp.split();alert(arr);


    if(filename.length==0)
    {
        alert("pleae enter a file name");
        return;
    }
    // if($("#srccode").val().length==0){
    //     alert("pleae enter code to Up");
    //     return;
    // }
    // alert(uid)
   

    $.ajax({
        url:"http://localhost:8770/saveup",
        type:"post",
        dataType: "json",
        data: { usid:uiid,langua:lang,input:inp,fname:filename,cont:$("#srccode").val(),fileid:val,
        },
       
        success: function(res){
            if(res.data==1){
                alert("Updated successfully");
                
                
                
            }
            else if(res.data==0){
                alert("some error occured");
                
            }
            else if(res.data==99){
                alert("err")
            }
        }
        
    })
 })
    



$("#runcode").on("click",function(){
    var button = document.getElementById("clsinp");
    button.click();
 let langg=$("#langsel").data("lid");
 let codee=$("#srccode").val();
 let inp=$("#inppts").val();

 console.log(codee);
if(langg==0){
    alert("Please select language!!\n(Dont worry your input will reamin in box if provided any.)");
    return;
}
if(codee.length==0){
    alert("Code box cannot be empty");
    return;
}

    $.ajax({
        url:"http://localhost:8770/output",
        type:"post",
        dataType: "json",
        data:{
            code:codee,input:inp,lang:langg
        },
        beforeSend:function(){
            $("#output").html("Compiling..........");
        },
        
        success:function(res){
            if(res.data==1){
            let out=res.itm.output;
            $("#output").html(`<pre>${out}</pre>`);
            }
            else if(res.data==0){
                $("#output").html(res.itm);
            }


        }
    })
})
$("#dashboard").on("click",function(){
    if(localStorage.getItem("webcom")){
        window.location.href="index.html"
    }
    else{
        if(confirm("Please login to view Dashboard!!")){
            window.location.href="login.html"
        }
    }
})

$("#savefile").on("click",function(){
    var filename=$("#filename").val();
    var uid=localStorage.getItem("webcom");
    var langid=$("#langsel").data("lid");
    var lang=$("#langsel").html();
    if(lang=="Select Language"){
        alert("please select language");
        return;

    }
    lang=lang+"-"+langid;
    var inp=$("#inppts").val();
    // arr=inp.split();alert(arr);


    if(filename.length==0)
    {
        alert("pleae enter a file name");
        return;
    }
    if($("#srccode").val().length==0){
        alert("pleae enter code to save");
        return;
    }
   

    $.ajax({
        url:"http://localhost:8770/save",
        type:"post",
        dataType: "json",
        data: { usid:uid,langua:lang,input:inp,fname:filename,cont:$("#srccode").val()
        },
       
        success: function(res){
            if(res.data==1){
                alert("Saved successfully");
                var button = document.getElementById("svcls");
                button.click();
                
                
                
            }
            else if(res.data==0){
                alert("some error occured");
                
            }
        }
        
    })


})
$("#usrprof").on("click",function(){
    loadprofile();

})
function loadprofile(){
    $.ajax({
        url:"http://localhost:8770/userprofile",
        type:"post",
        dataType: "json",
        data: { Sender:`${localStorage.getItem("webcom")}`
        },
       
        success: function(res){
            if(res.data!=0){
                console.log(res.response)
                $("#email").val(`${res.itm[0].email}`)
                $("#username").val(`${res.itm[0].name}`)
                $("#password").val(`${res.itm[0].password}`)
                
                
                
            }
            else if(res.data==0){
                alert("some error occured")
                
            }
        }
        
    })
   


}

$("#savedata").on("click",function(){
    $.ajax({
        url:"http://localhost:8770/userupdate",
        type:"post",
        dataType: "json",
        data: { Sender:`${localStorage.getItem("webcom")}`,username:$("#username").val(),pass:$("#password").val()
        },
       
        success: function(res){
            if(res.data==1){
               swal("Updated Succesfully","","success")
               loadprofile()
                
                
            }
            else if(res.data==0){
                swal("Updation  Failed","","error")
               console.log("error");
            }
        }
        
    })

})
$("#logout").on("click",function(){
    

    
      
        localStorage.removeItem("webcom")
      setTimeout(function(){
        window.location.href='login.html'
     },2000)
    // setTimeout(function(){

    // },2000)
    })

})