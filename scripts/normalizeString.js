export function normalizeString(string){

    string = string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // les voyelles sont remplacées par une ligature
    string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  
    return string;

}

// export function verifString(string)
// {
//     var string = "ëx vœúx erât adî-piscîng sãdic_scïng";
//     var monRegEx = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{5,60}$/;
//     if(verifDescrip.exec(descrip) == null){ alert("saisie invalide"); }
// }