var siteName = document.getElementById('site-name');
var siteUrl=document.getElementById('site-url');

var sites=[];
// localStorage.setItem('list',JSON.stringify(sites));
if(JSON.parse(localStorage.getItem('list')) != null){
    // sites = JSON.parse(localStorage.getItem('list'));
    console.log(sites)
    displaySites();
}

function createSite(){
    if(urlValidation()){
        var site ={
            name:siteName.value,
            url:siteUrl.value
        }
        sites.push(site);
        localStorage.setItem('list',JSON.stringify(sites));
        displaySites();
        resetForm();
    }else{
        Swal.fire({
        title: `<h2 class="sweet-alert-header2"><strong>Site Name or Url is not valid, Please follow the rules below :</strong></h2>`,
        width: 800,
        padding: "2em",
        color: "#2f2f2f",
        background: "#fff url(https://i.pinimg.com/originals/ca/52/0f/ca520fbaa1cf8d75a52b676c220b4ca7.gif) right no-repeat",
        backdrop: `
            rgba(0,0,0,0.5) 
        `,       
        showConfirmButton: false,
        timer: 3500,
        html: `        
        <p class="d-flex ps-3"> <i class="fa-solid fa-radiation fa-beat fs-4 text-danger pe-2"></i> <b class="sweet-alert-content bold">Site name must contain at least 3 characters</b></p> ,
        <p class="d-flex ps-3"><i class="fa-solid fa-radiation fa-beat  fs-4 text-danger pe-2"></i> <b class="sweet-alert-content bold">Site URL must be a valid one</b> </p>   
        `,
        });
        return;
    }
    console.log(site)
}

function displaySites(){
    sites=JSON.parse(localStorage.getItem('list'));
    var trs=``;
    for (let i = 0; i < sites.length; i++) {
        trs+=`
        <tr>
        <td>${i+1}</td>
        <td>${sites[i].name}</td>
        <td> <button class="btn btn-success"> <i class="fa-solid fa-eye"></i> <a href="${sites[i].url}"  target="_blank">Visit</a> </button> </td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i})"> <i class="fa-solid fa-trash-alt"></i> Delete</button></td>
        </tr>
        `        
    }  
    document.getElementById('tableBody').innerHTML=trs;

}

function deleteSite(index){
    sites.splice(index,1);
    localStorage.setItem('list', JSON.stringify(sites));
    displaySites();
}
function resetForm(){
    siteName.value ="";
    siteUrl.value="";
    siteUrl.classList.remove('valid');
    siteUrl.classList.remove('inValid');
    siteName.classList.remove('valid');
    siteName.classList.remove('inValid');
}
var iconsInValid =document.querySelectorAll(".icons");
console.log(iconsInValid[0]);
siteUrl.addEventListener('keydown',urlValidation);
function urlValidation(){
    var url = siteUrl.value;
    var pattern = /^(https|ftp){1}(:\/\/){1}(www.){1}|(https|ftp){1}(:\/\/){1}(mail.){1}[a-z]+(.){1}(com){1}\/$/ ;
    if(pattern.test(url) === true){
        siteUrl.classList.remove('inValid');
        siteUrl.classList.add('valid');
        iconsInValid[1].classList.replace('d-flex','d-none');
        console.log('match')
        return true;
    }else{
        siteUrl.classList.add('inValid'); 
        siteUrl.classList.remove('valid');
        iconsInValid[1].classList.replace('d-none','d-flex');
        console.log('not match')
        return false;
    }


}
siteName.addEventListener('keydown',nameValidation);
function nameValidation(){
    var url = siteName.value;
    var namePattern = /^[A-Za-z]{3,10}([^0-9]*)$/;
    if(namePattern.test(url) === true){
        siteName.classList.remove('inValid');
        siteName.classList.add('valid');
        console.log('match')
        iconsInValid[0].classList.replace('d-flex','d-none');
        return true;
    }else{
        siteName.classList.add('inValid');
        iconsInValid[0].classList.replace('d-none','d-flex');
        console.log('not match')
        return false;
    }

}

