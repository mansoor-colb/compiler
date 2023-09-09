$(document).ready(function(){

var uid=localStorage.getItem("webcom");
if(!uid){
    if(confirm("please login to view saved Code!!")){

        window.location.href="login.html";
    }
}
else{

    function load(){
        let uid=localStorage.getItem("webcom");
        $.ajax({
            url:"http://localhost:8770/saved",
            type:"post",
            dataType: "json",
            data: { usid:uid
            },
           
            success: function(res){
                if(res.data==1){
                    console.log(res.itm)
                    let count=1;
                    for(let i of res.itm){
                        $("#tbody").append(
                            `<tr>
                            <th>${count}</th>
                            <td>${i.file_name}</td>
                            <td>
                                ${i.language.split("-")[0]} 
                            </td>
                            <td style="cursor:pointer"><span class="label gradient-1 btn-rounded"><i class="fas fa-edit"></i><a style="color:white;text-decoration:none"href="index.html?uid=${i.file_id}"> Edit</a></span>
                            </td>
                            <td style="cursor:pointer" onclick="share('${i.file_name}','${i.file_id}')">Share <i class="fas fa-share-alt"></i></td>
                        </tr>`
                        )

                        count++;
                    }
                    
                    
                    
                }
                else if(res.data==0){
                    console.log(res.itm);
                    
                }
            }
            
        })
    }load();



}
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
            if(res.data!=200){
                console.log(res.response)
                $("#email").val(`${res.itm[0].email}`)
                $("#username").val(`${res.itm[0].name}`)
                $("#password").val(`${res.itm[0].password}`)
                
                
                
            }
            else if(res.status==500){
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
})