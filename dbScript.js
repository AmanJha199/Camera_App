//Database create/open -> (camera)
//Database objectStore -> gallery
//photo capture / video record -> gallery(obs) store

let dbAccess;
let request=indexedDB.open("Camera",1); //opening database=>Camera with version 1

request.addEventListener("success",function(){
    dbAccess=request.result;
});

request.addEventListener("upgradeneeded",function(){
    let db=request.result;
    db.createObjectStore("gallery", {keyPath : "mId" });
});

request.addEventListener("error",function(){
    alert("some error occured");
});

//Jo bhi photo/video capture hogi save krega
function addMedia(type,media){
    //assumption ki tabhi chlega jb dbAccess hoga
    let tx = dbAccess.transaction("gallery","readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    let data={
        mId : Date.now(),
        type,
        media,
    };
    galleryObjectStore.add(data);
}