const emailValid = (email, academic) => {

  const mailDomain = email.split('@');
  if(mailDomain[1].match(/.edu/) != null){
    if(academic==="Hoca") {
      return academic = academic;
    } else if(academic==="Öğrenci") {
      return academic = academic;
    } else {
      return academic = "Akademik Statü Belirtilmedi"
    };
  } else {
    return academic = "Bilgi Yok"
  };
}

module.exports = emailValid;