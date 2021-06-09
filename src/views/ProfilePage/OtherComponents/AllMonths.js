import React from "react";

export default function AllMonths (props){
    const { selectedItem,style,...rest } = props;
    return (     
  <select id={props.id} style={{padding:"9px",width:"15%"}}>
       <option disabled>Mois</option>
       <option value="01">Janvier</option>
       <option value="02">Février</option>
       <option value="03">Mars</option>
       <option value="04">Avril</option>
       <option value="05">Mai</option>
       <option value="06">Juin</option>
       <option value="07">Juillet</option>
       <option value="08">Août</option>
       <option value="09">Septembre</option>
       <option value="10">Octobre</option>
       <option value="11">Novembre</option>
      <option value="12">Décembre</option>
  </select>
    )
}