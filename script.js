if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sworker.js").then(registration=>{
        console.log("ok")
        console.log(registration);
    }).catch(error=>{
        console.log("error")
        console.log(error)
    })
}else{
    alert("not")
}