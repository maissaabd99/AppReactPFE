import React, { useContext } from "react";

export default function AllLanguages (props){
    const { selectedItem,...rest } = props;
   
    return (
        <select id={props.id} style={{padding:"9px",width:"35%"}} onClick={props.onClick} onChange={props.onChange} value={props.value} onSelect={props.onSelect}>
  <option >Afrikaans</option>
  <option>Albanian</option>
  <option >Arabic</option>
  <option >Armenian</option>
  <option >Basque</option>
  <option >Bengali</option>
  <option >Bulgarian</option>
  <option >Catalan</option>
  <option >Cambodian</option>
  <option >Chinese (Mandarin)</option>
  <option >Croatian</option>
  <option >Czech</option>
  <option >Danish</option>
  <option >Dutch</option>
  <option >English</option>
  <option >Estonian</option>
  <option >Fiji</option>
  <option >Finnish</option>
  <option >French</option>
  <option >Georgian</option>
  <option >German</option>
  <option >Greek</option>
  <option >Gujarati</option>
  <option >Hebrew</option>
  <option >Hindi</option>
  <option >Hungarian</option>
  <option >Icelandic</option>
  <option >Indonesian</option>
  <option >Irish</option>
  <option >Italian</option>
  <option >Japanese</option>
  <option >Javanese</option>
  <option >Korean</option>
  <option >Latin</option>
  <option >Latvian</option>
  <option >Lithuanian</option>
  <option >Macedonian</option>
  <option >Malay</option>
  <option >Malayalam</option>
  <option >Maltese</option>
  <option >Maori</option>
  <option >Marathi</option>
  <option >Mongolian</option>
  <option >Nepali</option>
  <option >Norwegian</option>
  <option >Persian</option>
  <option >Polish</option>
  <option >Portuguese</option>
  <option >Punjabi</option>
  <option >Quechua</option>
  <option >Romanian</option>
  <option >Russian</option>
  <option >Samoan</option>
  <option >Serbian</option>
  <option >Slovak</option>
  <option >Slovenian</option>
  <option >Spanish</option>
  <option >Swahili</option>
  <option >Swedish </option>
  <option >Tamil</option>
  <option >Tatar</option>
  <option >Telugu</option>
  <option >Thai</option>
  <option >Tibetan</option>
  <option >Tonga</option>
  <option >Turkish</option>
  <option >Ukrainian</option>
  <option >Urdu</option>
  <option >Uzbek</option>
  <option >Vietnamese</option>
  <option >Welsh</option>
  <option >Xhosa</option>
</select>
    )
}