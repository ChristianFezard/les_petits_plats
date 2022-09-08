export function fillDropdownAfterSearch(arrayOfItems){

    let html="";

     arrayOfItems.forEach((item)=>{

            html+= `
            
               <li>${item}</li>
            
            `;

     });

     return html;

}