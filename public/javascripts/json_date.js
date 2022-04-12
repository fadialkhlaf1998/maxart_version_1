function _deleteJsonData(id){
    let isExecuted = confirm("Are you sure to delete this element?");
            if(isExecuted){
                var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(location.protocol+'//' + location.host+"/api/json-data", requestOptions)
                .then(response => {
                    if(response.status==200){
                        var myobj = document.getElementById("row-jd-"+id);
                        myobj.remove();
                    }else{

                        response.text().then(result=>{
                            document.getElementById("my-alert").innerText = result;
                            document.getElementById("my-alert").style.display = "block";
                            window.scroll(0,findPos(document.getElementById("my-alert")));
                        })
                    }
                })
                .catch(error => {
                    document.getElementById("my-alert").innerText = "some thing went wrong";
                    document.getElementById("my-alert").style.display = "block";
                    window.scroll(0,findPos(document.getElementById("my-alert")));
                });
            }
}
function showJsonData(edit,positionData,id) {
var popup = document.getElementById("add-json-data");
     popup.style.display="block";
     if(edit){
        document.getElementById("edit-json-data-btn").style.display="block";
        document.getElementById("add-json-data-btn").style.display="none";
        document.getElementById('json-data-id').innerText=id;  
        document.getElementById("json-data-i").innerHTML=document.getElementById("row-jd-"+id).children[1].innerHTML;
        document.getElementById("json-data-position-i").value=positionData;
     }else{
        document.getElementById("edit-json-data-btn").style.display="none";
        document.getElementById("add-json-data-btn").style.display="block";
     }
  
}

function hideJsonData() {
    var popup = document.getElementById("add-json-data").style.display="none";
}

function addJsonData() {
    var canAdd = true;
    if(document.getElementById("json-data-i").value==""){
        canAdd=false;
        color_red("json-data-l");
    }else{
        color_black("json-data-l");
    }

    if(canAdd){
        var popup = document.getElementById("add-json-data").style.display="none";
        document.getElementsByClassName("loader-container")[0].style.display = "flex";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "position":document.getElementById("json-data-position-i").value,
    "data":document.getElementById("json-data-i").value,
    "post_id":document.getElementById("title-i").getAttribute("data-id"),
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch(location.protocol+'//' + location.host +"/api/json-data", requestOptions)
    .then(response => {
        if(response.status==200){
            document.getElementsByClassName("loader-container")[0].style.display = "none";
            location.reload();
        }else{
            response.text().then(result=>{
                document.getElementsByClassName("loader-container")[0].style.display = "none";
                document.getElementById("my-alert").innerText = result;
                document.getElementById("my-alert").style.display = "block";
            })
        }
    })
    .catch(error => {
        document.getElementsByClassName("loader-container")[0].style.display = "none";
        document.getElementById("my-alert").innerText = "some thing went wrong";
        document.getElementById("my-alert").style.display = "block";
    });
    }
}

function editJsonData() {
    var canAdd = true;
    var id = document.getElementById('json-data-id').innerText;
    if(document.getElementById("json-data-i").value==""){
        canAdd=false;
        color_red("json-data-l");
    }else{
        color_black("json-data-l");
    }

    if(canAdd){
        var popup = document.getElementById("add-json-data").style.display="none";
        document.getElementsByClassName("loader-container")[0].style.display = "flex";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "position":document.getElementById("json-data-position-i").value,
    "data":document.getElementById("json-data-i").value,
    "post_id":document.getElementById("title-i").getAttribute("data-id"),
    "id":id
});

var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch(location.protocol+'//' + location.host +"/api/json-data", requestOptions)
    .then(response => {
        if(response.status==200){
            document.getElementsByClassName("loader-container")[0].style.display = "none";
            location.reload();
        }else{
            response.text().then(result=>{
                document.getElementsByClassName("loader-container")[0].style.display = "none";
                document.getElementById("my-alert").innerText = result;
                document.getElementById("my-alert").style.display = "block";
            })
        }
    })
    .catch(error => {
        document.getElementsByClassName("loader-container")[0].style.display = "none";
        document.getElementById("my-alert").innerText = "some thing went wrong";
        document.getElementById("my-alert").style.display = "block";
    });
    }
}