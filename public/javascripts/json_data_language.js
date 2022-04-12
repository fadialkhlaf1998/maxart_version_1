function showJsonData(positionData,id) {
var popup = document.getElementById("add-json-data");
     popup.style.display="block";
     document.getElementById("edit-json-data-btn").style.display="block";
        document.getElementById('json-data-id').innerText=id;  
        console.log(document.getElementById("row-jd-"+id).children[1].innerHTML);
        document.getElementById("json-data-i").value=document.getElementById("row-jd-"+id).children[1].innerHTML;
        document.getElementById("json-data-position-i").value=positionData;
}

function hideJsonData() {
    var popup = document.getElementById("add-json-data").style.display="none";
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
        console.log(document.getElementById("json-data-position-i").value);
        console.log(document.getElementById("json-data-i").value);
        document.getElementById("row-jd-"+id).children[1].innerHTML=document.getElementById("json-data-i").value; 
        document.getElementById("row-jd-"+id).children[2].innerHTML=document.getElementById("json-data-position-i").value;
        hideJsonData();
    }
}
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
                            document.getElementById('my-alert').scrollIntoView();
                        })
                    }
                })
                .catch(error => {
                    document.getElementById("my-alert").innerText = "some thing went wrong";
                    document.getElementById("my-alert").style.display = "block";
                    document.getElementById('my-alert').scrollIntoView();
                });
            }
}