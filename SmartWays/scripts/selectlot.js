
function parkSelect(lot){
    sessionStorage.setItem('selectedlot', JSON.stringify(lot));
    window.location.href = "maptest.html";
}